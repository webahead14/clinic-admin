import options from "../utils/allSurveys";
import { AutoComplete } from "antd";

function Complete(props) {

  // adds the survey selected for each week, unique to the week id

  // const [surveyOptions, setSurveyOptions] = useState([]);

  const onSelect = (surveyName) => {
    props.setAddWeek((prevWeeks) => {
      return prevWeeks.map((weekObj) => {
        if (weekObj.week === props.id) {

          // if the week does not include the survey, then add it onto the week (weekObj)

          if (!weekObj.surveys.includes(surveyName))
            return {
              ...weekObj,
              surveys: weekObj.surveys.concat(surveyName),
            };
        }

        // if the survey is included, don't concat and just return the weekObj.

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

