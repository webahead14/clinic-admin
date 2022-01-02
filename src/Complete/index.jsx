import options from "../utils/allSurveys.js";
import { AutoComplete } from "antd";

function Complete() {
  return (
    <AutoComplete
      style={{
        width: 200,
      }}
      options={options}
      placeholder="Search for a protocol"
      filterOption={(inputValue, option) =>
        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
}

export default Complete;
