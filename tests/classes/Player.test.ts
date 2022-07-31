import { Player } from "@etabli/classes/entities/Player";

describe("Test person.ts", () => {
  let player: Player;
  beforeEach(() => (player = new Player("Steve")));


  it("should have Steve as a name", () => {
    expect(player.name).toBe("Steve");
  });
});
