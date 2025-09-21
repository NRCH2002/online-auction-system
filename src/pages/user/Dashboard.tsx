import { useEffect } from "react";
import { getAuctions } from "../../api/getAuctions";
import AuctionCard from "../../components/AuctionCard";
import { useAuctionContext } from "../../context/AuctionContext";
import type { AuctionItemType } from "../../types/AuctionItemType";


function Dashboard() {
  let {auctionItems,setAuctionItems} = useAuctionContext()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuctions();
      if (data) setAuctionItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="display-3">Active Auctions</h1>

      <div className="d-flex flex-wrap gap-4">
        {auctionItems.map((item:AuctionItemType) => (
          <AuctionCard key={item.id} auctionItem={item} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard