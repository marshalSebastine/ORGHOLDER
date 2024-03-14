
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";
import SignUp from "./Routes/SignUp/SignUp";
import Dashboard from "./Routes/DashBoard/DashBoard";
import userReducer from "./Reducers/userReducer";
import { UserContext, UserDispatchContext } from "./Reducers/userReducer";
import { useReducer } from 'react';

function App() {
  const [user, dispatch] = useReducer(
    userReducer,
    {}
  );
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </UserDispatchContext.Provider>
    </UserContext.Provider>

  )
}

export default App;
