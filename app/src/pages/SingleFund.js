import React from 'react'

const SingleFund = ({ match }) => {
  return(
    <div>
      {match.params.id}
    </div>
  )
}

export default SingleFund
