import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { GET_THEMES } from '../constants/apiEndPoints'
import makeRequest from '../utils/makeRequest'

export const ThemeContext = createContext({})

export const useTheme = () => {
  return useContext(ThemeContext)
}

// eslint-disable-next-line react/prop-types
const ThemeContextProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [themes, setThemes] = useState([])

  const [theme, setTheme] = useState('black')

  const getThemeId = (color) => {
    return themes.themes.find((theme) => theme.colorHexCode === color)?.id
  }

  useEffect(() => {
    makeRequest(GET_THEMES).then((res) => {
      console.log(res)
      setThemes(res)
      const id = res?.preferredThemeId
      const color = res.themes.find((theme) => theme.id === id)?.colorHexCode
      setTheme(color)
    })
  }, [])
  console.log(themes)

  return (
    <ThemeContext.Provider value={{ themes, setThemes, theme, setTheme, getThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
