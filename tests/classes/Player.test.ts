import { Player } from "core/classes/Player";

describe("Test person.ts", () => {
  let player: Player;

  beforeEach(() => (player = new Player("Steve")));

  test("should have Steve as a name", () => {
    expect(player.name).toBe("Steve");
  });
});
