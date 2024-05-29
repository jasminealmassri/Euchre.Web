import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import HandComponent from './components/HandComponent'
// import CardComponent from './components/CardComponent'

import TableComponent from './components/TableComponent'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="scoreboard">
        <div className="scores">
          <div>Your team: 5 points</div>
          <div>Enemy team: 2 points</div>
        </div>
        <div className="trump">
          <p>Current trump: Spades</p>
        </div>
        <div className="tricks">
           <div>Tricks won: 2</div>
          <div>Tricks lost: 2</div>
        </div>
      </div>
      <TableComponent />
    </>
  )
}

export default App
