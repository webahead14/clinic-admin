import style from './style.module.css'

const data = [{
    id: 1,
    name: 'PCL-5',
    questionsAmount: 5,
    date: '16-01-2021'

  },
  {
    id: 2,
    name: 'GAD',
    questionsAmount: 20,
    date: '01-06-2021'

  },
  {
    id: 3,
    name: 'PST-420-BLAZEIT',
    questionsAmount: 200,
    date: '01-01-2022'

  },
  {
    id: 4,
    name: 'THC',
    questionsAmount: 55,
    date: '01-01-2022'

  }
]

function SurveyList(props) {
    return (
        <div>
            <h1>SurveyList</h1>
        </div>
    )
}

export default SurveyList
