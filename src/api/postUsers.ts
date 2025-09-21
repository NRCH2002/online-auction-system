import type { UserType } from "../types/UserType";

export const postUsers = async function(newUser: UserType) {
    try {
        const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (res.ok) { // status 200–299
            const createdUser = await res.json();
            return createdUser;
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
