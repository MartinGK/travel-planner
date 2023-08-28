import haversineDistance from "../../src/utils/haversineDistance";

describe("haversineDistance", () => {
  test("calculates haversine distance correctly", () => {
    const distance = haversineDistance({
      firstPoint: [52.52, 13.405],
      secondPoint: [48.8566, 2.3522],
    });
    // This is a rough estimate, not an exact value
    expect(distance).toBeCloseTo(878.9, 2); // Rounded to 2 decimal places
  });
});
