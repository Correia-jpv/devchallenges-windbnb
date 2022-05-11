import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { ThemeWorker } from './features/ThemeContext'

ReactDOM.render(
  <React.StrictMode>
    <ThemeWorker>
      <App />
    </ThemeWorker>
  </React.StrictMode>,
  document.getElementById('root')
)
