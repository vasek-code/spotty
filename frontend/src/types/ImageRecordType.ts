export interface ImageRecordType {
  id: string,
  created: string,
  updated: string,
  '@collectionId': string,
  '@collectionName': string,
  images: string[],
  owner: string,
  '@expand': object
}