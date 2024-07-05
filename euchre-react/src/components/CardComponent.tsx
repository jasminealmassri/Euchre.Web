import React from 'react';
import back from '../assets/images/Cards/back.png';

import { Card } from '../models/Card';

import './CardComponent.css';

import spadesA from '../assets/images/Cards/spadesA.png';
import spades2 from '../assets/images/Cards/spades2.png';
import spades3 from '../assets/images/Cards/spades3.png';
import spades4 from '../assets/images/Cards/spades4.png';
import spades5 from '../assets/images/Cards/spades5.png';
import spades6 from '../assets/images/Cards/spades6.png';
import spades7 from '../assets/images/Cards/spades7.png';
import spades8 from '../assets/images/Cards/spades8.png';
import spades9 from '../assets/images/Cards/spades9.png';
import spades10 from '../assets/images/Cards/spades10.png';
import spadesJ from '../assets/images/Cards/spadesJ.png';
import spadesQ from '../assets/images/Cards/spadesQ.png';
import spadesK from '../assets/images/Cards/spadesK.png';
import diamondsA from '../assets/images/Cards/diamondsA.png';
import diamonds2 from '../assets/images/Cards/diamonds2.png';
import diamonds3 from '../assets/images/Cards/diamonds3.png';
import diamonds4 from '../assets/images/Cards/diamonds4.png';
import diamonds5 from '../assets/images/Cards/diamonds5.png';
import diamonds6 from '../assets/images/Cards/diamonds6.png';
import diamonds7 from '../assets/images/Cards/diamonds7.png';
import diamonds8 from '../assets/images/Cards/diamonds8.png';
import diamonds9 from '../assets/images/Cards/diamonds9.png';
import diamonds10 from '../assets/images/Cards/diamonds10.png';
import diamondsJ from '../assets/images/Cards/diamondsJ.png';
import diamondsQ from '../assets/images/Cards/diamondsQ.png';
import diamondsK from '../assets/images/Cards/diamondsK.png';
import heartsA from '../assets/images/Cards/heartsA.png';
import hearts2 from '../assets/images/Cards/hearts2.png';
import hearts3 from '../assets/images/Cards/hearts3.png';
import hearts4 from '../assets/images/Cards/hearts4.png';
import hearts5 from '../assets/images/Cards/hearts5.png';
import hearts6 from '../assets/images/Cards/hearts6.png';
import hearts7 from '../assets/images/Cards/hearts7.png';
import hearts8 from '../assets/images/Cards/hearts8.png';
import hearts9 from '../assets/images/Cards/hearts9.png';
import hearts10 from '../assets/images/Cards/hearts10.png';
import heartsJ from '../assets/images/Cards/heartsJ.png';
import heartsQ from '../assets/images/Cards/heartsQ.png';
import heartsK from '../assets/images/Cards/heartsK.png';
import clubsA from '../assets/images/Cards/clubsA.png';
import clubs2 from '../assets/images/Cards/clubs2.png';
import clubs3 from '../assets/images/Cards/clubs3.png';
import clubs4 from '../assets/images/Cards/clubs4.png';
import clubs5 from '../assets/images/Cards/clubs5.png';
import clubs6 from '../assets/images/Cards/clubs6.png';
import clubs7 from '../assets/images/Cards/clubs7.png';
import clubs8 from '../assets/images/Cards/clubs8.png';
import clubs9 from '../assets/images/Cards/clubs9.png';
import clubs10 from '../assets/images/Cards/clubs10.png';
import clubsJ from '../assets/images/Cards/clubsJ.png';
import clubsQ from '../assets/images/Cards/clubsQ.png';
import clubsK from '../assets/images/Cards/clubsK.png';


const cardImages = {
    'spadesA' : spadesA,
    'spades2': spades2,
    'spades3': spades3,
    'spades4': spades4,
    'spades5': spades5,
    'spades6': spades6,
    'spades7': spades7,
    'spades8': spades8,
    'spades9': spades9,
    'spades10': spades10,
    'spadesJ': spadesJ,
    'spadesQ': spadesQ,
    'spadesK': spadesK,
    'diamondsA' : diamondsA,
    'diamonds2': diamonds2,
    'diamonds3': diamonds3,
    'diamonds4': diamonds4,
    'diamonds5': diamonds5,
    'diamonds6': diamonds6,
    'diamonds7': diamonds7,
    'diamonds8': diamonds8,
    'diamonds9': diamonds9,
    'diamonds10': diamonds10,
    'diamondsJ': diamondsJ,
    'diamondsQ': diamondsQ,
    'diamondsK': diamondsK,
    'heartsA' : heartsA,
    'hearts2': hearts2,
    'hearts3': hearts3,
    'hearts4': hearts4,
    'hearts5': hearts5,
    'hearts6': hearts6,
    'hearts7': hearts7,
    'hearts8': hearts8,
    'hearts9': hearts9,
    'hearts10': hearts10,
    'heartsJ': heartsJ,
    'heartsQ': heartsQ,
    'heartsK': heartsK,
    'clubsA' : clubsA,
    'clubs2': clubs2,
    'clubs3': clubs3,
    'clubs4': clubs4,
    'clubs5': clubs5,
    'clubs6': clubs6,
    'clubs7': clubs7,
    'clubs8': clubs8,
    'clubs9': clubs9,
    'clubs10': clubs10,
    'clubsJ': clubsJ,
    'clubsQ': clubsQ,
    'clubsK': clubsK,
}

interface  CardComponentProps {
    card: Card;
    flippedUp: boolean;
    onClick?: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({card, flippedUp, onClick}) => {

    const imgPath = `${card.suit.toLowerCase()}${card.faceValue}`;
    const cardImage = flippedUp? cardImages[imgPath] : back;

    return <img onClick={onClick} className="card" src={cardImage}/>
 
}


export default CardComponent