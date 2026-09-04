import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface UseCSVResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

const cache = new Map<string, any[]>();

export function useCSV<T>(url: string): UseCSVResult<T> {
  const [data, setData] = useState<T[]>(cache.get(url) || []);
  const [loading, setLoading] = useState<boolean>(!cache.has(url));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cache.has(url)) {
      setData(cache.get(url)!);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.status} ${response.statusText} (${url})`);
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse<T>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (isMounted) {
              cache.set(url, results.data);
              setData(results.data);
              setLoading(false);
            }
          },
          error: (parseError: Error) => {
            if (isMounted) {
              setError(new Error(parseError.message));
              setLoading(false);
            }
          },
        });
      })
      .catch((fetchError) => {
        if (isMounted) {
          setError(fetchError);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
