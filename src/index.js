import React from 'react'
import 'antd/dist/antd.css'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
// eslint-disable-next-line
const consoleError = console.error.bind(console)
// eslint-disable-next-line
console.error = (errObj, ...args) => {
  if (args.includes('findDOMNode')) {
    return
  }
  consoleError(errObj, ...args)
}
