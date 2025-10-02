
import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import type { AuctionType } from "../types/AuctionType";
import { getAuctions } from "../services/getAuctions";
import { postAuctions } from "../services/postAuctions";

type AuctionContextType = {
  auctionItems: AuctionType[];
  setAuctionItems: (arr: AuctionType[]) => void;
  createNewAuction: (obj: AuctionType) => Promise<{ status: boolean; message: string }>;
  refetchAuctions: () => Promise<void>;
};

export const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [auctionItems, setAuctionItems] = useState<AuctionType[]>([]);

 
  useEffect(() => {
    const fetchInitialAuctions = async () => {
      const data = await getAuctions();
      if (data) setAuctionItems(data);
    };
    fetchInitialAuctions();
  }, [auctionItems]);

 
  const refetchAuctions = async () => {
    const data = await getAuctions();
    if (data) setAuctionItems(data);
  };

  const createNewAuction = async (newAuction: AuctionType): Promise<{ status: boolean; message: string }> => {
    const newAuctionObj = await postAuctions(newAuction);
    if (newAuctionObj) {
      await refetchAuctions(); // refresh after creation
      return { status: true, message: "Auction Created Successfully" };
    } else {
      return { status: false, message: "Auction is Not Created!" };
    }
  };

  return (
    <AuctionContext.Provider value={{ auctionItems, setAuctionItems, createNewAuction, refetchAuctions }}>
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuctionContext() {
  const context = useContext(AuctionContext);
  if (!context) throw new Error("useAuctionContext must be used within AuctionProvider");
  return context;
}
