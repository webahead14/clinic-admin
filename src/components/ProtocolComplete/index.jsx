import { fetchProtocols } from "../../utils/api";
import { Select } from "antd";
import React, { useState, useEffect } from "react";
const { Option } = Select;

function Complete(props) {
  const [options, setOptions] = useState([]);
  // const [value, setValue] = useState("");
  useEffect(() => {
    fetchProtocols().then((data) => {
      setOptions(data);
    });
  }, []);

  const onSelect = (data) => {
    props.updateData({ ...props.currentData, protocolId: data });
  };
  return (
    <Select
      showSearch
      placeholder="Select a Protocol"
      optionFilterProp="children"
      onChange={onSelect}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options.map((protocol) => {
        return <Option value={protocol.value}>{protocol.label}</Option>;
      })}
    </Select>
  );
}

export default Complete;
