import { createContext, useState, useContext, type ReactNode } from "react";
import type { UserType } from "../types/UserType";
import { getUsers } from "../services/getUsers";
import { postUsers } from "../services/postUsers";
import type { UserInputType } from "../types/UserInputType";


interface AuthContextType {
  user: UserType | null; //goobal state
  setUser:(userObj:UserType)=>void
  signup: (userDetails:UserType) => Promise<{ success: boolean; message: string }> ;
  login: (userInput:UserInputType) => Promise<{ success: boolean; message: string}>;
  logout: () => void;
}

//creating context store
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//creating context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  
  const [user, setUser] = useState<UserType | null>(null);
  

  async function signup(userDetails:UserType):Promise<{ success: boolean; message: string }>  {

     let usersData = (await getUsers()) || [];
        //if user email found it return true else fasle
        const nameExists = usersData.some((userObj: UserType) => userObj.email === userDetails.email);
    
        if (nameExists){
          return { success: false, message: "Your Email already registered. Please login" }
        }
        else {
          const postUser = await postUsers(userDetails);
          if (postUser) {
            setUser(postUser)
            return { success: true, message: "Sucessfully registered" }
          }
          else{
            return { success: false, message: "Registeration failed. Please try again." }
          }
          
        }
      };
  

  async function login(userInput:UserInputType):Promise<{ success: boolean; message: string }> {
   let usersData = await getUsers(); //api request from sever to validate user

    //it will check the form details consists in server and return one object if not matches it return undefined
    const validUser = usersData.find(
      (u: UserType) =>
        u.email === userInput.email && u.password === userInput.password
    );


  if(validUser){
    if((validUser)&&(validUser.role === "user")){
      setUser({...validUser})
      return({success:true,message:"User login Successful"})
    }
    else{
      setUser({...validUser})
      return({success:true,message:"Admin login Successful"})
    }}
   else{
      setUser(null)
      return({success:false,message:"Invalid credentials"})
    }

  }

  function logout() {
    setUser(null);
    
  }

  return (
    <AuthContext.Provider value={{ user,setUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
