import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";

const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    process.env.TG_API.sendData(JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, street, subject]);

  useEffect(() => {
    //process.env.TG_API.MainButton.onClick(onSendData);
    process.env.TG_API.onEvent("mainButtonClicked", onSendData);
    return () => {
      process.env.TG_API.offEvent("mainButtonClicked", onSendData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData]);

  useEffect(() => {
    process.env.TG_API.MainButton.setParams({
      text: "Отправить данные",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!street || !country) {
      process.env.TG_API.MainButton.hide();
    } else {
      process.env.TG_API.MainButton.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
