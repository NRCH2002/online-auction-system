import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuctionItemType } from "../types/AuctionItemType";

type AuctionContextType ={
    auctionItems:AuctionItemType[];
    setAuctionItems:(arr:AuctionItemType[])=>void


}

export let AuctionContext = createContext<AuctionContextType|undefined>(undefined)

export function AuctionProvider({children}: { children: ReactNode }){
    let [auctionItems,setAuctionItems] = useState<AuctionItemType[]>([])

    return(<AuctionContext.Provider value={{auctionItems,setAuctionItems}}>{children}</AuctionContext.Provider>)
}

export function useAuctionContext(){
    let context= useContext(AuctionContext)
     if (!context) throw new Error("useAuctionContext must be used within AuctionProvider");
    return context
}