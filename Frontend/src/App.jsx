import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import Home from "./pages/Home";


function App() {
  return (
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<Signup />} />
      </Routes>
  );
}

export default App ;
