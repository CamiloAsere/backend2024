this.allowEvents = [ 'vote' ]; // allowed events' name, such as 'kill'
Role.prototype.isAllowed = function (ev) {
    return this.allowEvents.indexOf(ev) >= 0;
  };
  