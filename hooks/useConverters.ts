import { useState, useEffect } from 'react';

export const useConverters = () => {
  const [turndown, setTurndown] = useState<any>(null);
  const [showdown, setShowdown] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const Turndown = await import('turndown');
        const Showdown = await import('showdown');
        setTurndown(new Turndown.default());
        setShowdown(new Showdown.Converter());
      } catch {
        setError('Failed to load converters');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { turndown, showdown, loading, error };
};
