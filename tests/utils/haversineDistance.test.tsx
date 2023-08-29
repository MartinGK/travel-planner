import haversineDistance, { type Points } from "../../src/utils/haversineDistance";
import AppendixA from "../../src/utils/AppendixA.json";

const [, ...ParisPoints] = AppendixA[0];
const [, ...MarseillePoints] = AppendixA[1];
const [, ...LyonPoints] = AppendixA[2];
const [, ...DijonPoints] = AppendixA.filter((data) => data[0] === "Dijon")[0];

describe("haversineDistance: calculates haversine distance between", () => {
  test("Paris & Marseille", () => {
    const distance = haversineDistance({
      firstPoints: ParisPoints as Points,
      secondPoints: MarseillePoints as Points,
    });
    expect(distance).toBeCloseTo(660.5, 1); // Rounded to 1 decimal
  });

  test("Marseille & Lyon", () => {
    const distance = haversineDistance({
      firstPoints: MarseillePoints as Points,
      secondPoints: LyonPoints as Points,
    });
    expect(distance).toBeCloseTo(277.6, 1); // Rounded to 1 decimal
  });

  test("Paris & Dijon", () => {
    const distance = haversineDistance({
      firstPoints: ParisPoints as Points,
      secondPoints: DijonPoints as Points,
    });
    expect(distance).toBeCloseTo(262.7, 1); // Rounded to 1 decimal
  });
});
