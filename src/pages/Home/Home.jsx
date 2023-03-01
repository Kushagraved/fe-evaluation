import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { GET_EVENTS } from '../../constants/apiEndPoints'
import makeRequest from '../../utils/makeRequest'
import './Home.css'
const Home = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [events, setEvents] = useState([])

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      let events = await makeRequest(GET_EVENTS)
      events = events.sort((a, b) => {
        const dateA = new Date(a.datetime)
        const dateB = new Date(b.datetime)
        if (dateA === dateB) {
          return 0
        }
        return dateA < dateB ? -1 : 1
      })
      setEvents([...events])
    }
    fetchEvents()
  }, [])
  console.log(events)

  return (
    <div className='home padding text'>
      <div className='filter-search'>
        <div className='filter'>
          <i className='fa-solid fa-filter fa-2x'></i>
          <span>Filter</span>
          <i className='•	fa-solid fa-chevron-up fa-2x' onClick={handleFilter}></i>
        </div>
        <div className='search'>
          <input placeholder='EVENT NAME'></input>
          <i className='fa-solid fa-search fa-2x'></i>
        </div>
      </div>

      {showFilter && (
        <div className='filter-hidden'>
          <div>
            <div className='radio'>
              <input type='radio' id='html' name='fav_language' value='HTML'></input>
              <label htmlFor='html'>All</label>
            </div>
            <div className='radio'>
              <label htmlFor='html'>BOOKMARKED</label>
              <input type='radio' id='html' name='fav_language' value='HTML'></input>
            </div>
          </div>

          <div>
            <div className='radio'>
              <input type='radio' id='html' name='fav_language' value='HTML'></input>
              <label htmlFor='html'>REGISTERED</label>
            </div>
            <div className='radio'>
              <label htmlFor='html'>SEATS AVAILABLE</label>
              <input type='radio' id='html' name='fav_language' value='HTML'></input>
            </div>
          </div>
        </div>
      )}

      <div className='cards'>
        {events.map((event) => {
          return <Card key={event.id} event={event} />
        })}
      </div>
    </div>
  )
}

export default Home
