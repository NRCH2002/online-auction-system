import type { BidType } from "../types/BidType";
import type { UserType } from "../types/UserType";
import { getUsers } from "./getUsers";

export const patchBid = async (currentUser: UserType, newBid: BidType) => {
  try {
    const users: UserType[] = await getUsers();

    const updatedUsers = await Promise.all(
      users.map(async (user: UserType) => {
        // Update bids for each user
        const updatedBids = user.bids.map((bid: BidType) => {
          if (bid.auctionId === newBid.auctionId && bid.status === "ongoing") {
            return { ...bid, status: "discarded" };
          }
          return bid;
        });

        // If this is the current user, add the new bid
        if (user.id === currentUser.id) {
          updatedBids.push(newBid);
        }

        // PATCH updated user to server
        const res = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bids: updatedBids }),
        });

        if (!res.ok) throw new Error("Failed to update user bids");
        const updatedUser: UserType = await res.json();
        return updatedUser;
      })
    );

    return updatedUsers; // return all updated users
  } catch (e) {
    console.error("Error patching bids:", e);
    return null;
  }
};
