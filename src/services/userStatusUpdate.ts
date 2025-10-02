
import type { UserType } from "../types/UserType";


export async function userStatusUpdate(
  user: UserType)
: Promise<UserType | null> {
  try {
    

    // 1. Update user
    const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }); 
    if (updateResponse.ok) {
        const updatedUser: UserType = await updateResponse.json();
        return updatedUser;
        }
    alert("Failed to update user, status: " + updateResponse.status);
    return null;
  }
    catch (e) {
        alert(`error while updating user${e}`);
        return null;
    }
}

    