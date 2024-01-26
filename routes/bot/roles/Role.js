

export class Player {
  constructor(user) {
    this.id = user.id;
    this.name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    this.username = user.username;

    this.isAlive = true;
    this.daysLeftToUnfreeze = 0;
  }

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

  loveBind = async (newLover) => {
    if (!this.role) return;
    await this.role.killLover('lover_betrayal');
    await newLover.role?.killLover('lover_betrayal');

    this.lover = newLover;
    newLover.lover = this;

    await this.role.sendLoverMessage(this);
    await this.role.sendLoverMessage(newLover);
  }
}

