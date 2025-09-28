import type { BidType } from "../types/BidType";
import type { UserType } from "../types/UserType";
import type { AuctionType } from "../types/AuctionType";

export const deleteBid = async (user: UserType, bid: BidType) => {
  try {
    // 1. Remove bid from user
    const updatedBids = user.bids.filter((b: BidType) => b.bidId !== bid.bidId);

    const userRes = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bids: updatedBids }),
    });

    if (!userRes.ok) {
      alert("Failed to update user, status: " + userRes.status);
      return null;
    }
    const updatedUser: UserType = await userRes.json();

    // 2. Fetch all auctions to find the one by auctionId
    const allAuctionsRes = await fetch(`http://localhost:3000/auctions`);
    if (!allAuctionsRes.ok) {
      alert("Failed to fetch auctions, status: " + allAuctionsRes.status);
      return null;
    }
    const allAuctions: AuctionType[] = await allAuctionsRes.json();

    const auction = allAuctions.find(a => a.auctionId === bid.auctionId);
    if (!auction) {
      alert("Auction not found");
      return null;
    }

    // 3. Update bidCount in the auction
    const updatedAuctionData = {
      bidCount: Math.max(auction.bidCount - 1, 0),
    };

    const auctionUpdateRes = await fetch(`http://localhost:3000/auctions/${auction.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuctionData),
    });

    if (!auctionUpdateRes.ok) {
      alert("Failed to update auction, status: " + auctionUpdateRes.status);
      return null;
    }
    const updatedAuction: AuctionType = await auctionUpdateRes.json();

    return { updatedUser, updatedAuction };

  } catch (e: any) {
    alert(`Failed to delete bid: ${e.message}`);
    return null;
  }
};
