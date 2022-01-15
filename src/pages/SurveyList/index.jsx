import style from "./style.module.css";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { getSurveysList } from "../../utils/api";
import { showMessage } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "questionsAmount",
    dataIndex: "questionsAmount",
    key: "questionsAmount",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
];

function SurveyList() {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState([]);
  useEffect(() => {
    getSurveysList()
      .then((surveys) => {
        for (const survey of surveys) {
          survey.key = survey.id;
        }
        setSurveyList(surveys);
      })
      .catch((err) => {
        console.error(err);
        showMessage(err, "error");
      });
  }, []);
  return (
    <div className={style.surveyList}>
      <h1 className={style.title}>Survey List</h1>
      <div style={{ paddingBottom: 10 }}>
        <Button type="primary" onClick={() => navigate("/add/survey")}>
          Add Survey
        </Button>
      </div>
      <Table dataSource={surveyList} columns={columns} />;
    </div>
  );
}

export default SurveyList;
