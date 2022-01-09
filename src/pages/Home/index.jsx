import React from "react";
import style from "./style.module.css";
import DemoBar from "./Bar";
import { Line } from "@ant-design/charts";
import DemoPie from "./Pie";
//data for line chart
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

const config = {
  data,
  xField: "year",
  yField: "value",
  point: {
    size: 5,
    shape: "diamond",
  },
};

function Home(props) {
  return (
    <div>
      <div>
        <div style={{ textAlign: "center", fontSize: 30, paddingBottom: 20 }}>
          <h>Line Chart</h>
        </div>
        <Line {...config} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 800, padding: 100 }}>
          <div style={{ textAlign: "center", fontSize: 30 }}>
            <h>Pie Chart</h>
          </div>
          <DemoPie />{" "}
        </div>
        <div style={{ width: 800, padding: 100 }}>
          <div style={{ textAlign: "center", fontSize: 30, paddingBottom: 20 }}>
            <h>Bar Chart</h>
          </div>
          <DemoBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
