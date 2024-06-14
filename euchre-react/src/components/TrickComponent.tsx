import React from 'react';

import CardComponent from './CardComponent';

import './TrickComponent.css';

const TrickComponent = () => {
  return (
    <div className="trick">
        {/* <div className="player-1-card">
            <CardComponent key={1} card={{faceValue:"", suit:"", faceUp: true}} flippedUp={true}/>
        </div> */}
        <div className="player-2-card">
            <CardComponent key={2} card={{faceValue:"A", suit:"hearts", faceUp: true}} flippedUp={true}/>
        </div>
        <div className="player-3-card">
            <CardComponent key={3} card={{faceValue:"10", suit:"spades", faceUp: true}} flippedUp={true}/>
        </div>
        <div className="player-4-card">
            <CardComponent key={4} card={{faceValue:"J", suit:"diamonds", faceUp: true}} flippedUp={true}/>
        </div>
    </div>
  )
}

export default TrickComponent