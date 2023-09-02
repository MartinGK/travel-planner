import haversineDistance, {
  type Points,
} from "../../src/utils/haversineDistance";
import { cities } from "../../src/utils/fakeApi/AppendixA.json";

const [, ...ParisPoints] = cities[0];
const [, ...MarseillePoints] = cities[1];
const [, ...LyonPoints] = cities[2];
const [, ...DijonPoints] = cities.filter((data) => data[0] === "Dijon")[0];

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
