import style from "./style.module.css";
import "./style.css";
import { Collapse, Select } from "antd";
import { useState } from "react";
import Complete from "../../Complete";
import { useNavigate } from "react-router-dom";
import options from "../../utils/allSurveys";

function AddProtocol(props) {
  const [addWeek, setAddWeek] = useState([{ week: 1, surveys: [] }]);
  const [protocolData, setProtocolData] = useState({
    protocolName: "",
  });

  let filteredWeek = [];
  const [highlighted, setHighlighted] = useState([]);

  const { Option } = Select;

  //filtering for whatever survey is selected and indicating which week it's in
  function handleChange(value) {
    filteredWeek = [];
    setHighlighted([]);
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

  const goTo = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    goTo("/");
  };
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
          <Select
            defaultValue="Filter Survey"
            style={{ width: 120 }}
            onChange={handleChange}
            allowClear
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          ></Select>
        </div>
        <Collapse>
          {addWeek.map((obj, index) => (
            <Panel
              // highlights week
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
                surveys={addWeek[obj.week - 1].surveys}
                id={obj.week}
                setAddWeek={setAddWeek}
              />
              {obj.surveys.map((survey, idx) => {
                return (
                  <div className={style.surveyBox}>
                    <p
                      className={style.deleteSurvey}
                      onClick={(e) => {
                        setAddWeek((prevArr) => {
                          let temp = [...prevArr];
                          let result = temp[obj.week - 1].surveys.filter(
                            (element) => {
                              return element !== survey;
                            }
                          );
                          temp[obj.week - 1].surveys = [...result];
                          return temp;
                        });
                        console.log(survey);
                      }}
                    >
                      X
                    </p>
                    <h3
                      className={style.surveySelection}
                      key={idx}
                      value="Search"
                    >
                      {survey}
                    </h3>
                  </div>
                );
              })}
              {index === addWeek.length - 1 ? (
                <button
                  className={style.deleteWeek}
                  onClick={() => {
                    setAddWeek((prevArr) => {
                      return prevArr.filter(
                        (week, index) => index < addWeek.length - 1
                      );
                    });
                  }}
                >
                  Delete Week
                </button>
              ) : null}
            </Panel>
          ))}
        </Collapse>
        <div className={style.addWeekBtn}></div>
        <button
          className={style.addWeek}
          onClick={() => {
            const lastWeek = addWeek[addWeek.length - 1];
            setAddWeek(
              addWeek.concat({ week: lastWeek.week + 1, surveys: [] })
            );
          }}
        >
          + Add a week
        </button>

        <button className={style.submitProtocol} onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddProtocol;
