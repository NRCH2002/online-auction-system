 export let getUsers = async function(){
    try{
    
        let res = await fetch("http://localhost:5000/users")
        if(res.ok){ // res.ok is true for status 200–299
            let users = await res.json()
            return users
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