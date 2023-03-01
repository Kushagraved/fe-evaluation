import React, { useState } from 'react'
import propTypes from 'prop-types'
import './Card.css'
import { formatDate } from '../../utils/common/dateUtility'
import makeRequest from '../../utils/makeRequest'
import { GET_EVENT_BY_ID, UPDATE_BOOKMARK, UPDATE_REGISTER } from '../../constants/apiEndPoints'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
const Card = ({ event }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  // eslint-disable-next-line no-unused-vars
  const [eventState, setEventState] = useState(event)

  // eslint-disable-next-line no-unused-vars
  const [isRegistered, setIsRegistered] = useState(eventState?.isRegistered)
  const [isBookmarked, setIsBookmarked] = useState(eventState?.isBookmarked)

  const handleBookmark = async () => {
    await makeRequest(UPDATE_BOOKMARK(event.id), {
      data: {
        isBookmarked: !isBookmarked,
      },
    })
    setIsBookmarked(!isBookmarked)
  }
  const handleEventClick = (id) => {
    console.log('clicked')
    navigate(`/event/${id}`)
  }

  const handleRegister = async () => {
    console.log('handle register')
    const res = await makeRequest(UPDATE_REGISTER(eventState.id), {
      data: {
        isRegistered: !isRegistered,
      },
    })
    console.log(res)
    setIsRegistered(!isRegistered)
  }
  useEffect(() => {
    if (eventState === undefined) {
      makeRequest(GET_EVENT_BY_ID(id)).then((res) => {
        console.log(res)
        setEventState(res)
        setIsRegistered(res.isRegistered)
        setIsBookmarked(res.isBookmarked)
      })
    }
  }, [])

  if (eventState === undefined) {
    return <div>Loading</div>
  }

  if (id) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
        }}
      >
        <div className={`transform card `}>
          <div className='card-img'>
            <img src={eventState.imgUrl}></img>
            <div></div>
          </div>
          <div
            className='cad-details'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem',
              gap: '1rem',
              padding: '1rem',
            }}
          >
            <span>{eventState.name}</span>
            <span
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {eventState.description}
            </span>
            <span>
              <b>VENUE: </b>
              {eventState.venue}
            </span>
            <span>
              <b>DATE: </b>
              {formatDate(eventState.datetime)}
            </span>
            <div className='engagement'>
              {isRegistered ? (
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
              ) : !eventState.areSeatsAvailable ? (
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
            <div>
              <button onClick={handleRegister}>
                {isRegistered ? 'UNREGISTER' : eventState?.areSeatsAvailable ? 'REGISTER' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`card`}>
      <div className='card-img' onClick={() => handleEventClick(eventState.id)}>
        <img src={eventState.imgUrl}></img>
        <div></div>
      </div>
      <div className='card-details'>
        <span onClick={() => handleEventClick(eventState.id)}>{eventState.name}</span>
        <span onClick={() => handleEventClick(eventState.id)}>{eventState.description}</span>
        <span onClick={() => handleEventClick(eventState.id)}>
          <b>VENUE: </b>
          {eventState.venue}
        </span>
        <span onClick={() => handleEventClick(eventState.id)}>
          <b>DATE: </b>
          {formatDate(eventState.datetime)}
        </span>
        <div className='engagement'>
          {eventState.isRegistered ? (
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
          ) : !eventState.areSeatsAvailable ? (
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
  event: propTypes.object,
  handleEventClick: propTypes.func,
}
export default Card
