import axios from "axios";

function fetchProtocols() {
  return axios.get("http://localhost:4000/api/clinic/protocols").then((res) => {
    const options = res.data.protocols.map((protocol) => ({
      id: protocol.id,
      value: protocol.name,
    }));
    return options;
  });
}

export default fetchProtocols;
