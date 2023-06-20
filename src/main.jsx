import React from 'react'
import ReactDOM from 'react-dom/client'
import Commentbox from './Comment-box/Commentbox.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comment-box/Index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Commentbox />
  </React.StrictMode>,
)
