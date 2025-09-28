import { useState, useEffect } from "react";


export function auctionCountdown(durationHoursStr: string, createdAtStr?: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const durationHours = parseInt(durationHoursStr);

    // Use auction creation time if provided, else use current time
    const createdAt = createdAtStr ? new Date(createdAtStr) : new Date();
    const endTime = createdAt.getTime() + durationHours * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [durationHoursStr, createdAtStr]);

  return timeLeft;
}
