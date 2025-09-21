import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes } from "./routes/Route";
import { AuthProvider } from "./context/AuthContext";
import { AuctionProvider } from "./context/AuctionContext";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div>
      <AuctionProvider>
        <AuthProvider>
        <Routes/>
      </AuthProvider>
      </AuctionProvider>
      
    </div>
  );
}

export default App;
