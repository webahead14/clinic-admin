import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./styleModule.css";
import {
  Button,
  DatePicker,
  TimePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import { Option } from "antd/lib/mentions";
import axios from "axios";

const AddClient = () => {
  const { form } = Form.useForm();
  const [client, setClient] = useState({
    name: "",
    passcode: "",
    govId: "",
    condition: "",
    phone: "",
    email: "",
    gender: "",
    protocolId: "",
    startDate: "",
    reminders: ['','',''],
  });
  const genders = ["Male", "Female", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (selected) => {
    setClient((prevState) => ({
      ...prevState,
      startDate: selected,
    }));
  };

  const handleProtocolChange = (selected) => {
    setClient((prevState) => ({
      ...prevState,
      protocolId: selected
    }));
  };
  const handleReminderChange = (index) => (selected) => {
    setClient((prevState) => ({
      ...prevState,
    })
    );
    client.reminders[index] = selected
  };

  const handleSubmit = () => {
    console.log("posting client ", client);
    axios.post(
      "https://wa14-clinic-api.herokuapp.com/api/client/register",
      client
    );
  };

  return (
    <div>
      <span className="centered">Add a Client</span>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        className="formStyle"
        layout="horizental"
        form={form}
      >
        <Form.Item></Form.Item>
        <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
          <Input name="name" type="text" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Government ID:"
          name="govId"
          rules={[{ required: true }]}
        >
          <Input type="text" name="govId" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          onChange={handleChange}
          rules={[{ required: true }]}
        >
          <Input type="text" name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Passcode:"
          name="passcode"
          onChange={handleChange}
          rules={[{ required: true }]}
        >
          <Input type="password" name="passcode" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Phone Number:"
          name="phone"
          onChange={handleChange}
          rules={[{ required: true }]}
        >
          <Input type="text" name="phone" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Condition:"
          name="condition"
          rules={[{ required: true }]}
        >
          <Input type="text" name="condition" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Gender:" name="gender" rules={[{ required: true }]}>
          <Radio.Group name="gender" onChange={handleChange}>
            <Space direction="horizental">
              {genders.map((ans, index) => (
                <Radio value={index}>{ans}</Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Start Date:"
          name="startDate"
          rules={[{ required: true }]}
        >
          <DatePicker onChange={handleDateChange} />
        </Form.Item>
        <Form.Item label="Protocol:" name="protocolId">
          <Select
            dropdownMatchSelectWidth="fit-content"
            name="protocolId"
            onChange={handleProtocolChange}
            placeholder="Select a protocol"
          >
            <Select.Option value="protocol1">protocol 1</Select.Option>
            <Select.Option value="protocol2">protocol 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Reminder:" name="reminders">
          <Space direction="horizental">
            <TimePicker
              name="reminders"
              format="hh:mm"
              onChange={handleReminderChange(0)}
            />
            <TimePicker
              name="reminders"
              format="hh:mm"
              onChange={handleReminderChange(1)}
            />
            <TimePicker
              name="reminders"
              format="hh:mm"
              onChange={handleReminderChange(2)}
            />
          </Space>
        </Form.Item>
        <Form.Item className="buttonStyle" wrapperCol={{ offset: 4, span: 6 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Add Client
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClient;
