import type { AuctionType } from "../types/AuctionType";
import type { BidType } from "../types/BidType";
import type { UserType } from "../types/UserType";
import { generateId } from "./generateId";
import { getUsers } from "./getUsers";
import { patchAuction } from "./patchAuction";

import { userStatusUpdate } from "./userStatusUpdate";

export const updateAuctionStatus = async (auction: AuctionType) => {
  // If no bids auction is unsold
  if (auction.bidCount === 0) {
    const updatedAuction = { ...auction, status: "unsold" };
    return await patchAuction(updatedAuction);
  }

  // If there are bids, find the winning bid
  const users = await getUsers();

  // Find the bid with status "ongoing" for this auction
  let winningUser: UserType | undefined;
  let winningBid: BidType | undefined;

  for (const user of users) {
    const bid = user.bids.find(
      (b:BidType) => b.auctionId === auction.auctionId && b.status === "ongoing"
    );
    if (bid) {
      winningUser = user;
      winningBid = bid;
      break; // stop after first found (assuming only one winning bid)
    }
  }

  if (winningUser && winningBid) {
    // Update only the winning bid
    const updatedBids = winningUser.bids.map((b) =>
      b.auctionId === auction.auctionId ? { ...b, status: "won" } : b
    );

    // payments
    generateId("payment_");
    const newPayment = {
      paymentId: generateId("payment_"),
      auctionId: auction.auctionId,
      amount: winningBid.bidAmount,
      status: "pending",
      paymentDate: new Date().toISOString(),
    };
    let updatedPayments = [...winningUser.payments, newPayment];

    await userStatusUpdate({ ...winningUser, bids: updatedBids , payments: updatedPayments});

    // Update auction status to sold
    const updatedAuction = { ...auction, status: "sold" };
    return await patchAuction(updatedAuction);
  }
    return null; 
};
