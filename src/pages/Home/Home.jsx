import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { GET_EVENTS } from '../../constants/apiEndPoints'
import { useTheme } from '../../context/ThemeContext'
import makeRequest from '../../utils/makeRequest'
import './Home.css'
const Home = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [selectedOption, setSelectedOption] = useState('ALL')
  const { theme } = useTheme()

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }

  const filteredArray = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedOption === 'ALL' ||
        (selectedOption === 'BOOKMARKED' && event?.isBookmarked) ||
        (selectedOption === 'REGISTERED' && event?.isRegistered) ||
        (selectedOption === 'SEATS AVAILABLE' && event?.areSeatsAvailable))
    )
  })
  // eslint-disable-next-line no-unused-vars

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
  }, [selectedOption])

  if (events.length === 0) {
    return <h1>Loading...</h1>
  }
  return (
    <div className='home padding text'>
      <style>
        {`
        i{
          color:${theme};
        }
        `}
      </style>
      <div className='filter-search'>
        <div className='filter'>
          <i className='fa-solid fa-filter fa-2x '></i>
          <span>Filter</span>
          <i className='•	fa-solid fa-chevron-up fa-2x' onClick={handleFilter}></i>
        </div>
        <div className='search'>
          <input
            placeholder='EVENT NAME'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <i className='fa-solid fa-search fa-2x'></i>
        </div>
      </div>

      {showFilter && (
        <div className='filter-hidden'>
          <div>
            <div className='radio'>
              <input
                type='radio'
                name='fav_language'
                value='ALL'
                checked={selectedOption === 'ALL'}
                onChange={handleOptionChange}
              ></input>
              <label>ALL</label>
            </div>
            <div className='radio'>
              <label>BOOKMARKED</label>
              <input
                type='radio'
                name='fav_language'
                value='BOOKMARKED'
                checked={selectedOption === 'BOOKMARKED'}
                onChange={handleOptionChange}
              ></input>
            </div>
          </div>

          <div>
            <div className='radio'>
              <input
                type='radio'
                name='fav_language'
                value='REGISTERED'
                checked={selectedOption === 'REGISTERED'}
                onChange={handleOptionChange}
              ></input>
              <label>REGISTERED</label>
            </div>
            <div className='radio'>
              <label>SEATS AVAILABLE</label>
              <input
                type='radio'
                name='fav_language'
                value='SEATS AVAILABLE'
                checked={selectedOption === 'SEATS AVAILABLE'}
                onChange={handleOptionChange}
              ></input>
            </div>
          </div>
        </div>
      )}

      <div className='cards'>
        {filteredArray?.map((event) => {
          return (
            <div key={event.id}>
              <Card event={event} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
