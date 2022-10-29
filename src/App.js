import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const cartItems=useSelector((state)=>state.cart.itemsList);
  console.log(cartItems);
  console.log(isLoggedIn);
  return (
    <div className="App">
      {!isLoggedIn && <Auth/>}
      {isLoggedIn && <Layout/>}
      {/* <Layout /> */}
    </div>
  );
}

export default App;