const { Player } = require("@etabli/classes/entities/Player");
const chalk = require("chalk");

module.exports = async function () {
  Player.prototype.exampleMod = function () {
    return (
      chalk.bgBlue.whiteBright(" MOD-EXAMPLE ") +
      "\t" +
      "This is an example mod, and it works!"
    );
  };
};
