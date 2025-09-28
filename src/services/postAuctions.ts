import type { AuctionType } from "../types/AuctionType";

export const postAuctions = async function(newAuction: AuctionType) {
    try {
        const res = await fetch("http://localhost:3000/auctions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAuction),
        });

        if (res.status===201) { 
            const createdNewAuction = await res.json();
            return createdNewAuction;
        } else {
            alert("Failed to post user, status: " + res.status);
            return null;
        }
    } catch (err) {
        alert("Error While Posting Users");
        console.log(err);
        return null;
    }
};
