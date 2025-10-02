import { useState, useEffect } from "react";

export function useCountDown(endTime: string) {
  const [displayTime, setDisplayTime] = useState<string>("");

  useEffect(() => {
    const targetTime = new Date(endTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((targetTime - now) / 1000); // seconds

      if (diff <= 0) {
        setDisplayTime("Action completed");
        clearInterval(interval); // now interval is accessible
      } else {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setDisplayTime(
          `${hours.toString().padStart(2, "0")}:` +
          `${minutes.toString().padStart(2, "0")}:` +
          `${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    // initialize immediately
    const now = Date.now();
    const diff = Math.floor((targetTime - now) / 1000);
    if (diff <= 0) {
      setDisplayTime("Action completed");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [endTime]);

  return displayTime;
}
