import React, { useState, useCallback, useEffect } from "react";
import ProductItem from "../productItem/ProductItem";
import { products } from "../../utils/products";
import { getTotalPrice } from "../../utils/getTotalPrice";
import "./ProductList.css";
import { useTelegram } from "../../hooks/useTelegram";

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();
  const send = () =>
    fetch("http://192.168.0.2:3000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({test: '32'}),
    });
  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://89.248.206.53:3000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div>
      <div className="list">
        {products.map((i) => (
          <ProductItem product={i} onAdd={onAdd} className={"item"} />
        ))}
        <button onClick={send} ></button>
      </div>
    </div>
  );
};
