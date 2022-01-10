import fetchProtocols from "../utils/allSurveys.js";
import { AutoComplete } from "antd";
import React, { useState, useEffect } from "react";

function Complete(props) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  useEffect(() => {
    fetchProtocols().then((data) => {
      setOptions(data);
    });
  }, []);

  useEffect(() => {
    props.updateData({ ...props.currentData, protocolId: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const onSelect = (data) => {
    setValue(data);
  };
  return (
    <AutoComplete
      style={{
        width: 200,
      }}
      options={options}
      value={value}
      onSelect={onSelect}
      placeholder="Search for a protocol"
    />
  );
}

export default Complete;
