import { useEffect, useState } from "react";

export function useGoogleDriveJson<T>(publicFileId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicFileId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://drive.google.com/uc?export=download&id=${publicFileId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = JSON.parse(await response.text()) as T;
        setData(data);
      } catch (err) {
        setError((err as string) || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [publicFileId]);

  return { data, loading, error };
}
