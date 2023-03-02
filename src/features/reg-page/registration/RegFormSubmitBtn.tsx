import { Button as button, Form } from "antd";
import React from "react";

export default function RegFormSubmitBtn() {
  const form = Form.useFormInstance();
  function handleFormSubmit() {
    const result = {
      category: form.getFieldValue("category"),
      services: form.getFieldValue("services"),
      master: form.getFieldValue("master"),
      date: form.getFieldValue("date"),
    };
    // console.log(result);
  }

  return (
    <button
      className="btn btn_size_m reg-form__btn reg-form__btn_position_right"
      type="submit"
      form="registration"
      onClick={handleFormSubmit}>
      отправить
    </button>
  );
}
