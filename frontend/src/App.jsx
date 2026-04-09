import { useState, useEffect } from 'react'
import { getTodayPlan, markSolved } from './api'
import './App.css'

function App() {

  const [plan, setPlan] = useState(null)
  const [checked, setChecked] = useState({})

  function toggleCheckbox(id){
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    async function fetchPlan(){
      const data = await getTodayPlan()
      setPlan(data)
    }

    fetchPlan()
  }, [])

  if(!plan){
    return <p>Loading...</p>
  }

  return (
    <div>

      <h1>Today's Plan</h1>

      <h2>New Questions</h2>
      {plan.newQuestions.map(q => (
        <div key={q.id} className={`problem-item ${checked[q.id] ? "completed" : ""}`}>

          <input
            type="checkbox"
            checked={checked[q.id] || false}
            onChange={() => {
              toggleCheckbox(q.id)
              markSolved(q.id)
            }}
          />

          <a
            href={`https://leetcode.com/problemset/all/?search=${q.problemId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Problem {q.problemId}
          </a>

        </div>
      ))}

      <h2>Review Questions</h2>
      {plan.reviews.map(q => (
        <div key={q.id} className={`problem-item-${checked[q.id] ? "completed" : ""}`}>

          <input
            type="checkbox"
            checked={checked[q.id] || false}
            onChange={() => toggleCheckbox(q.id)}
          />

          <a
            href={`https://leetcode.com/problemset/all/?search=${q.problemId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Problem {q.problemId}
          </a>

        </div>
      ))}

    </div>
  )
}

export default App