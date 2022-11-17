import React, {useEffect, useState} from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

export const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("");
  const {tg} = useTelegram()
  
  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные"
    })
  }, [tg.MainButton]);

    useEffect(() => {
      if (!street || !country) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show()
      }
    }, [country, street, tg.MainButton]);

  return (
    <div className="form">
      <input type="text" className="input" placeholder="страна" value={country} onChange={(e) => setCountry(e.target.value)} />
      <input type="text" className="input" placeholder="улица" value={street} onChange={(e) => setStreet(e.target.value)} />
      <select name="" id="" className="select" onChange={(e) => setSubject(e.target.value)} value={subject}>
        <option value="legal">юр. лицо</option>
        <option value="physical">физ. лицо</option>
      </select>
    </div>
  );
};
