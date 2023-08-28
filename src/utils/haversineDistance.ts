// https://en.wikipedia.org/wiki/Haversine_formula

type HaversineProps = {
  firstPoint: [number, number];
  secondPoint: [number, number];
};

export default function haversineDistance({
  firstPoint,
  secondPoint,
}: HaversineProps): number {
  const [lat1, lon1] = firstPoint;
  const [lat2, lon2] = secondPoint;
  const R = 6371; // Earth's radius in kilometers

  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
}
