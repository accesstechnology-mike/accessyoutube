import youtube from "scrape-youtube";
import * as cache from "$lib/helpers/cache";
import { error } from "@sveltejs/kit";

function rewrite(v: string): string {
    if (v && v.trim() !== '') {
        // Remove multiple spaces
        v = v.replace(/\s+/g, ' ');
        
        // Trim leading and trailing spaces
        v = v.trim();
        
        // URL encode
        v = encodeURIComponent(v);
    } else {
        v = '';
    }
    
    return v;
}

export async function load({ params, url }) {
  try {
    const q = rewrite(params.query);
    const cached = url.searchParams.get("cached") !== "false";

    if (!q) {
      throw error(400, "Invalid query!");
    }

    const trimmedQuery = q.trim();

    if (cached) {
      const cachedResults = await cache.getResults(trimmedQuery);
      if (cachedResults && cachedResults.length !== 0) {
        return { results: cachedResults, cached: true, q: trimmedQuery };
      }
    }

    let searchResults = await youtube.search(trimmedQuery, {
      type: "video",
      request: {
        headers: {
          Cookie: "PREF=f2=8000000",
        },
      },
    });

    let freshResults = searchResults.videos.map((video) => ({
      id: video.id,
      title: video.title,
    }));

    if (freshResults.length > 0) {
      await cache.saveResults(trimmedQuery, freshResults);
    }

    return {
      results: freshResults,
      length: freshResults.length,
      q: trimmedQuery,
    };
  } catch (err) {
    console.error(err);
    throw error(500, "Backend error.");
  }
}