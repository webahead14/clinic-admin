import { Tooltip } from "antd";
import { Calendar } from "antd";
import axios from "axios";
import React, { useState } from "react";

let m;
function Appointments() {
  const [data, setData] = useState();
  React.useEffect(() => {
    let dataList;
    m = new Map();
    axios
      //   .get("https://wa14-clinic-api.herokuapp.com/api/clinic/Appointments")
      .get("http://localhost:4000/api/clinic/appointments")
      .then((response) => {
        dataList = response.data.Appointments;
        dataList.forEach((element) => {
          let cellData = [];
          if (m.has(element.date)) {
            cellData = m.get(element.date);
          }
          cellData.push(element);
          m.set(element.date, cellData);
        });
        setData(dataList);
      });
  }, []);

  function getListData(value) {
    let listData = [];
    if (m !== undefined) {
      if (m.has(value.format("DD-MM-YYYY"))) {
        listData = m.get(value.format("DD-MM-YYYY"));
      }
    }
    return listData;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.patient + item.date + item.hours}>
            <Tooltip title={item.hours}>
              <span>{item.patient}</span>
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
}
export default Appointments;
