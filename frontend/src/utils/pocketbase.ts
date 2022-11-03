import PocketBase from 'pocketbase'
import { env } from '../env/server.mjs';

export const client = new PocketBase(env.POCKETBASE_URL);