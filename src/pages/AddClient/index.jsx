import style from "./style.module.css";
import React, { useState } from "react";
import Complete from "../../Complete";

import {
  Form,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Select,
  Button,
} from "antd";

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="972">+972</Option>
      {/* <Option value=""></Option> */}
    </Select>
  </Form.Item>
);

function AddClient(props) {
  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <h4>Add a client</h4>
      <Form
        name="basicform"
        onFinishFailed={() => alert("Failed to submit")}
        onFinish={() => alert("Form Submitted")}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Passcode"
          name="password"
          rules={[{ required: true, message: "Please choose a password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="Phone"
          label="Phone Number"
          rules={[{ required: true, message: "Please insert a phone number!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Condition"
          name="condition"
          rules={[{ required: true, message: "Please enter a condition" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select a gender!" }]}
        >
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>Male</Radio>
            <Radio value={2}>Female</Radio>
            <Radio value={3}>Other</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="Date"
          label="Start Date"
          rules={[{ required: true, message: "Please choose a date!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="protocol"
          label="Choose a protocol"
          rules={[{ required: true, message: "Please choose a protocol!" }]}
        >
          <Complete test="protocol" />
        </Form.Item>

        <Form.Item name="reminder" label="Reminder">
          <TimePicker /> <TimePicker /> <TimePicker />
        </Form.Item>

        <Form.Item>
          <Button type="success" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddClient;
