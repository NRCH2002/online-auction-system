import type { UserType } from "../types/UserType";

export const postUsers = async function(newUser: UserType) {
    try {
        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (res.status===201) { 
            const createdUserObj = await res.json();
            return createdUserObj;
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
