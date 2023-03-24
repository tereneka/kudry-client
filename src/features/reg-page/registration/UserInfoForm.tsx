import { Form, Input } from "antd";
import React from "react";

export default function UserInfoForm() {
  return (
    <div className="reg-form__item-group">
      <Form.Item
        name="userName"
        label="имя"
        rules={[
          {
            required: true,
            message: "введите имя",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="телефон"
        rules={[
          {
            required: true,
            message: "введите номер телефона",
          },
          {
            min: 10,
            message:
              "минимальное количествосимволов 10",
          },
        ]}>
        <Input
          addonBefore={"+7"}
          maxLength={10}
        />
      </Form.Item>
    </div>
  );
}
