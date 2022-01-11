import React, { useState, useEffect } from "react";
import Complete from "../../components/ProtocolComplete";
import axios from "axios";
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
  const [data, setData] = useState({
    name: "",
    passcode: "",
    gov_id: "",
    condition: "",
    phone: "",
    email: "",
    gender: "",
    protocolId: "",
    startDate: "",
  });
  function addClient(data) {
    axios
      .post("http://localhost:4000/api/client/register", { body: { data } })
      .then((res) => {
        console.log(res.data);
      })
      .catch();
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
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
        onFinish={() => {
          addClient(data);
          alert("Form Submitted");
        }}
        initialValues={{ remember: true }}
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
            console.log(e.target.value);
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
          name="Date"
          label="Start Date"
          rules={[{ required: true, message: "Please choose a date!" }]}
        >
          <DatePicker
            onChange={(e, dateString) =>
              setData({ ...data, startDate: dateString })
            }
          />
        </Form.Item>

        <Form.Item
          name="protocol"
          label="Choose a protocol"
          rules={[{ required: true, message: "Please choose a protocol!" }]}
        >
          <Complete updateData={setData} currentData={data} />
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