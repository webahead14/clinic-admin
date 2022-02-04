import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export function fetchProtocols() {
  return axios.get(`${REACT_APP_API_URL}/api/clinic/protocols`).then((res) => {
    const options = res.data.protocols.map((protocol) => ({
      label: protocol.name,
      value: protocol.id,
    }));
    return options;
  });
}

export function addSurvey(survey) {
  return axios.post(`${REACT_APP_API_URL}/api/clinic/survey/add`, survey);
}
