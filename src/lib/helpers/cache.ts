import { KV_REST_API_TOKEN, KV_REST_API_URL } from '$env/static/private';
import { createClient } from '@vercel/kv';

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

interface VideoResult {
  id: string;
  title: string;
}

const CACHE_EXPIRY = 60 * 60 * 24; // 24 hours in seconds

export async function getResults(query: string): Promise<VideoResult[] | null> {
  try {
    const cachedResults = await kv.get<VideoResult[]>(query);
    return cachedResults;
  } catch (error) {
    console.error('Error fetching from cache:', error);
    return null;
  }
}

export async function saveResults(query: string, results: VideoResult[]): Promise<void> {
  try {
    await kv.set(query, results, { ex: CACHE_EXPIRY });
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}
