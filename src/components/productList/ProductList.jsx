import React, {useState} from "react";
import ProductItem from "../productItem/ProductItem";
import { products } from "../../utils/products";
import { getTotalPrice } from "../../utils/getTotalPrice";
import "./ProductList.css";
import { useTelegram } from "../../hooks/useTelegram";

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const {tg} = useTelegram();

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
      </div>
    </div>
  );
};
