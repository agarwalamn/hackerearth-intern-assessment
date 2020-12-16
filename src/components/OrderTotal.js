import React, { useEffect, useState } from "react";
import "./css/totalOrder.css";

export default function OrderTotal({ data }) {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const specialDiscountItem = "fiction";

  useEffect(() => {
    //constants
    let totalPrice = 0;
    let discountPrice = 0;
    let specialDiscountPrice = 0;
    //calculate logic
    data.map((item) => {
      totalPrice += item.count * item.price;
      discountPrice += item.count * item.price * (item.discount / 100);
      if (item.type === specialDiscountItem) {
        specialDiscountPrice += item.count * item.price * 0.15;
      }
    });
    //initializing state
    setTotal(totalPrice);
    setDiscount(discountPrice);
    setSpecialDiscount(specialDiscountPrice);
  }, [data]);

  return (
    <div className="total-card">
      <div className="order-details">
        <div className="total-head ">Total</div>
        <div className="grid mb-2">
          <div>Items({data.length})</div>
          <div>:</div>
          <div>${total}</div>
        </div>
        <div className="grid">
          <div>Discount</div>
          <div>:</div>
          <div>- ${discount}</div>
        </div>
        <div className="grid">
          <div>Type Discount</div>
          <div>:</div>
          <div>- ${specialDiscount}</div>
        </div>
      </div>
      <div className="total-order">
        <div className="grid">
          <div>Order Total</div>
          <div>:</div>
          <div>${total - discount - specialDiscount}</div>
        </div>
      </div>
    </div>
  );
}
