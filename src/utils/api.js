import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export function getProtocolsList() {
  return axios
    .get(`${REACT_APP_API_URL}/clinic/protocols`)
    .then((res) => res.data.protocols);
}

export function getSurveysList() {
  return axios
    .get(`${REACT_APP_API_URL}/clinic/surveys`)
    .then((res) => res.data.surveys);
}
