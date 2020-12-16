import React from "react";

export default function OrderItem({ item, changeItemCount, deleteItem }) {
  return (
    <div className="item-grid">
      <div className="item">
        <div className="item-card">
          <div className="item-body">
            <img src={item.img_url} alt={item.name} className="mr-2" />
            {item.name}
          </div>
          <button onClick={() => deleteItem(item.id, item.name)}>x</button>
        </div>
      </div>
      <div className="qty">
        <button
          onClick={() =>
            //condition to handle less than 0
            item.count > 0 ? changeItemCount(item.id, -1) : null
          }
        >
          -
        </button>
        <span className="item-count">{item.count}</span>
        <button onClick={() => changeItemCount(item.id, 1)}>+</button>
      </div>
      <div className="price amount">${item.price}</div>
    </div>
  );
}
