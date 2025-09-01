import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Search from "./pages/communities";
import Posts from "./pages/posts";
import PageNotFound from "./pages/pagenotfound";

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="search" element={<Search />}></Route>
        <Route path="posts" element={<Posts />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
