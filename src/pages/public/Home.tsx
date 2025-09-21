import { useEffect } from "react";
import { getAuctions } from "../../api/getAuctions";
import AuctionCard from "../../components/AuctionCard";
import { useAuctionContext } from "../../context/AuctionContext";
import type { AuctionItemType } from "../../types/AuctionItemType";
import Carousel from "../../components/Carousel";

function Home() {
  let {auctionItems,setAuctionItems} = useAuctionContext()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuctions();
      if (data) setAuctionItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Carousel/>
      <div className=" p-5">
        <h3 className=" fw-bold">Active Auctions</h3>
        <div className="d-flex flex-wrap gap-4">
          {auctionItems.map((item:AuctionItemType) => (
          <AuctionCard  key={item.id} auctionItem={item} />
        ))}

        </div>
        
      </div>
    </div>
  );
}

export default Home;
