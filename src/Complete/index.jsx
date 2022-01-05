import options from "../utils/allSurveys";
import { AutoComplete } from "antd";

function Complete(props) {
  // const [surveyOptions, setSurveyOptions] = useState([]);

  const onSelect = (surveyName) => {
    // const index = props.panels.findIndex((panel) => panel.week === weekId);
    // props.panels[index] = {
    //   ...props.panels[index],
    //   surveys: [...surveyOptions],
    // };

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
    // props.chosenSurveys(props.panels);
  };

  // useEffect(() => {
  //   setSurveyOptions(props.panels[props.id - 1].surveys);
  // }, [props.panels[props.id - 1].surveys]);

  // const onSelect = (option) => {
  //   if (!surveyOptions.includes(option)) {
  //     setSurveyOptions([...surveyOptions, option]);
  //   }
  // };

  // const deleteSurvey = (option) => {
  //   if (surveyOptions.includes(option)) {
  //     setSurveyOptions((prevArr) =>
  //       prevArr.filter((survey) => survey !== option)
  //     );
  //   }
  // };

  // useEffect(() => {
  //   updateSurvey(props.id);
  // }, [surveyOptions]);

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
