import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuctionType } from "../types/AuctionType";
import { postAuctions } from "../services/postAuctions";
// import { useAuth } from "./AuthContext";
// import { patchUser } from "../services/patchUser";


type AuctionContextType ={
    auctionItems:AuctionType[];
    setAuctionItems:(arr:AuctionType[])=>void;
    createNewAuction:(obj:AuctionType)=>Promise<{ status: boolean; message: string; }>
}

export let AuctionContext = createContext<AuctionContextType|undefined>(undefined)

export function AuctionProvider({children}: { children: ReactNode }){

//    let {user,setUser} = useAuth()

    let [auctionItems,setAuctionItems] = useState<AuctionType[]>([])

    const createNewAuction= async (newAuction:AuctionType):Promise<{ status: boolean; message: string; }>=>{
        let newAuctionObj = await postAuctions(newAuction) 
        if(newAuctionObj){
            setAuctionItems([...auctionItems,newAuction])
            return{status:true,message:"Auction Created Successfully"}
            // if (newAuction.auctionId && user) {
            // let res = await patchUser(user,newAuction)
            //     if (res) {
            //         setUser(res);
            //         return{status:true,message:"Auction Created Successfully"}
            //     }
            //     return{status:false,message:"Auction is Created but User is Not Updated!"}     
            // }
            // else {
            //     return{status:false,message:"Auction is Created but User is Not Updated!"}
            //  }
            
        }else{
           return {status:false,message:"Auction is Not Created!"}
        }

    }

    return(<AuctionContext.Provider value={{auctionItems,setAuctionItems,createNewAuction}}>{children}</AuctionContext.Provider>)
}

export function useAuctionContext(){
    let context= useContext(AuctionContext)
     if (!context) throw new Error("useAuctionContext must be used within AuctionProvider");
    return context
}