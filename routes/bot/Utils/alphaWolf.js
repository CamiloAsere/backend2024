
//const { Beauty, Cursed, Wolf } = require("../index");


class AlphaWolf extends Wolf {
  roleName = 'Alfa-Lobo';
  roleIntroductionText = () => `Eres ${this.roleName} - ¡la fuente de todas las desgracias!`
  startMessageText = () => 'Tus mordiscos transmiten una maldición que convierte a un humano en un lobo. ' +
    'Por la noche puedes elegir a una persona y luego atacarla y matarla, pero mientras estés vivo, ' +
    'tus víctimas tienen un 25% de posibilidades de convertirse en lobos.'
  actionResolve = async () => {
    if (!this.targetPlayer?.role) return;
    if (!this.targetPlayer.isVulnerableToAttack()) {
      await this.handleGuardianAngel(this.player);
      return;
    }
    if (this.targetPlayer.role instanceof Beauty && this.targetPlayer.lover !== this.player) {
      await this.player.loveBind(this.targetPlayer);
      return;
    }
    const currentTargetHandleDeath = this.targetPlayer.role.handleDeath.bind(this.targetPlayer.role)
    this.targetPlayer.role.handleDeath = async (killer, deathType) => {
      if (!this.targetPlayer || Math.random() >= .25 || this.targetPlayer.role instanceof Cursed || this.targetPlayer.role instanceof Wolf) return currentTargetHandleDeath(killer, deathType);
      await AlphaWolf.game.bot.sendMessage(
        this.targetPlayer.id,
        `Fuiste atacado(a) por los lobos, pero ${this.roleName} te eligió. ` +
        'En lugar de ser asesinado(a), fuiste infectado(a)... ' +
        '¡Y mañana por la noche te convertirás en un lobo!'
      )
      const wolfPlayers = AlphaWolf.game.getPlayersFromStart().filter(player => player.role instanceof Wolf);
      wolfPlayers.forEach(player => this.targetPlayer && AlphaWolf.game.bot.sendMessage(
        player.id,
        `Tan pronto como los lobos atacaron a ${playerLink(this.targetPlayer)}, ` +
        `${playerLink(this.player)} detuvo a todos. ` +
        `${playerLink(this.player, true)} le dijo a la manada, ` +
        `que ${playerLink(this.targetPlayer)} debería ` +
        'unirse a la manada en lugar de ' +
        `morir y la manada dejó a ${playerLink(this.targetPlayer)} con una infección. ` +
        'Se convertirá en un lobo mañana por la noche.'
      ))
      this.targetPlayer.infected = true;
      return false;
    }
    await this.targetPlayer.role?.onKilled(this.player);
  }
}
