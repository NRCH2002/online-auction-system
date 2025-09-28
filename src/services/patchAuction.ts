import type { AuctionType } from "../types/AuctionType";

export const patchAuction= async(updatedAuction:AuctionType)=>{
    try{
        let res = await fetch(`http://localhost:3000/auctions/${updatedAuction.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updatedAuction)
    })
    if(res.ok){
        let data = await res.json()
        return data
    }
    else{
        return null
    }
    }
    catch(e){
        alert(`error while updating auction${e}`)
        return null
    }

}