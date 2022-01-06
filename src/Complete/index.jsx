import options from "../utils/allSurveys";
import { AutoComplete } from "antd";

function Complete(props) {
  // const [surveyOptions, setSurveyOptions] = useState([]);

  const onSelect = (surveyName) => {
    props.setAddWeek((prevWeeks) => {
      return prevWeeks.map((weekObj) => {
        if (weekObj.week === props.id) {
          if (!weekObj.surveys.includes(surveyName))
            return {
              ...weekObj,
              surveys: weekObj.surveys.concat(surveyName),
            };
        }

        return weekObj;
      });
    });
  };

  return (
    <AutoComplete
      allowClear
      autoClearSearchValue={true}
      style={{
        width: 200,
      }}
      options={options}
      placeholder="Search for a survey  "
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={onSelect}
    />
  );
}

export default Complete;
