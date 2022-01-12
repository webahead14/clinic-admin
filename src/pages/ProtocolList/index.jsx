import style from "./style.module.css";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { getProtocolsList } from "../../utils/api";
import { showMessage } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Surveys Amount",
    dataIndex: "surveysAmount",
    key: "surveysAmount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
  },
];

function ProtocolList() {
  const [protocolList, setProtocolList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProtocolsList()
      .then((protocols) => {
        for (const protocol of protocols) {
          protocol.key = protocol.id;
        }
        setProtocolList(protocols);
      })
      .catch((err) => {
        console.error(err);
        showMessage(err, "error");
      });
  }, []);

  return (
    <div className={style.protocolList}>
      <h1 className={style.title}>Protocol list</h1>
      <div style={{ paddingBottom: 10 }}>
        <Button type="primary" onClick={() => navigate("/add/protocol")}>
          Add Protocol
        </Button>
      </div>
      <Table
        dataSource={protocolList}
        columns={columns}
        // pagination={{ pageSize: 5 }}
      />
      ;
    </div>
  );
}

export default ProtocolList;
