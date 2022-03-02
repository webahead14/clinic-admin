import { Button, Table } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProtocolList() {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number Of Survey",
      dataIndex: "surveysAmount",
      key: "surveysAmount",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
  ];
  // const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const [protocolList, setProtocolList] = React.useState([]); //this is for when we do the fetch from backend
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${REACT_APP_API_URL}api/clinic/protocols`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setProtocolList(data.data.protocols);
      });
  }, []);
  return (
    <div>
      <Button type="primary" onClick={() => navigate("/add/protocol")}>
        Add Protocol
      </Button>
      <Table dataSource={protocolList} columns={columns} />
    </div>
  );
}

export default ProtocolList;
