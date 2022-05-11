import React, { createContext, useReducer } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

export const ThemeContext = createContext({ state: { darkMode: false }, dispatch: (type) => {} })

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHTMODE':
      return { darkMode: false }
    case 'DARKMODE':
      return { darkMode: true }
    default:
      return state
  }
}

export function ThemeWorker(props) {
  const prefersDarkMode = React.useState(useMediaQuery('(prefers-color-scheme: dark)'))

  const initialState = {
    darkMode: prefersDarkMode,
  }

  const [state, dispatch] = useReducer(themeReducer, initialState)

  return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>
}
