import style from "./style.module.css";
import "./style.css";
import { Collapse, Select, Button } from "antd";
import { useState, useEffect } from "react";
import Complete from "../../components/Complete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

function AddProtocol(props) {
  const [addWeek, setAddWeek] = useState([{ week: 1, surveys: [] }]);
  const [protocolData, setProtocolData] = useState({
    protocolName: "",
  });

  let filteredWeek = [];
  const [highlighted, setHighlighted] = useState([]);

  const { Option } = Select;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios(`${REACT_APP_API_URL}/api/clinic/surveys`).then(({ data }) => {
      let formattedOptions = data.surveys.map((survey) => {
        return { id: survey.id, value: survey.name };
      });
      setOptions(formattedOptions);
    });
  }, []);

  //filtering for whatever survey is selected and indicating which week it's in
  function handleChange(value) {
    //set filter to nothing for now
    filteredWeek = [];
    setHighlighted([]);
    //for each week that possesses the selected filter, highlight the week.
    addWeek.forEach((week, index) => {
      if (week.surveys.find((element) => element === value)) {
        filteredWeek.push(week.week);
        setHighlighted([...filteredWeek]);
      }
    });
  }

  //Protocol name input
  const onChange =
    (stateKey) =>
    ({ target }) =>
      setProtocolData({ ...protocolData, [stateKey]: target.value });

  const { Panel } = Collapse;
  //useNavigate to redirect to other pages.
  const goTo = useNavigate();

  //redirects when user clicks Submit
  const onSubmit = (event) => {
    event.preventDefault();
    const data = { name: protocolData.protocolName, protocolData: addWeek };
    axios
      .post(`${REACT_APP_API_URL}/api/clinic/protocol/add`, data)
      .then((response) => {
        if (response.status === "success") {
          goTo("/protocols");
        }
      });
  };

  useEffect(() => {
    console.log(addWeek);
  }, [addWeek]);
  return (
    <div className={style.addProtocol}>
      <div className={style.addProtocolTitle}>
        <h1>Add Protocol</h1>
      </div>
      <div className={style.protocolName}>
        <label htmlFor="protocolName" className={style.protocolName}>
          Protocol Name:
        </label>
        <br />
        <input
          id="protocolName"
          type="text"
          className={style.protocolName}
          placeholder="Protocol..."
          onChange={onChange("protocolName")}
          value={protocolData.name}
          required
        />
      </div>

      <div className={style.allDropdowns}>
        <div className={style.filterSurvey}>
          {/* Select options from filter. They're the same as the ones in the AutoComplete in the collapse panels. */}
          <Select
            defaultValue="Filter Survey"
            style={{ width: 120 }}
            //When the filter field changes, the handleChange function modifies the weeks below
            onChange={handleChange}
            allowClear
            //gets options from hardcoded allSurveys.js
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          ></Select>
        </div>
        <Collapse>
          {/* //mapping out each panel in the collapse and later attaches it to the add week button so user can add a week to the protocol*/}
          {addWeek.map((obj, index) => (
            <Panel
              // adds styling to the week header in order to indicate where the filtered survey is located
              style={
                highlighted.includes(obj.week)
                  ? { backgroundColor: " #a5c0d1 " }
                  : {}
              }
              //adds sequential week number to panel header
              header={"Week " + obj.week}
              key={obj.week}
            >
              <h3>Choose Surveys</h3>
              {/* retrieves autocomplete data from Complete component */}
              <Complete
                panels={addWeek}
                //adds the surveys onto the added week
                surveys={addWeek[obj.week - 1].surveys}
                id={obj.week}
                setAddWeek={setAddWeek}
              />
              {obj.surveys.map((survey, idx) => {
                return (
                  <div className={style.surveyBox}>
                    <p
                      className={style.deleteSurvey}
                      // deletes surveys from the week
                      onClick={(e) => {
                        setAddWeek((prevArr) => {
                          let temp = [...prevArr];
                          //filters out the deleted survey and retruens the element without the survey
                          let result = temp[obj.week - 1].surveys.filter(
                            (element) => {
                              return element !== survey;
                            }
                          );
                          //return the week with the updated surveys
                          temp[obj.week - 1].surveys = [...result];
                          return temp;
                        });
                      }}
                    >
                      X
                    </p>
                    <h3
                      //survey selection CSS
                      className={style.surveySelection}
                      key={idx}
                      value="Search"
                    >
                      {survey}
                    </h3>
                  </div>
                );
              })}
              {/* adds the delete button to the last week added - only.  */}
              {index === addWeek.length - 1 ? (
                <Button
                  type="secondary"
                  className={style.deleteWeek}
                  //onClick returns the length of addWeek and returns it without the last week
                  onClick={() => {
                    setAddWeek((prevArr) => {
                      return prevArr.filter(
                        (week, index) => index < addWeek.length - 1
                      );
                    });
                  }}
                >
                  Delete Week
                </Button>
              ) : null}
            </Panel>
          ))}
        </Collapse>
        {/* concating a week onto the existing week(s). */}
        <div className={style.addWeekBtn}></div>
        <Button
          className={style.addWeek}
          onClick={() => {
            const lastWeek = addWeek[addWeek.length - 1];
            setAddWeek(
              addWeek.concat({ week: lastWeek.week + 1, surveys: [] })
            );
          }}
        >
          + Add a week
        </Button>

        {/* Submit button that works with goTo to redirect user to set page. To redirect, modify onSubmit above */}
        <Button
          type="primary"
          className={style.submitProtocol}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AddProtocol;
