import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './index.css';
import { Routes } from "./routes/Route";
import { AuthProvider } from "./context/AuthContext";
import { AuctionProvider } from "./context/AuctionContext";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div>
      <AuthProvider>
      <AuctionProvider>
        <Routes/>
      </AuctionProvider>
       </AuthProvider>
      
    </div>
  );
}

export default App;
