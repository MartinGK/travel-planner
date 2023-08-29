// https://en.wikipedia.org/wiki/Haversine_formula
export type Points = [number, number];

type HaversineProps = {
  firstPoints: Points;
  secondPoints: Points;
};

function convertNumberToRad(num: number) {
  return (num * Math.PI) / 180;
}

export default function haversineDistance({
  firstPoints,
  secondPoints,
}: HaversineProps): number {
  const [lat1, lon1] = firstPoints;
  const [lat2, lon2] = secondPoints;

  const R = 6371; // Earth's radius in kilometers

  const dLat = convertNumberToRad(lat2 - lat1);
  const dLon = convertNumberToRad(lon2 - lon1);

  //haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(convertNumberToRad(lat1)) *
      Math.cos(convertNumberToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
}
