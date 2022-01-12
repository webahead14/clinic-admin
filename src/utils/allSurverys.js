import axios from "axios";

// function fetchProtocols() {
//   return axios.get("http://localhost:4000/api/clinic/protocols").then((res) => {
//     const options = res.data.protocols.map((protocol) => ({
//       id: protocol.id,
//       value: protocol.name,
//     }));
//     return options;
//   });
// }

const options = [
  {
    id: 1,
    value: "PCL-5",
  },
  {
    id: 2,
    value: "GAD",
  },
  {
    id: 3,
    value: "PHQ",
  },
  {
    id: 4,
    value: "PGI-S",
  },
  {
    id: 5,
    value: "PGI-A",
  },
  {
    id: 6,
    value: "PGI-T",
  },
];

export default options;
