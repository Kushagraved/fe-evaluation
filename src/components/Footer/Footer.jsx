import React from 'react'
import { SAVE_THEME } from '../../constants/apiEndPoints'
import { useTheme } from '../../context/ThemeContext'
import makeRequest from '../../utils/makeRequest'
import './Footer.css'
const Footer = () => {
  const { themes, theme, setTheme, getThemeId } = useTheme()

  const handleSaveTheme = async () => {
    const id = getThemeId(theme)
    console.log('colorid', id)
    await makeRequest(SAVE_THEME, {
      data: {
        preferredThemeId: id,
      },
    })
  }
  return (
    <div className='footer padding' style={{ backgroundColor: `${theme}` }}>
      <span>THEMES</span>
      <div className='colors'>
        {themes.themes?.map((theme, index) => (
          <div
            onClick={() => setTheme(theme.colorHexCode)}
            key={index}
            style={{
              height: '2rem',
              width: '2rem',
              backgroundColor: `${theme.colorHexCode}`,
              borderRadius: '0.2rem',
            }}
          ></div>
        ))}
      </div>
      <button onClick={handleSaveTheme}>Save Theme</button>
    </div>
  )
}

export default Footer
