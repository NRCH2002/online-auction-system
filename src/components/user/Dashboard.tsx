import { useEffect, useState } from "react";
import { getAuctions } from "../../services/getAuctions";
import AuctionCard from "../AuctionCard";
import { useAuctionContext } from "../../context/AuctionContext";
import Carousel from "../Carousel";
import type { AuctionType } from "../../types/AuctionType";

function Dashboard() {
  let {setAuctionItems} = useAuctionContext()
  let [activeAuctions,setActiveAuctions] = useState<AuctionType[]>([])


  const handleAuctions =(data:AuctionType[])=>{
    let auctions = data.filter((auction:AuctionType)=>auction.status==="active")
    setActiveAuctions(auctions)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuctions();
      if (data) {setAuctionItems(data);handleAuctions(data)}
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Carousel/>
      <div className=" p-5">
        <h3 className=" fw-bold">Active Auctions</h3>
        <div className="d-flex flex-wrap gap-4">
          {activeAuctions.map((item:AuctionType,index:number) => (
          <AuctionCard  key={index} auctionItem={item} />
        ))}
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
