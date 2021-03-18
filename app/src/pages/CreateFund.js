import React, { useState } from 'react'
import { Form } from '../components/Form/Form'
import { funderInputs } from '../components/Form/inputs'

const CreateFund = ({ drizzle, drizzleState }) => {
  const [fund, setFund] = useState({
    title: "",
    goal: "",
    endDate: "",
    description: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFund(prevState => ({ ...prevState, [name]: value }))
  }

  const createFunder = async (event) => {
    event.preventDefault()
    drizzle.contracts.PleaseFundMe.methods.createFunder.cacheSend(fund.title, fund.goal, { gas: 1043200 })
    alert("Fund "+fund.title+" submitted!")
  }

  return (
    <div>
      <h1>
        Create a Fund
      </h1>
      <Form inputs={funderInputs} values={fund} handleChange={handleChange} onSubmit={createFunder} />
    </div>

    )
}

export default CreateFund
