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
  return (
    <AutoComplete
      style={{
        width: 200,
      }}
      options={options}
      value={value}
      onClick={(e) => {
        setValue(e.target.textContent);
      }}
      placeholder="Search for a protocol"
    />
  );
}

export default Complete;
