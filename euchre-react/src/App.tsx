import { SetStateAction, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import HandComponent from './components/HandComponent'
// import CardComponent from './components/CardComponent'

import TableComponent from './components/TableComponent'

import ScoreComponent from './components/ScoreComponent'

export interface gameInterface {
  // players 1-4
  player1: Player;
  // This is a function pointer
  updateGame: React.Dispatch<React.SetStateAction<gameInterface>>;

}

interface Player {
  // pointers to the use State variables that get updated
  score: number;
}


function App() {
  const [game, setGame] = useState({} as gameInterface);

  useEffect(() => {
    let newGame : gameInterface = {
      player1: {score: 1},
      updateGame: setGame,
      }
      setGame(newGame) // define the game object as the new game object that was just created
    }, []); // empty array means only called at the start of the program

  return (
    <>
      <ScoreComponent game={game}/>
      <TableComponent />
    </>
  )
}

export default App
