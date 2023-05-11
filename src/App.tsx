import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
const peer = new window.Peer('afgs236-sgshg-2627a', {
  host: "localhost",
  port: 9000,
  path: "/chat",
  debug: 3,
})

peer.on('open', (id) => {
  console.log('The generated id is:', id)
})
function App() {
  return (
    <div>
      <button>Connect</button>
    </div>
  )
}

export default App
