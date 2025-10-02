import type { AuctionType } from "../types/AuctionType";
import type { UserType } from "../types/UserType";
import { getAuctions } from "./getAuctions";
import { getUsers } from "./getUsers";

export const patchAuction = async (updatedAuction: AuctionType): Promise<AuctionType | null> => {
  try {
    // If startingPrice < currentBid, discard ongoing bids
    if (Number(updatedAuction.startingPrice) > Number(updatedAuction.currentBid)) {
      const users = await getUsers();
      if (users) {
        const updatedUsers = users.map((user: UserType) => ({
          ...user,
          bids: user.bids.map(bid =>
            bid.auctionId === updatedAuction.auctionId && bid.status === "ongoing"
              ? { ...bid, status: "discarded" }
              : bid
          ),
        }));

        // Update all users on the server
        for (const user of updatedUsers) {
          await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
        }

        // Update the specific auction in the auctions list
        const auctions = await getAuctions();
        if (auctions) {
          const auctionFound = auctions.find(
            (auction: AuctionType) => auction.auctionId === updatedAuction.auctionId
          );
          if (auctionFound) {
            const updated = {
              ...auctionFound,
              bidCount: 0,
              currentBid: "0",  
              startingPrice: updatedAuction.startingPrice,
            };

            const res1 = await fetch(`http://localhost:3000/auctions/${updated.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updated),
            });

            if (!res1.ok) {
              console.error("Failed to update auction:", res1.statusText);
            }
          }
        }
      }
    }

    // Update the main auction itself
    const res = await fetch(`http://localhost:3000/auctions/${updatedAuction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuction),
    });

    if (!res.ok) {
      console.error("Failed to update auction:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error while updating auction:", e);
    return null;
  }
};
