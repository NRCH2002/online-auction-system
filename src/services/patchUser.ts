import type { BidType } from "../types/BidType";
import type { ProfileType } from "../types/ProfileType";
import type { UserType } from "../types/UserType";
import type { AuctionType } from "../types/AuctionType";

export async function patchUser(
  user: UserType,
  newBid: BidType | null = null,
  editProfile: ProfileType | null = null
): Promise<UserType | null> {
  try {
    const patchUserData: Partial<UserType> = {};

    // Add new bid if provided
    if (newBid) {
      patchUserData.bids = [...user.bids, newBid];
    }

    // Add profile edits if provided
    if (editProfile) {
      patchUserData.name = editProfile.name;
      patchUserData.contact = editProfile.contact;
      patchUserData.gender = editProfile.gender;
      patchUserData.address = editProfile.address;
    }

    // 1. Update user
    const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchUserData),
    });

    if (!updateResponse.ok) throw new Error(`Failed to update user, status: ${updateResponse.status}`);
    const updatedUser: UserType = await updateResponse.json();

    // 2. If newBid exists, update the auction's bidCount
    if (newBid) {
      // Fetch all auctions
      const auctionsRes = await fetch(`http://localhost:3000/auctions`);
      if (!auctionsRes.ok) throw new Error("Failed to fetch auctions");

      const auctions: AuctionType[] = await auctionsRes.json();
      const auction = auctions.find(a => a.auctionId === newBid.auctionId);
      if (!auction) throw new Error("Auction not found");

      // Increment bidCount
      await fetch(`http://localhost:3000/auctions/${auction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidCount: auction.bidCount + 1 }),
      });
    }

    if (updateResponse.ok) {
      return updatedUser;
    }

    alert("Failed to update user, status: " + updateResponse.status);
    return null;

  } catch (error: any) {
    console.error("Error updating user or auction:", error.message);
    alert(`Error updating user or auction: ${error.message}`);
    return null;
  }
}
