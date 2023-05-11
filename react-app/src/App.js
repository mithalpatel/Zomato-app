import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import RestaurantPage from "./components/RestaurantPage";
import Menupage from "./components/MenuPage";

function App() {
  return (
  <>
   <Routes>
     <Route path="/" element={<HomePage/>} />
     <Route path="/menu" element={<Menupage/>} />
     <Route path="/search/:id/:type" element={<SearchPage/>} />
     <Route path="/restaurant/:id" element={<RestaurantPage/>} />
   </Routes>
  </>
);
}
export default App;