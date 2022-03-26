import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  Form,
  Layout,
  Input,
  Space,
  TimePicker,
  Radio,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import "./moduleStyle.css";
import { useNavigate } from "react-router-dom";
import { axios } from "axios";
const { Header, Content } = Layout;

const NursesList = () => {
  const [nurse, setNurse] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    govId: "",
    image: "",
    salary: "",
    age: "",
    expertise: "",
    shifts: [],
  });

  const [nursesList, setNursesList] = useState([]);

  const { form } = Form.useForm();

  const navigate = useNavigate("");

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let pDay = "";
  let pHours = "";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNurse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setNursesList((prevState) => [...prevState, nurse]);
    setNurse(() => ({
      shifts: [],
    }));
  };

  const getEmpAge = (event) => {
    var today = new Date();
    var birthDate = new Date(event);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setNurse((prevState) => ({
      ...prevState,
      age: age,
    }));
  };

  const dayChange = (event) => {
    pDay = event;
  };

  const hoursChange = (event) => {
    pHours = event.format("hh");
  };

  const addShift = () => {
    setNurse((prevState) => ({
      ...prevState,
      shifts: [...prevState.shifts, { day: pDay, hours: pHours }],
    }));
    pDay = "";
    pHours = "";
  };
  useEffect(() => {
    const showNursesList = () => {
      console.log("Nurses List: ", nursesList);
    };
    showNursesList();
  }, [nursesList, nurse.shifts, ""]);

  return (
    <Layout className="fullScreen">
      <Header
        style={{
          color: "white",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Add New Employee
      </Header>
      <Content>
        <Form
          form={form}
          className="fromStyle"
          onFinish={handleSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
            <Input type="text" name="name" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email:" name="email" rules={[{ required: true }]}>
            <Input type="email" name="email" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Phone Number:"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input type="number" name="phoneNumber" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Gov ID:" name="govId" rules={[{ required: true }]}>
            <Input type="number" name="govId" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Image:" name="image" rules={[{ required: true }]}>
            <Input type="url" name="image" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Salary:" name="salary" rules={[{ required: true }]}>
            <Input type="number" name="salary" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="BirthDay" name="dob" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" onChange={getEmpAge} />
          </Form.Item>
          <Form.Item
            label="Expertise:"
            name="expertise"
            rules={[{ required: true }]}
          >
            <Input type="text" name="expertise" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Shifts:"
            name="shifts"
            style={{
              backgroundColor: "lightgrey",
              borderStyle: "dashed",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            <Space direction="horizental">
              <Space direction="vertical">
                <Select name="day" placeholder="Shift Day" onChange={dayChange}>
                  {week.map((today) => (
                    <Select.Option value={today}>{today}</Select.Option>
                  ))}
                </Select>
                <TimePicker format="hh" name="hours" onChange={hoursChange} />
              </Space>
              <Space direction="vertical">
                <Button onClick={addShift}>+ shift</Button>
              </Space>
            </Space>
          </Form.Item>
          <Form.Item label="Add">
            <Button type="primary" htmlType="submit">
              Add Nurse
            </Button>
          </Form.Item>
        </Form>
        <div>
          {nursesList.map((emp) => (
            <div className="Nurse">
              <label> Name: {emp.name}</label>
              <br />
              <label>Email: {emp.email}</label>
              <br />
              <label>Phone Number: {emp.phone}</label>
              <br />
              <label>Gov ID: {emp.govId}</label>
              <br />
              <label>Image: {emp.image}</label>
              <br />
              <label>Salary: {emp.salary}</label>
              <br />
              <label>Age: {emp.age}</label>
              <br />
              <label>Expertise: {emp.expertise}</label>
              <br />
              {emp.shifts.map((shft) => (
                <div className="shifts">
                  <label>Day: {shft.day}</label>
                  <br />
                  <label>Hours: {shft.hours}</label>
                  <br />
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button
          style={{ offset: 10 }}
          onClick={() =>
            axios.post(
              "https://wa14-clinic-api.herokuapp.com/api/nurse/AddNurse",
              nursesList
            )
          }
        >
          Post Nurses
        </Button>
      </Content>
    </Layout>
  );
};

export default NursesList;
