const { Game, Player } = require("../../Game");
const { playerLink } = require("../../Utils/playerLink");
const { GuardianAngel, Martyr, Suicide } = require("../index");
const { specialConditionType } = require("../../Utils/specialConditionTypes");

class RoleBase {
  constructor(player, previousRole) {
    this.player = player;
    this.previousRole = previousRole;
  }

  static game;

  weight = (w) => w.baseWeight;
  activeWeight = 'baseWeight';
  activeWeightCoefficient = undefined;
  weightCoefficientVariable = undefined;

  // Transforms the player into a Wolf if they are not already one
  transformInfected = async () => {
    this.infected = false;
    if (this.role instanceof Wolf) return;
    this.role = new Wolf(this, this.role);

    await RoleBase.game.bot.telegram.sendMessage(
      this.id,
      'Con la llegada de la noche experimentaste un extraño hormigueo, una sensación dolorosa que atravesaba todo el cuerpo,' +
      ' te transformaste rápidamente ... ¡Ahora eres un Lobo!\n'
    );

    await this.role.sendAlliesMessage?.(true);
    this.infected = false;
  }

  // Binds the player to a new lover
  loveBind = async (newLover) => {
    if (!this.role) return;
    await this.role.killLover('lover_betrayal');
    await newLover.role?.killLover('lover_betrayal');

    this.lover = newLover;
    newLover.lover = this;

    await this.role.sendLoverMessage(this);
    await this.role.sendLoverMessage(newLover);
  }

  // Handles the player being killed
  onKilled = async (killer, type) => {
    if (!this.player.isAlive) return;
    if (RoleBase.game.players.find(p =>
      p.role instanceof Martyr
      && p.role.specialCondition.protectedPlayer === this.player
      && p.role.protectedPlayerKiller === killer
      && killer !== undefined)) return
    if (await this.handleDeath(killer, type)) {
      /*type !== 'loverDeath' && */
      this.movePlayer();
      await this.killLover('loverDeath')
      // await silentPlayer(RoleBase.game.chatId, String(this.player.id), RoleBase.game.bot)
    }
  }

  // Kills the player's lover
  killLover = async (type) => {
    if (!this.player.lover) return

    if (type !== 'loverDeath')
      this.player.lover.lover = undefined;

    await this.player.lover.role?.onKilled(this.player, type);
  }

  // Sends a message to the player's new lover
  sendLoverMessage = async (newLover) => {
    newLover.lover && await RoleBase.game.bot.telegram.sendAnimation(
      newLover.id,
      'https://media.giphy.com/media/VgU9D8avczJWJi08dT/giphy.gif',
      {
        caption: `Fuiste golpeado por el amor. ${playerLink(newLover.lover)} siempre en tu memoria ` +
          'y el amor nunca se apagará en tu corazón ... ¡Tu objetivo es sobrevivir! Si uno de ustedes muere,' +
          ' el otro morirá de tristeza y anhelo.'
      }
    )
  }

  // Handles the player being protected by a Guardian Angel
  handleGuardianAngel = async (killer) => {
    const guardianAngelPlayer = killer.role?.targetPlayer?.guardianAngel;
    if (guardianAngelPlayer
      && guardianAngelPlayer.role instanceof GuardianAngel
      && killer.role?.targetPlayer) { // Дополнительная проверка нужна для доступа к полям GuardianAngel
      await RoleBase.game.bot.telegram.sendMessage(
        killer.id,
        `Al llegar a casa de ${playerLink(killer.role.targetPlayer)}, ` +
        `en la puerta te encontraste con ${guardianAngelPlayer.role.roleName}, ` +
        'y te pidieron cortésmente que te fueras. Te negaste, así que te dieron una paliza y huiste.'
      )

      await RoleBase.game.bot.telegram.sendMessage(
        killer.role.targetPlayer.id,
        `${guardianAngelPlayer.role.roleName} te observó esta noche y te protegió del mal.`
      )

      let ending = '';
      if (guardianAngelPlayer.role.numberOfAttacks)
        ending = ' ¡Otra vez!'

      await RoleBase.game.bot.telegram.sendMessage(
        guardianAngelPlayer.id,
        `Acertaste con la elección, ` +
        `${playerLink(killer.role.targetPlayer)} realmente fue atacado! ¡Le salvaste la vida!`
        + ending
      )

      guardianAngelPlayer.role.numberOfAttacks++;
    }
  }

  // Marks the player's night action as done
  doneNightAction = () => {
    if (RoleBase.game.stage === 'night') {
      this.nightActionDone = true;
      if (!RoleBase.game.players
        .find(p => p.isAlive && p.role?.nightActionDone === false && !p.daysLeftToUnfreeze))
        RoleBase.game.setNextStage()
    }
  }

  // Moves the player to the end of the players array
  movePlayer = () => {
    RoleBase.game.players.push(...RoleBase.game.players.splice(
      RoleBase.game.players.indexOf(this.player), 1)); // Delete current player and push it to the end
  }

  // Handles the player's death
  async handleDeath(killer, type) { // refactor
    if (type === 'loverDeath') {
      killer?.role && await RoleBase.game.bot.telegram.sendMessage(
        RoleBase.game.chatId,
        `Al echar un vistazo al cuerpo muerto de ${playerLink(killer)}, ` +
        `${playerLink(this.player)} cae de rodillas y llora. ` +
        `${playerLink(this.player)}, sin soportar el dolor, toma la pistola más cercana y ` +
        (this.player.role instanceof Suicide
          ? 'antes de apretar el gatillo, su corazón se detiene por el dolor. ¡No tiene tiempo para acabar con él mismo!'
          : 'dispara en sí mismo ...') +
        `\n${playerLink(this.player)} era *${this.roleName}*.`
      )

      // new message for players if their lover died
    } else if (type === 'lover_betrayal') {
      await RoleBase.game.bot.telegram.sendMessage(
        RoleBase.game.chatId,
        'Los aldeanos se despiertan a la mañana siguiente y descubren que' +
        ` ${playerLink(this.player)} se suicidó anoche. ` +
        'Junto al cuerpo frío hay una carta de amor sin terminar.'
      )

      killer && await RoleBase.game.bot.telegram.sendMessage(
        killer.id,
        'Como te enamoras de otra persona,' +
        ` ${playerLink(this.player)} debe dejarte. ` +
        'Te separas de él, sin preocuparte más por su bienestar.'
      )
    } else if (type === 'thiefCameToCowboy' || type === 'thiefCameToSerialKiller') {

    } else if (killer?.role) {
      if (type === 'shotByGunner')
        killer.role.actionAnnouncement && await RoleBase.game.bot.telegram.sendAnimation(
          RoleBase.game.chatId,
          killer.role.actionAnnouncement().gif, { caption: killer.role.actionAnnouncement().message }
        )
      else if (killer.role.killMessage) {
        await RoleBase.game.bot.telegram.sendMessage(
          RoleBase.game.chatId,
          killer.role.killMessage().text.toChat(this.player)
        );

        await RoleBase.game.bot.telegram.sendAnimation(
          this.player.id,
          killer.role.killMessage().gif,
          {
            caption: killer.role.killMessage().text.toTarget
          }
        );
      }
    } else if (!killer) {
      await RoleBase.game.bot.telegram.sendMessage(
        RoleBase.game.chatId,
        `Los aldeanos dieron sus votos en dudas y sospechas ... \n`
        + `${playerLink(this.player, true)} está muerto!`
      )
    }
    this.player.isAlive = false;
    return true;
  }

  // Edits the player's choice message text
  choiceMsgEditText = (targetPlayer = this.targetPlayer) => RoleBase.game.bot.telegram.editMessageText(
    `Elección aceptada - ${targetPlayer
      ? playerLink(targetPlayer)
      : 'Saltar'}.`,
    {
      message_id: this.actionMsgId,
      chat_id: this.player.id,
    }
  ).catch(() => {
  })

  // Creates a new instance of this role for the given player
  createThisRole = (player, previousRole) =>
    new this.constructor(player, previousRole);
}

module.exports = { RoleBase };
