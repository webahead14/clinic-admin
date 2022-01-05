import style from './style.module.css';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getSurveysList } from '../../utils/api';
import { showError } from '../../utils/functions';

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
        showError(err);
      });
  }, []);
  return (
    <div className={style.surveyList}>
      <h1 className={style.title}>Survey List</h1>
      <Table
        dataSource={surveyList}
        columns={columns}
        // pagination={{ pageSize: 5 }}
      />
      ;
    </div>
  );
}

export default SurveyList;

