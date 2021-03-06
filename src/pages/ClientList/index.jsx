import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

export default class index extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    persons: [],
  };

  componentDidMount() {
    axios
      .get(`https://wa14-clinic-api.herokuapp.com/api/clients`)
      .then((res) => {
        const persons = res.data;
        this.setState({ persons });
      });
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "30%",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
        width: "20%",
      },
      {
        title: "Start Date", // get the rihgt names
        dataIndex: "date",
        key: "date",
        width: "20%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "20%",
      },
      {
        title: "Protocol ",
        dataIndex: "protocol",
        key: "protocol",
        width: "20%",
        ...this.getColumnSearchProps("protocol"),
      },
      {
        title: "Condition ",
        dataIndex: "condition",
        key: "condition",
        width: "20%",
        ...this.getColumnSearchProps("condition"),
      },
    ];
    const { size } = this.state;

    return (
      <>
        <h1 style={{ textAlignVertical: "center", textAlign: "center" }}>
          Client list
        </h1>
        <h1></h1>
        <h1></h1>

        <Button
          type="white"
          style={{ background: "#06b6d4", color: "white" }}
          size={size}
        >
          Add a Client
        </Button>
        <h1></h1>
        <Table columns={columns} dataSource={this.state.persons} />
      </>
    );
  }
}
