import style from "./style.module.css";
import "./style.css";
import { Collapse, TimePicker } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";

function TwoAddProtocol(props) {
  const [protocolData, setProtocolData] = useState({
    protocolName: "",
    week: "",
    weekday: "",
    time: "",
  });
  const [checked, setChecked] = useState([false]);
  //import DatePicker from "antd" if you want to use it
  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const handleChange = () => {
    setChecked(!checked);
  };

  const onChange =
    (stateKey) =>
    ({ target }) =>
      setProtocolData({ ...protocolData, [stateKey]: target.value });
  const { Panel } = Collapse;
  const format = "HH:mm";

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
        <Collapse>
          <Panel header="Week 1" key="1">
            <div className={style.timetable}>
              <label className={style.surveyPicker}>
                <input
                  className={style.checkboxes}
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
              </label>
              <span className={style.surveySpan}> PCL</span>
              <input
                id="weekNum"
                type="num"
                className={style.weekNum}
                placeholder="Week #"
                onChange={onChange("weekNum")}
                value={protocolData.week}
                required
              />
              <input
                id="weekday"
                type="text"
                className={style.weekday}
                placeholder="Weekday..."
                onChange={onChange("weekday")}
                value={protocolData.weekday}
                required
              />
              <TimePicker
                className={style.surveyTime}
                value={protocolData.time}
                required
                onChange={onChange("surveyTime")}
                defaultValue={moment("12:08", format)}
                format={format}
              />
            </div>
            <div className={style.timetable}>
              <label className={style.surveyPicker}>
                <input
                  className={style.checkboxes}
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
              </label>
              <span className={style.surveySpan}> GAD</span>
              <input
                id="weekNum"
                type="num"
                className={style.weekNum}
                placeholder="Week #"
                onChange={onChange("weekNum")}
                value={protocolData.week}
                required
              />{" "}
              <input
                id="weekday"
                type="text"
                className={style.weekday}
                placeholder="Weekday..."
                onChange={onChange("weekday")}
                value={protocolData.weekday}
                required
              />
              <TimePicker
                className={style.surveyTime}
                value={protocolData.time}
                required
                onChange={onChange("surveyTime")}
                defaultValue={moment("12:08", format)}
                format={format}
              />
            </div>
            <div className={style.timetable}>
              <label className={style.surveyPicker}>
                <input
                  className={style.checkboxes}
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
              </label>
              <span className={style.surveySpan}> PHQ</span>
              <input
                id="weekNum"
                type="num"
                className={style.weekNum}
                placeholder="Week #"
                onChange={onChange("weekNum")}
                value={protocolData.week}
                required
              />{" "}
              <input
                id="weekday"
                type="text"
                className={style.weekday}
                placeholder="Weekday..."
                onChange={onChange("weekday")}
                value={protocolData.weekday}
                required
              />
              <TimePicker
                className={style.surveyTime}
                value={protocolData.time}
                required
                onChange={onChange("surveyTime")}
                defaultValue={moment("12:08", format)}
                format={format}
              />
            </div>
            <div className={style.timetable}>
              <label className={style.surveyPicker}>
                <input
                  className={style.checkboxes}
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
              </label>
              <span className={style.surveySpan}> TAS</span>
              <input
                id="weekNum"
                type="num"
                className={style.weekNum}
                placeholder="Week #"
                onChange={onChange("weekNum")}
                value={protocolData.week}
                required
              />{" "}
              <input
                id="weekday"
                type="text"
                className={style.weekday}
                placeholder="Weekday..."
                onChange={onChange("weekday")}
                value={protocolData.weekday}
                required
              />
              <TimePicker
                className={style.surveyTime}
                value={protocolData.time}
                required
                onChange={onChange("surveyTime")}
                defaultValue={moment("12:08", format)}
                format={format}
              />
            </div>
            <div className={style.timetable}>
              <label className={style.surveyPicker}>
                <input
                  className={style.checkboxes}
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
              </label>
              <span className={style.surveySpan}> PGI-S</span>
              <input
                id="weekNum"
                type="num"
                className={style.weekNum}
                placeholder="Week #"
                onChange={onChange("weekNum")}
                value={protocolData.week}
                required
              />{" "}
              <input
                id="weekday"
                type="text"
                className={style.weekday}
                placeholder="Weekday..."
                onChange={onChange("weekday")}
                value={protocolData.weekday}
                required
              />
              <TimePicker
                className={style.surveyTime}
                value={protocolData.time}
                required
                onChange={onChange("surveyTime")}
                defaultValue={moment("12:08", format)}
                format={format}
              />
            </div>
          </Panel>
          <Panel header="Week 2" key="2"></Panel>
          <Panel header="Week 3" key="3"></Panel>
          <Panel header="Week 4" key="4"></Panel>
          <Panel header="Week 5" key="5"></Panel>
          <Panel header="Week 6" key="6"></Panel>
          <Panel header="Week 7" key="7"></Panel>
          <Panel header="Week 8" key="8"></Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default TwoAddProtocol;
