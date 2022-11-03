export interface MarkerRecordType {
  id: string,
  created: string,
  updated: string,
  '@collectionId': string,
  '@collectionName': string,
  creator: string,
  description: string,
  hashtags: string[],
  images: string,
  lat: number,
  lng: number,
  title: string,
  '@expand': object
}