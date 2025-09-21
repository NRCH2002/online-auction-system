import { createContext, useState, useContext, type ReactNode } from "react";
import type { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";


interface AuthContextType {
  user: UserType | null;
  signup: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (validUser:UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  
  const [user, setUser] = useState<UserType | null>(null);

  async function signup(username: string, password: string) {
    const res = await fetch(`http://localhost:4000/users?username=${username}`);
    const existing: UserType[] = await res.json();
    console.log(existing,"existing")
    if (existing.length > 0) {
      return { success: false, message: "User already exists" };
    }

    const newUser: User = { username, password };
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    return { success: true, message: "Signup successful" };
  }

  async function login(validUser:UserType) {
    // const res = await fetch(
    //   `http://localhost:4000/users?username=${username}&password=${password}`
    // );
    // const data: User[] = await res.json();
    // if ((data.length > 0)&&(true) ){
    //   setUser(data[0]);
    //   console.log(data)
    //   return { success: true };
    // }
    // return { success: false, message: "Invalid credentials" };
    setUser({...validUser})

  }

  function logout() {
    setUser(null);
  
    
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
