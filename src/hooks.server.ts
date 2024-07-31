import { type Handle } from "@sveltejs/kit";
import Database from "better-sqlite3";

const db = new Database("src/lib/db/db.sqlite", { readonly: true });

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  
  // Only process if the path is not the root
  if (path !== '/') {
    const searchQueryMatch = path.match(/^\/([^/]+)/);

    if (searchQueryMatch) {
      const query = decodeURIComponent(searchQueryMatch[1]);

      // Check for bad words
      const stmt = db.prepare('SELECT word FROM bad_words WHERE ? LIKE \'% \' || word || \' %\' OR ? LIKE word || \' %\' OR ? LIKE \'% \' || word OR ? = word');
      const result = stmt.get(query.toLowerCase(), query.toLowerCase(), query.toLowerCase(), query.toLowerCase());

      if (result) {
        // Bad word found, redirect to home page
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }
  }

  // No bad words found or no search query, continue with the request
  return await resolve(event);
};