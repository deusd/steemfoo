export type LocationType = {
  altitude: number,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
}

export type ImageType = {
  image: string,
  location: LocationType,
  timestamp: number,
  uri: string,
  height: number,
  width: number,
}