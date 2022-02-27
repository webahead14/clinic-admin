import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styleModule.css";
import { Button, DatePicker,TimePicker, Form, Input, Radio, Select, Space} from "antd";
import { Option } from "antd/lib/mentions";

const AddClient = () => {
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
    reminders: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const dateChange = (date) => {
    client.startDate = date.format("YYYY-MM-DD")
  }

  const logClient = () => {
    console.log(client);
  };
  // const fetchClient = () => {
  //   fetch("https://wa14-clinic-api.herokuapp.com/api/client/register", {
  //     method: "POST",
  //     body: JSON.stringify({ client }),
  //   });
  //   console.log("Fetched Client");
  //   logClient();
  // };
  const fetchClient = () => {
    fetch('https://wa14-clinic-api.herokuapp.com/api/client/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: client.name,
        passcode: client.passcode,
        govId: client.govId,
        condition: client.condition,
        phone: client.phone,
        email: client.email,
        gender: client.gender,
        protocolId: client.protocolId,
        startDate: client.startDate,
        reminders: client.reminders,
      })
    })
    logClient()
  }
  const handleProtocolChange = selected => {
    client.protocolId = selected
  }

  const handleReminder = time => {
    client.reminders.push(time.format("hh:mm"))
  }

  return (
    <div>
      <span className="centered">Add a Client</span>
    <Form labelCol={{ span: 6}}
    wrapperCol={{ span: 16 }} className='formStyle'>
      <Form.Item></Form.Item>
      <Form.Item label='Name:' name='name'
      rules={[{required: true}]}>
        <Input name='name' type='text' onChange={handleChange} value={client.name}/>
      </Form.Item>
      <Form.Item label='Government ID:' name='govId'
      rules={[{required: true}]}>
        <Input type='text' name='govId' onChange={handleChange}/>
      </Form.Item>
      <Form.Item label='Email:' name='email'
      onChange={handleChange}
      rules={[{required: true}]}>
        <Input type='text' name='email' onChange={handleChange}/>
      </Form.Item>
      <Form.Item label='Passcode:' name='passcode'
      onChange={handleChange}
      rules={[{required: true}]}>
        <Input type='password' name='passcode' onChange={handleChange}/>
      </Form.Item>
      <Form.Item label='Phone Number:' name='phone'
      onChange={handleChange}
      rules={[{required: true}]}>
        <Input type='text' name='phone' onChange={handleChange}/>
      </Form.Item>
      <Form.Item label='Condition:' name='condition'
      rules={[{required: true}]}>
        <Input type='text' name='condition' onChange={handleChange}/>
      </Form.Item>
      <Form.Item label='Gender:' name='gender'
      rules={[{required:true}]}>
      <Radio.Group
          name="gender"
          onChange={handleChange}
          value={client.gender}
        >
          <Space direction="horizental">
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item label='Start Date:' name='startDate'
      rules={[{required: true}]}>
        <DatePicker onChange={dateChange}/>
      </Form.Item>
      <Form.Item label='Protocol:' name='protocolId'>
      <Select
          dropdownMatchSelectWidth="fit-content"
          name='protocolId'
          onChange={handleProtocolChange}
          placeholder='Select a protocol'
        >
          <Select.Option value="protocol1">
            protocol 1
          </Select.Option>
          <Select.Option value="protocol2">
            protocol 2
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='Reminder:' name='reminders'>
        <Space direction='horizental'>
          <TimePicker name='reminders' format='hh:mm' onChange={handleReminder} />
          <TimePicker name='reminders' format='hh:mm' onChange={handleReminder} />
          <TimePicker name='reminders' format='hh:mm' onChange={handleReminder} />
        </Space>
      </Form.Item>
      <Form.Item className="buttonStyle" wrapperCol={18}>
      <Button  type='primary' htmlType='submit' onClick={fetchClient}>Add Client</Button>
      </Form.Item>
      <Form.Item></Form.Item>
    </Form>
    </div>
  );
};

export default AddClient;
