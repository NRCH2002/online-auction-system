import type { AuctionType } from "../types/AuctionType";
import type { BidType } from "../types/BidType";

export const updatedAuctionBid = async (newBid: BidType | null = null): Promise<AuctionType | null> => {
  if (!newBid) return null;

  try {
    // Fetching the auction by auctionId
    const auctionRes = await fetch(`http://localhost:4000/auctions?auctionId=${newBid.auctionId}`);
    if (!auctionRes.ok) {
      alert("Failed to fetch auction, status: " + auctionRes.status);
      return null;
    }

    const auctions: AuctionType[] = await auctionRes.json();
    if (auctions.length === 0) {
      alert("Auction not found");
      return null;
    }

    const auction = auctions[0];

    //  Updating bidCount and currentBid
    const updatedAuctionData = {
      bidCount: auction.bidCount + 1,
      currentBid: newBid.bidAmount,
    };

    // 3. PATCH request to update the auction
    const updateRes = await fetch(`http://localhost:4000/auctions/${auction.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuctionData),
    });

    if (updateRes.ok) {
      const updatedAuction = await updateRes.json();
      return updatedAuction;
    }

    alert("Failed to update auction, status: " + updateRes.status);
    return null;

  } catch (error: any) {
    alert("Error updating auction: " + error.message);
    return null;
  }
};
