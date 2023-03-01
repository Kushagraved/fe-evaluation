import React, { useState } from 'react'
import propTypes from 'prop-types'
import './Card.css'
import { formatDate } from '../../utils/common/dateUtility'
import makeRequest from '../../utils/makeRequest'
import { UPDATE_BOOKMARK } from '../../constants/apiEndPoints'

// eslint-disable-next-line no-unused-vars
const Card = ({ event }) => {
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked)

  const handleBookmark = async () => {
    await makeRequest(UPDATE_BOOKMARK(event.id), {
      data: {
        isBookmarked: !isBookmarked,
      },
    })
    setIsBookmarked(!isBookmarked)
  }
  return (
    <div className='card'>
      <div className='card-img'>
        <img src={event.imgUrl}></img>
        <div></div>
      </div>
      <div className='card-details'>
        <span>{event.name}</span>
        <span>{event.description}</span>
        <span>
          <b>VENUE: </b>
          {event.venue}
        </span>
        <span>
          <b>DATE: </b>
          {formatDate(event.datetime)}
        </span>
        <div className='engagement'>
          {event.isRegistered ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <i className='fa-solid fa-circle-check fa-2x'></i>
              <span>REGISTERED</span>
            </div>
          ) : !event.areSeatsAvailable ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <i className='fa-solid fa-circle-xmark fa-2x'></i>
              <span>NO SEATS AVAILABLE </span>
            </div>
          ) : (
            <div></div>
          )}

          <div className='bookmark' onClick={handleBookmark}>
            {isBookmarked ? (
              <i className='fa-solid fa-bookmark fa-2x'></i>
            ) : (
              <i className='fa-regular fa-bookmark fa-2x'></i>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
Card.propTypes = {
  event: propTypes.object.isRequired,
}
export default Card
