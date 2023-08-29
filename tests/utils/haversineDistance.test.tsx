import haversineDistance, { Points } from "../../src/utils/haversineDistance";
import AppendixA from "../../src/utils/AppendixA.json";

const [_, ...ParisPoints] = AppendixA[0];
const [__, ...MarseillePoints] = AppendixA[1];

describe("haversineDistance", () => {
  test("calculates haversine distance correctly", () => {
    const distance = haversineDistance({
      firstPoints: ParisPoints as Points,
      secondPoints: MarseillePoints as Points,
    });
    // This is a rough estimate, not an exact value
    expect(distance).toBeCloseTo(660.5, 1); // Rounded to 1 decimal
  });
});
