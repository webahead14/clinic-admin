import style from "./style.module.css";
import { Table } from "antd";

const dataSource = [
  {
    id: 1,
    name: "PCL-5",
    questionsAmount: 5,
    date: "16-01-2021",
  },
  {
    id: 2,
    name: "GAD",
    questionsAmount: 20,
    date: "01-06-2021",
  },
  {
    id: 3,
    name: "PST-420-BLAZEIT",
    questionsAmount: 200,
    date: "01-01-2022",
  },
  {
    id: 4,
    name: "THC",
    questionsAmount: 55,
    date: "01-01-2022",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "questionsAmount",
    dataIndex: "questionsAmount",
    key: "questionsAmount",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
];

function SurveyList(props) {
  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <h1>Survey List</h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}

export default SurveyList;
