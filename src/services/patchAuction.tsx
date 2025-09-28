import { useAuctionContext } from "../context/AuctionContext";
import type { AuctionType } from "../types/AuctionType";
import type { BidType } from "../types/BidType";



export const patchAuctions = async(newbid:BidType|null=null)=>{
    try {
         let {auctionItems}=useAuctionContext()
    let updatedAuctions:AuctionType[]=[]
    if(newbid){
        updatedAuctions= auctionItems.map((auction:AuctionType)=>{
            if(auction.auctionId===newbid.auctionId){
                let updatedBidCount=auction.bidCount+1
                let updatedCurrentBid=newbid.bidAmount
                return {...auction,currentBid:updatedCurrentBid,bidCount:updatedBidCount}
            }       
            return auction
        })
    }
    let res = await fetch(`http://localhost:4000/auctions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },    
        body: JSON.stringify(updatedAuctions)
      });
        if(res.ok){ 
            const updatedAuctionList = await res.json();
            return updatedAuctionList
        }
        alert("Failed to update auctions, status: " + res.status);
        return null;
    } catch (error: any) {
        console.error("Error updating auctions:", error.message);
        return null;
    }   

    

}