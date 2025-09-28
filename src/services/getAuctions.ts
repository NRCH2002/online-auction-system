

 export let getAuctions = async function(){
    try{
    
        let res = await fetch("http://localhost:3000/auctions")
        if(res.ok){ // res.ok is true for status 200–299
            let auctions = await res.json()
            return auctions
        }
         else {
            alert("Failed to fetch users, status: " + res.status);
            return null;
        }

    }
    catch(err){
        console.log(err)
        alert("Error While Getting Users")
        return null;

    }
}