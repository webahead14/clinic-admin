import { Form, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const { RangePicker } = DatePicker;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const success = () => {
  message.success("Appointments were added");
};

const error = () => {
  message.error("Error");
};

const AppointmentsForm = () => {
  const [clientsList, setClientsList] = useState();
  React.useEffect(() => {
    let dataList;
    axios
      //   .get("https://wa14-clinic-api.herokuapp.com/api/clinic/Appointments")
      .get("https://wa14-clinic-api.herokuapp.com/api/clients")
      .then((response) => {
        dataList = response.data;
        dataList = response.data.map((e) => {
          return { label: e.name, value: e.id };
        });
        setClientsList(dataList);
      });
  }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let appointmentsArray = [];
    if (values.appointments === undefined) {
      message.error("You have to add at least one appointment");
    } else {
      values.appointments.forEach((appointment) => {
        appointmentsArray.push({
          date: appointment.date,
          hours: [
            appointment.hours[0].format("HH:mm"),
            appointment.hours[1].format("HH:mm"),
          ],
        });
      });
      let client = { id: values.client, ap: appointmentsArray };

      let clientJSON = JSON.stringify(client);
      axios
        .post(`http://localhost:4000/api/clinic/Appointment/add`, {
          clientJSON,
        })
        .then((res) => {
          if (res.status === 200) {
            success();
            form.resetFields();
          } else {
            error();
          }
        });
    }
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="client"
        label="Client"
        rules={[{ required: true, message: "Missing client" }]}
      >
        <Select options={clientsList} onChange={handleChange} />
      </Form.Item>

      <Form.List name="appointments">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div>
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    label="Date"
                    name={[field.name, "date"]}
                    rules={[{ required: true, message: "Missing date" }]}
                  >
                    <DatePicker format={dateFormatList} />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="Hours"
                    name={[field.name, "hours"]}
                    rules={[{ required: true, message: "Missing hours range" }]}
                  >
                    <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add appointments
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AppointmentsForm;
