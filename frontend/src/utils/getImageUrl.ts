import { env } from "../env/client.mjs"

export const getImageUrl = (collectionId: string, recordId: string, filename: string) => {
  return `${env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${filename}`
}
