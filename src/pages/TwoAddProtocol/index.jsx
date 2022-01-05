// import style from "./style.module.css";
// import "./style.css";
// import { Card, TimePicker, Select } from "antd";
// import moment from "moment";
// import { useState, useEffect } from "react";

// function TwoAddProtocol(props) {
//   const [surveys, setSurveys] = useState(['Choose a Survey']);
//   const [protocolData, setProtocolData] = useState({
//     protocolName: "",
//     week: "",
//     weekday: "",
//     time: "",
//   });

//   const onChange =
//     (stateKey) =>
//     ({ target }) =>
//       setProtocolData({ ...protocolData, [stateKey]: target.value });
//   const { Option } = Select;
//   function handleChange(value) {
//     console.log(`selected ${value}`);
//   }

//   const format = "HH:mm";

//   return (
//     <div className={style.secondProtocol}>
//       <div className={style.addProtocolTitle}>
//         <h1>Add a Protocol</h1>
//       </div>
//       <div className={style.protocolName}>
//         <label htmlFor="protocolName" className={style.protocolName}>
//           Protocol Name:
//         </label>
//         <br />

//         <input
//           id="protocolName"
//           type="text"
//           className={style.protocolName}
//           placeholder="Protocol..."
//           onChange={onChange("protocolName")}
//           value={protocolData.name}
//           required
//         />
//       </div>
//       <div className={style.cardContainer}>
//         {surveys.map((survey) => (
//           <Card>
//             {survey}
//             <button
//               className={style.add}
//               onClick={() => setSurveys(surveys.concat("Choose a Survey"))}
//             >
//               +
//             </button>

//             <button  className={style.delete}>X</button>
//             <button className={style.duplicate}>D</button>
//             <br />
//             <Select
//               className={style.protocolDropdown}
//               defaultValue="PCL"
//               onChange={handleChange}
//             >
//               <Option value="PCL">PCL</Option>
//               <Option value="GAD">GAD</Option>
//               <Option value="PHQ">PHQ</Option>
//               <Option value="TAS">TAS</Option>
//               <Option value="PGI-S">PGI-S</Option>
//             </Select>
//             <br />
//             <label className={style.chooseTime}>Start time:</label>
//             <br />

//             <Select
//               className={style.weekDropdown}
//               defaultValue="Week #"
//               onChange={handleChange}
//             >
//               <Option value="Week 1">Week 1</Option>
//               <Option value="Week 2">Week 2</Option>
//               <Option value="Week 3">Week 3</Option>
//               <Option value="Week 4">Week 4</Option>
//               <Option value="Week 5">Week 5</Option>
//               <Option value="Week 6">Week 6</Option>
//               <Option value="Week 7">Week 7</Option>
//               <Option value="Week 8">Week 8</Option>
//             </Select>

//             <Select
//               className={style.dayDropdown}
//               defaultValue="Monday"
//               onChange={handleChange}
//             >
//               <Option value="sunday">Sunday</Option>
//               <Option value="monday">Monday</Option>
//               <Option value="tuesday">Tuesday</Option>
//               <Option value="wednesday">Wednesday</Option>
//               <Option value="thursday">Thursday</Option>
//               <Option value="friday">Friday</Option>
//             </Select>
//             <TimePicker
//               className={style.surveyTime}
//               value={protocolData.time}
//               required
//               onChange={onChange("surveyTime")}
//               defaultValue={moment("12:08", format)}
//               format={format}
//             />
//           </Card>
//         ))}
//       </div>
//       <hr />
//     </div>
//   );
// }
// export default TwoAddProtocol;
