import { useState } from "react";

export default function useGoogleDriveJson<T>(publicFileId: string) {
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://drive.google.com/uc?id=${publicFileId}&export=download`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = JSON.parse(await response.text()) as T;
      setData(data);
    } catch (error) {
      console.log("Error fetching Meta:", error);
    }
  };

  return { data, fetchData };
}
