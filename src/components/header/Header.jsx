import React from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Button } from "../button/Button";

export const Header = () => {

  const { user, onClose} = useTelegram()

  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span>{user?.username}</span>
    </div>
  );
};
