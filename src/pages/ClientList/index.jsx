import { Button, Input, Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { showMessage } from "../../utils/functions";

import { getClientsList } from "../../utils/api";

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
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>

          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "start date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>

          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.protocol.toLowerCase().includes(value.toLowerCase());
    },
  },

  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>

          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.condition.toLowerCase().includes(value.toLowerCase());
    },
  },
];

function ClientList(props) {
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    getClientsList()
      .then((clients) => {
        for (const client of clients) {
          client.key = client.id;
          client.startDate = client.start_date.split("T")[0];
        }
        setClientsList(clients);
        console.log(clientsList);
      })
      .catch((err) => {
        console.error(err);
        showMessage(err, "error");
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ textAlign: "center", paddingBottom: 20, fontSize: 40 }}>
        Client list
      </h1>
      <Button type="primary" onClick={() => navigate("/add/client")}>
        Add a Client
      </Button>
      <br />
      <br />
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/client/${record.id}`);
            },
          };
        }}
        dataSource={clientsList}
        columns={columns}
      />
    </div>
  );
}

export default ClientList;
