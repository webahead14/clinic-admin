import { Table } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import style from "./style.module.css";
import { Typography } from "antd";
import axios from "axios";
const { Title } = Typography;
const { Column } = Table;

function SurveyList(props) {
  const [data, setData] = useState();
  React.useEffect(() => {
    let tableData;
    axios
      .get("https://wa14-clinic-api.herokuapp.com/api/clinic/surveys")
      .then((response) => {
        console.log(response.data);
        tableData = response.data.surveys;
        setData(tableData);
      });
  }, []);
  return (
    <>
      <Title className={style.t1}>Survey List</Title>
      <Button type="primary">
        <a href="/add/survey">Add Survey</a>
      </Button>
      <br /> <br />
      <Table id={"table"} dataSource={data}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Number of Questions"
          dataIndex="questionsAmount"
          key="questionsAmount"
        />
        <Column title="Date" dataIndex="date" key="date" />
      </Table>
    </>
  );
}

export default SurveyList;
