export const BAINBRIDGE_GEOFENCE: ReadonlyArray<readonly [number, number]> = [
  [47.486, -122.535],
  [47.515, -122.610],
  [47.620, -122.645],
  [47.730, -122.585],
  [47.760, -122.500],
  [47.720, -122.425],
  [47.600, -122.415],
  [47.500, -122.465],
];

export function pointInPolygon(
  lat: number,
  lng: number,
  polygon: ReadonlyArray<readonly [number, number]> = BAINBRIDGE_GEOFENCE
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [latI, lngI] = polygon[i];
    const [latJ, lngJ] = polygon[j];
    const crosses = (lngI > lng) !== (lngJ > lng) &&
      lat < ((latJ - latI) * (lng - lngI)) / (lngJ - lngI) + latI;
    if (crosses) inside = !inside;
  }
  return inside;
}

export function isBainbridgeLocation(location: {
  coordinates: { lat: number; lng: number };
  title?: string | null;
  address?: string | null;
  description?: string | null;
}): boolean {
  if (pointInPolygon(location.coordinates.lat, location.coordinates.lng)) return true;
  return /bainbridge island/i.test(
    `${location.title ?? ''} ${location.address ?? ''} ${location.description ?? ''}`
  );
}
