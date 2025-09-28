import type { AuctionType } from "../types/AuctionType";
import type { UserType } from "../types/UserType";

export const deleteAuction = async (auction: AuctionType) => {
  try {
    // 1️⃣ Delete the auction
    const res = await fetch(`http://localhost:3000/auctions/${auction.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete auction, status: " + res.status);
      return null;
    }

    // 2️⃣ Fetch all users
    const usersRes = await fetch(`http://localhost:3000/users`);
    if (!usersRes.ok) throw new Error("Failed to fetch users");
    const users: UserType[] = await usersRes.json();

    // 3️⃣ Remove bids that belong to deleted auction
    for (let user of users) {
      const updatedBids = user.bids.filter(bid => bid.auctionId !== auction.auctionId);
      if (updatedBids.length !== user.bids.length) {
        // Only patch if something changed
        await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bids: updatedBids }),
        });
      }
    }

    return auction; // Return the deleted auction
  } catch (e) {
    alert(`Failed to delete auction: ${e}`);
    return null;
  }
};
