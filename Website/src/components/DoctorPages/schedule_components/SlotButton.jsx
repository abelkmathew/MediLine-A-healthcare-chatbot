import React from 'react'

function SlotButton({timeslot}) {
  return (
    <div className='slot-btn'>
        <button className='btn btn-primary'>{timeslot}</button>
    </div>
  )
}

export default SlotButton