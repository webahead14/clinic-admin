import style from './style.module.css'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { getSurveysList } from '../../utils/api'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'questionsAmount',
    dataIndex: 'questionsAmount',
    key: 'questionsAmount',
  },
  {
    title: 'date',
    dataIndex: 'date',
    key: 'date',
  },
]

function SurveyList() {
  const [surveyList, setSurveyList] = useState([])
  useEffect(() => {
    getSurveysList().then((surveys) => setSurveyList(surveys))
  }, [])
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
  )
}

export default SurveyList
