import React, { useEffect, useState } from "react";
import "./components/css/styles.css";
import Data from "./constants/data";
import OrderList from "./components/OrderList";
import { FiChevronLeft } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import OrderTotal from "./components/OrderTotal";
import ToastMessage from "./components/ToastMessage";

export default function App() {
  const [data, setData] = useState([]);
  const [toast, setToast] = useState([]);

  //to verify data on inital load
  useEffect(() => {
    //check if data already exists
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      //for first time user
      const cartData = Data.map((item) => {
        return { ...item, count: 1 };
      });
      setData(cartData);
      storeData(cartData);
    }
  }, []);

  //handle toast functionalities
  const removeToastItems = (id) => {
    const newMessages = [];
    setToast(newMessages);
  };

  const addToastItem = (id, message) => {
    const newToast = [...toast, { id, message }];
    setToast(newToast);
    removeToastTimeout(id);
  };

  const removeToastTimeout = (id) => {
    setTimeout(() => {
      removeToastItems(id);
    }, 1000);
  };

  //util to store data locally
  const storeData = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  //cart item functionalities
  const changeItemCount = (id, value) => {
    const changedData = data.map((item) => {
      if (item.id === id) {
        if (item.count + value >= 0) {
          item.count += value;
        }
      }
      return item;
    });
    setData(changedData);
    storeData(changedData);
  };

  const deleteItem = (id, name) => {
    const changedData = data.filter((item) => item.id !== id);
    setData(changedData);
    storeData(changedData);
    addToastItem(id, `${name} deleted successfully`);
  };

  // reset data logic
  const resetData = () => {
    const cartData = Data.map((item) => {
      return { ...item, count: 1 };
    });
    setData(cartData);
    storeData(cartData);
  };

  return (
    <div className="centered">
      <div className="heading">
        <FiChevronLeft />
        Order Summary
      </div>

      <div className="order-container">
        <OrderList
          data={data}
          changeItemCount={changeItemCount}
          deleteItem={deleteItem}
        />
        <OrderTotal data={data} />
      </div>

      <div onClick={resetData} className="reset-btn">
        <GrPowerReset />
      </div>

      <ToastMessage message={toast} removeItem={removeToastTimeout} />
    </div>
  );
}
