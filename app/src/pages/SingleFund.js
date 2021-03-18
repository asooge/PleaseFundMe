import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form } from '../components/Form/Form'
import { funderInputs } from '../components/Form/inputs'

const SingleFund = ({ drizzle, drizzleState, match }) => {

  const [state, setState] = useState({
    funderHash: null,
  })

  const [fund, setFund] = useState({
    title: "",
    goal: "",
    endDate: "",
    description: ""
  })

  useEffect(() => {
    getFunder()
  }, [match.params.id])

  const getFunder = async () => {
    const funderHash = drizzle.contracts.PleaseFundMe.methods.funders.cacheCall(match.params.id)
    setState({ funderHash })
  }

  const funder = state.funderHash && (
    drizzleState.contracts.PleaseFundMe.funders[state.funderHash]?.value
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFund(prevState => ({ ...prevState, [name]: value }))
  }

  const updateFunder = async (event) => {
    event.preventDefault()
    drizzle.contracts.PleaseFundMe.methods.updateFunder.cacheSend(fund.title, fund.goal, { gas: 1043200 })
    alert("Fund "+fund.title+" submitted!")
  }

  return(
    funder ? (
      <div>
        <div>
          {funder.title}
          {funder.fundTarget}
        </div>
        <Form inputs={funderInputs} values={fund} handleChange={handleChange} onSubmit={updateFunder} />
      </div>
    ) : "Loading . . ."
  )
}

export default withRouter(SingleFund)
