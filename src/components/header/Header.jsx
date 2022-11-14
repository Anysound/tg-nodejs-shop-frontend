import React, { useEffect } from "react";
import { Button } from "../button/Button";

export const Header = () => {
  const tg = window.Telegram.WebApp;

  const onClose = () => {
    tg.close();
  };

  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span>{tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
};
