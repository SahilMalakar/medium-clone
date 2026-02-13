import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Blog from "./pages/Blog";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
