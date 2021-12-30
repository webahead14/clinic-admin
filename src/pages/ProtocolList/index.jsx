import style from "./style.module.css";
import { Table } from "antd";

const dataSource = [
  {
    id: 1,
    name: "PCL-5",
    surveysAmount: 5,
    date: "16-01-2021",
    condition: "PTSD",
  },
  {
    id: 2,
    name: "GAD",
    surveysAmount: 20,
    date: "01-06-2021",
    condition: "Anxiety",
  },
  {
    id: 3,
    name: "PST-420-BLAZEIT",
    surveysAmount: 200,
    date: "01-01-2022",
    condition: "Stoner",
  },
  {
    id: 4,
    name: "THC",
    surveysAmount: 55,
    date: "01-01-2022",
    condition: "Hala",
  },
];

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "surveysAmount",
    dataIndex: "surveysAmount",
    key: "surveysAmount",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "condition",
    dataIndex: "condition",
    key: "condition",
  },
];

function ProtocolList(props) {
  return (
    <div>
      <div
        style={{
          display: "block",
          width: 1600,
        }}
      >
        <h1 style={{ textAlign: "center", paddingBottom: 40, fontSize: 40 }}>
          Protocol list
        </h1>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}

export default ProtocolList;
