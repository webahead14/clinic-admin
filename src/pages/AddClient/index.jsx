import React, { useState, useEffect } from "react";
import Complete from "../../components/ProtocolComplete";
import { postClient } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Select,
  Button,
} from "antd";
import { showMessage } from "../../utils/functions";

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
  const format = "HH:mm";

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    passcode: "",
    govId: "",
    condition: "",
    phone: "",
    email: "",
    gender: "",
    protocolId: "",
    startDate: "",
    reminders: [],
  });
  const [reminder, setReminder] = useState({
    reminder1: {},
    reminder2: {},
    reminder3: {},
  });

  useEffect(() => {
    setData({
      ...data,
      reminders: [reminder.reminder1, reminder.reminder2, reminder.reminder3],
    });
  }, [reminder]);
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
        onFinishFailed={(e) => {
          console.log(e);
          alert("Failed to submit");
        }}
        onFinish={() => {
          postClient(data)
            .then((tr) => {
              console.log(tr);
              showMessage("client added", "success");
              navigate("/clients");
            })
            .catch((error) => {
              const errorMessage = error.response.data.message;
              if (
                errorMessage ==
                'duplicate key value violates unique constraint "clients_phone_key"'
              ) {
                showMessage("Phone number is already taken", "error");
              } else if (
                errorMessage ==
                'duplicate key value violates unique constraint "clients_email_key"'
              ) {
                showMessage("Email is already taken", "error");
              } else if (errorMessage == "client already exists") {
                showMessage("Government id is already taken", "error");
              }
              console.log(error.response.data.message);
              // showMessage(error.data, "error");
            });
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Government Id"
          name="GovId"
          onChange={(e) => setData({ ...data, govId: e.target.value })}
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Passcode"
          name="password"
          onChange={(e) => setData({ ...data, passcode: e.target.value })}
          rules={[{ required: true, message: "Please choose a password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="Phone"
          label="Phone Number"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          rules={[{ required: true, message: "Please insert a phone number!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Condition"
          name="condition"
          rules={[{ required: true, message: "Please enter a condition" }]}
        >
          <Input
            onChange={(e) => setData({ ...data, condition: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          onChange={(e) => {
            if (e.target.value == 1) {
              setData({ ...data, gender: "male" });
            } else if (e.target.value == 2) {
              setData({ ...data, gender: "female" });
            } else {
              setData({ ...data, gender: "other" });
            }
          }}
          rules={[{ required: true, message: "Please select a gender!" }]}
        >
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>Male</Radio>
            <Radio value={2}>Female</Radio>
            <Radio value={3}>Other</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Please choose a date!" }]}
        >
          <DatePicker
            onChange={(e, dateString) =>
              setData({ ...data, startDate: dateString })
            }
          />
        </Form.Item>

        <Form.Item name="protocol" label="Choose a protocol">
          <Complete
            updateData={setData}
            currentData={data}
            rules={[{ required: true, message: "Please choose a protocol!" }]}
          />
        </Form.Item>

        <Form.Item name="reminder" label="Reminder">
          <TimePicker
            format={format}
            onChange={(e, dateString) => {
              const obj = { time: dateString, has_sent: false };
              setReminder({ ...reminder, reminder1: obj });
            }}
          />{" "}
          <TimePicker
            format={format}
            onChange={(e, dateString) => {
              const obj = { time: dateString, has_sent: false };
              setReminder({ ...reminder, reminder2: obj });
            }}
          />{" "}
          <TimePicker
            format={format}
            onChange={(e, dateString) => {
              const obj = { time: dateString, has_sent: false };
              setReminder({ ...reminder, reminder3: obj });
            }}
          />
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
