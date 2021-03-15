import React, { useState } from 'react'

const CreateFund = () => {
  const [fund, setFund] = useState({
    title: "",
    goal: "",
    endDate: "",
    description: ""
  })

  const handleSubmit = async (event) => {
    alert("Fund "+fund.title+" submitted!")
  }

  const handleChange = (event) => {
    setFund(prevState => {
      const name = event.target.name
      const newValue= event.target.value
      const updatedState = {
        title: prevState.title,
        goal: prevState.goal,
        endDate: prevState.endDate,
        description: prevState.description,
        [name]: newValue
      }
      return(updatedState)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={fund.title} onChange={handleChange} name="title"></input>
        <label>Fund Value</label>
        <input type="number" value={fund.goal} onChange={handleChange} name="goal"></input>
        <label>Target Date</label>
        <input type="date" value={fund.endDate} onChange={handleChange} name="endDate"></input>
        <label>Description</label>
        <input type="text" value={fund.description} onChange={handleChange} name="description"></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateFund
