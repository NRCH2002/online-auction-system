import { useEffect, useState } from "react";
import AuctionCard from "../AuctionCard";
import Carousel from "../Carousel";
import { useAuctionContext } from "../../context/AuctionContext";
import { useSearchTermContext } from "../../context/SearchTermContext";
import type { AuctionType } from "../../types/AuctionType";

function Dashboard() {
  const { auctionItems } = useAuctionContext();
  const { searchTerm } = useSearchTermContext();
  const [activeAuctions, setActiveAuctions] = useState<AuctionType[]>([]);

  // Filter auctions when searchTerm or auctionItems change
  useEffect(() => {
    const search = searchTerm.trim().toLowerCase();
    const filtered = auctionItems.filter(
      (auction) =>
        auction.status === "active" &&
        (auction.title.toLowerCase().includes(search) ||
          auction.description.toLowerCase().includes(search) ||
          auction.category.toLowerCase().includes(search))
    );
    setActiveAuctions(filtered);
  }, [searchTerm, auctionItems]);

  return (
    <div>
      <Carousel />
      <div className="p-5">
        <h3 className="fw-bold">Active Auctions</h3>
        <div className="d-flex flex-wrap gap-4">
          {activeAuctions.map((item, index) => (
            <AuctionCard key={index} auctionItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
