import React, { useEffect, useState } from 'react'
import './App.css'
import { DeckFactory } from './models/DeckFactory';
import { Deck } from './models/Deck';
import { Hand } from './models/Hand';
import { Trick } from './models/Trick';
import TableComponent from './components/TableComponent'
import ScoreComponent from './components/ScoreComponent'
import EuchreComponent from './components/EuchreComponent';


function App() {

 
  return (
    <>
     
        <div className="game">
          <EuchreComponent>
            <ScoreComponent/>
            <TableComponent/>
          </EuchreComponent>
        </div>
    </>
  )
}

export default App
