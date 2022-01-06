import style from "./style.module.css";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const dataSource = [
  {
    id: 1,
    name: "George btata",
    phone: "052-508-5555",
    "start date": "16-01-2021",
    "treatment status": "on-going",
    protocol: "Protocol X",
    condition: "PTSD",
  },
  {
    id: 1,
    name: "Mario Saliba",
    phone: "052-508-5555",
    "start date": "16-12-2021",
    "treatment status": "Completed",
    protocol: "SS GG",
    condition: "Stress!",
  },
  {
    id: 1,
    name: "Nur Awad",
    phone: "052-228-5555",
    "start date": "10-12-2021",
    "treatment status": "on-going",
    protocol: "Awesomeness",
    condition: "Uno Queen",
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
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "start date",
    dataIndex: "start date",
    key: "start date",
  },
  {
    title: "treatment status",
    dataIndex: "treatment status",
    key: "treatment status",
  },
  {
    title: "protocol",
    dataIndex: "protocol",
    key: "protocol",
  },

  {
    title: "condition",
    dataIndex: "condition",
    key: "condition",
  },
];

function ClientList(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "block",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", paddingBottom: 20, fontSize: 40 }}>
          Client list
        </h1>
        <div style={{ paddingBottom: 10 }}>
          <Button type="primary" onClick={() => navigate("/add/client")}>
            Add Client
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}

export default ClientList;
