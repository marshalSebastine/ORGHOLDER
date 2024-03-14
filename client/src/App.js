
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";
import SignUp from "./Routes/SignUp/SignUp";


function App() {

  return (
    <>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Login />} path="/login"/>
        <Route element={<SignUp />} path="/signup"/>
      </Routes>
    </>
  )
}

export default App;
