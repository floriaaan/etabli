const { Player } = require("@etabli/classes/entities/Player");

module.exports = async function () {
  Player.prototype.exampleMod = function () {
    return "This is an example mod, and it works!";
  };
};
