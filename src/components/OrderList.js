import React from "react";
import OrderItem from "./OrderItem";
import "./css/order.css";
export default function OrderList({ data, changeItemCount, deleteItem }) {
  return (
    <div className="orderlist-container">
      <div className="item-grid item-head">
        <div className="item">Items({data.length})</div>
        <div className="qty">Qty</div>
        <div className="price">Price</div>
      </div>
      {
        //rendering cart data
        data
          ? data.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                changeItemCount={changeItemCount}
                deleteItem={deleteItem}
              />
            ))
          : null
      }
    </div>
  );
}
