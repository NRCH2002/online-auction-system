export type AuctionType = {
  id?:string;
  auctionId: string;
  userId:string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  startingPrice: string;
  currentBid: number;
  bidCount: number;
  productQuality:string;
  endTime: string;
  status:string;
  createdAt:string;
  updatedAt?:string
};