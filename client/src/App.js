
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";

function App() {

  return (
    <>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Login />} path="/login"/>
      </Routes>
    </>
  )
}

export default App;
