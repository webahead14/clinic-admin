import fetchProtocols from "../../utils/allSurveys.js";
import { AutoComplete } from "antd";
import React, { useState, useEffect } from "react";

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
    <AutoComplete
      style={{
        width: 200,
      }}
      options={options}
      value={props.currentData.protocolId}
      onSelect={onSelect}
      placeholder="Search for a protocol"
    />
  );
}

export default Complete;
