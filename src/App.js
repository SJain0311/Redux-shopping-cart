import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.itemsList);

  useEffect(() => {
    if(isFirstRender)
    {
      isFirstRender=false;
      return;
    }
    const sendRequest = async () => {
      // Send State a sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending Request",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-shopping-cart-6772b-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending Request to Database success",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);
  // console.log(cartItems);
  // console.log(isLoggedIn);
  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
      {/* <Layout /> */}
    </div>
  );
}

export default App;
