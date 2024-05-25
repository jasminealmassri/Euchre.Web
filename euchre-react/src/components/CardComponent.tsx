import React from 'react';
import spades9 from '../assets/images/Cards/spades9.png';
import back from '../assets/images/Cards/back.png';

import { Card } from '../models/Card';

import spadesA from '../assets/images/Cards/spadesA.png'

//const images = import.meta.glob('./assets/*.png');

// const getImagePath = (imageName : string)  => images[`./assets/${imageName}.png`]();




interface  CardComponentProps {
    card: Card;
}

const CardComponent: React.FC<CardComponentProps> = ({card}) => {

    let flipped_up : boolean = true;

    const imgUrl = `${card.suit}${card.faceValue}`;

    if(flipped_up) {
        return (
            <img className="card" src={spadesA}/>
          )
    }
    else {
        return (
            <img className="card" src={back}/>
          )
    }
 
}


export default CardComponent