import { useState, useRef, useEffect } from 'react';
import { Deck } from "./deck.js";
import { Card } from "./globals.js"

let hardMode = true;
let denied = false;

export default function Board() { // board inspired by tic tac toe tutorial
  const [cards, setCards] = useState(Array.from({length: 7},()=> Array.from({length: 19}, () => null)));
  const [face, setFace] = useState(Array.from({length: 7},()=> Array.from({length: 19}, () => null)));
  const [piles, setPiles] = useState(Array.from({length: 4},()=> Array.from({length: 13}, () => null)));
  const [start, setStart] = useState(true);
  const [drawpile, setDrawpile] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [visibility, setVisibility] = useState({
    stockpile: true,
    discard1: true,
    discard2: true,
    discard3: true,
    foundation1: true,
    foundation2: true,
    foundation3: true,
    foundation4: true,
    tableau1bottom: true,
    tableau2bottom: true,
    tableau3bottom: true,
    tableau4bottom: true,
    tableau5bottom: true,
    tableau6bottom: true,
    tableau7bottom: true,
    tableau1second: false,
    tableau2second: true,
    tableau3second: true,
    tableau4second: true,
    tableau5second: true,
    tableau6second: true,
    tableau7second: true,
    tableau1third: false,
    tableau2third: false,
    tableau3third: true,
    tableau4third: true,
    tableau5third: true,
    tableau6third: true,
    tableau7third: true,
    tableau1fourth: false,
    tableau2fourth: false,
    tableau3fourth: false,
    tableau4fourth: true,
    tableau5fourth: true,
    tableau6fourth: true,
    tableau7fourth: true,
    tableau1fifth: false,
    tableau2fifth: false,
    tableau3fifth: false,
    tableau4fifth: false,
    tableau5fifth: true,
    tableau6fifth: true,
    tableau7fifth: true,
    tableau1sixth: false,
    tableau2sixth: false,
    tableau3sixth: false,
    tableau4sixth: false,
    tableau5sixth: false,
    tableau6sixth: true,
    tableau7sixth: true,
    tableau1seventh: false,
    tableau2seventh: false,
    tableau3seventh: false,
    tableau4seventh: false,
    tableau5seventh: false,
    tableau6seventh: false,
    tableau7seventh: true,
    tableau1eighth: false,
    tableau2eighth: false,
    tableau3eighth: false,
    tableau4eighth: false,
    tableau5eighth: false,
    tableau6eighth: false,
    tableau7eighth: false,
    tableau1ninth: false,
    tableau2ninth: false,
    tableau3ninth: false,
    tableau4ninth: false,
    tableau5ninth: false,
    tableau6ninth: false,
    tableau7ninth: false,
    tableau1tenth: false,
    tableau2tenth: false,
    tableau3tenth: false,
    tableau4tenth: false,
    tableau5tenth: false,
    tableau6tenth: false,
    tableau7tenth: false,
    tableau1eleventh: false,
    tableau2eleventh: false,
    tableau3eleventh: false,
    tableau4eleventh: false,
    tableau5eleventh: false,
    tableau6eleventh: false,
    tableau7eleventh: false,
    tableau1twelfth: false,
    tableau2twelfth: false,
    tableau3twelfth: false,
    tableau4twelfth: false,
    tableau5twelfth: false,
    tableau6twelfth: false,
    tableau7twelfth: false,
    tableau1thirteenth: false,
    tableau2thirteenth: false,
    tableau3thirteenth: false,
    tableau4thirteenth: false,
    tableau5thirteenth: false,
    tableau6thirteenth: false,
    tableau7thirteenth: false,
    tableau2fourteenth: false,
    tableau3fourteenth: false,
    tableau4fourteenth: false,
    tableau5fourteenth: false,
    tableau6fourteenth: false,
    tableau7fourteenth: false,
    tableau3fifteenth: false,
    tableau4fifteenth: false,
    tableau5fifteenth: false,
    tableau6fifteenth: false,
    tableau7fifteenth: false,
    tableau4sixteenth: false,
    tableau5sixteenth: false,
    tableau6sixteenth: false,
    tableau7sixteenth: false,
    tableau5seventeenth: false,
    tableau6seventeenth: false,
    tableau7seventeenth: false,
    tableau6eighteenth: false,
    tableau7eighteenth: false,
    tableau7nineteenth: false,
  });
  const [cardClass, setCardClass] = useState({
    stockpile: 'card2',
    discard1: 'card',
    discard2: 'card',
    discard3: 'card',
    foundation1: 'card',
    foundation2: 'card',
    foundation3: 'card',
    foundation4: 'card',
    tableau1bottom: 'card2',
    tableau2bottom: 'card',
    tableau3bottom: 'card',
    tableau4bottom: 'card',
    tableau5bottom: 'card',
    tableau6bottom: 'card',
    tableau7bottom: 'card',
    tableau1second: 'card',
    tableau2second: 'card2',
    tableau3second: 'card',
    tableau4second: 'card',
    tableau5second: 'card',
    tableau6second: 'card',
    tableau7second: 'card',
    tableau1third: 'card',
    tableau2third: 'card',
    tableau3third: 'card2',
    tableau4third: 'card',
    tableau5third: 'card',
    tableau6third: 'card',
    tableau7third: 'card',
    tableau1fourth: 'card',
    tableau2fourth: 'card',
    tableau3fourth: 'card',
    tableau4fourth: 'card2',
    tableau5fourth: 'card',
    tableau6fourth: 'card',
    tableau7fourth: 'card',
    tableau1fifth: 'card',
    tableau2fifth: 'card',
    tableau3fifth: 'card',
    tableau4fifth: 'card',
    tableau5fifth: 'card2',
    tableau6fifth: 'card',
    tableau7fifth: 'card',
    tableau1sixth: 'card',
    tableau2sixth: 'card',
    tableau3sixth: 'card',
    tableau4sixth: 'card',
    tableau5sixth: 'card',
    tableau6sixth: 'card2',
    tableau7sixth: 'card',
    tableau1seventh: 'card',
    tableau2seventh: 'card',
    tableau3seventh: 'card',
    tableau4seventh: 'card',
    tableau5seventh: 'card',
    tableau6seventh: 'card',
    tableau7seventh: 'card2',
    tableau1eighth: 'card',
    tableau2eighth: 'card',
    tableau3eighth: 'card',
    tableau4eighth: 'card',
    tableau5eighth: 'card',
    tableau6eighth: 'card',
    tableau7eighth: 'card',
    tableau1ninth: 'card',
    tableau2ninth: 'card',
    tableau3ninth: 'card',
    tableau4ninth: 'card',
    tableau5ninth: 'card',
    tableau6ninth: 'card',
    tableau7ninth: 'card',
    tableau1tenth: 'card',
    tableau2tenth: 'card',
    tableau3tenth: 'card',
    tableau4tenth: 'card',
    tableau5tenth: 'card',
    tableau6tenth: 'card',
    tableau7tenth: 'card',
    tableau1eleventh: 'card',
    tableau2eleventh: 'card',
    tableau3eleventh: 'card',
    tableau4eleventh: 'card',
    tableau5eleventh: 'card',
    tableau6eleventh: 'card',
    tableau7eleventh: 'card',
    tableau1twelfth: 'card',
    tableau2twelfth: 'card',
    tableau3twelfth: 'card',
    tableau4twelfth: 'card',
    tableau5twelfth: 'card',
    tableau6twelfth: 'card',
    tableau7twelfth: 'card',
    tableau1thirteenth: 'card',
    tableau2thirteenth: 'card',
    tableau3thirteenth: 'card',
    tableau4thirteenth: 'card',
    tableau5thirteenth: 'card',
    tableau6thirteenth: 'card',
    tableau7thirteenth: 'card',
    tableau2fourteenth: 'card',
    tableau3fourteenth: 'card',
    tableau4fourteenth: 'card',
    tableau5fourteenth: 'card',
    tableau6fourteenth: 'card',
    tableau7fourteenth: 'card',
    tableau3fifteenth: 'card',
    tableau4fifteenth: 'card',
    tableau5fifteenth: 'card',
    tableau6fifteenth: 'card',
    tableau7fifteenth: 'card',
    tableau4sixteenth: 'card',
    tableau5sixteenth: 'card',
    tableau6sixteenth: 'card',
    tableau7sixteenth: 'card',
    tableau5seventeenth: 'card',
    tableau6seventeenth: 'card',
    tableau7seventeenth: 'card',
    tableau6eighteenth: 'card',
    tableau7eighteenth: 'card',
    tableau7nineteenth: 'card',
  });
  const [firstClick, setFirstClick] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  var deck = new Deck;
    if (start) { // shuffle and deal
      deck.shuffle();
      let newCardValue = deal();
      setCards(newCardValue);
      let newFace = Array.from({length: 7},()=> Array.from({length: 19}, () => null)); // ???
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < i + 1; j++) {
          if (i == j) {
            newFace[i][j] = true;
          }
          else {
            newFace[i][j] = false;
          }
        }
      }
      setFace(newFace);
      setStart(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    useEffect(() => {
      return () => clearInterval(timerRef.current);
    }, []);
  
    function deal() {
      let newCards = Array.from({length: 7},()=> Array.from({length: 19}, () => null));
      let dealt = Array.from({length: 7},()=> Array.from({length: 19}, () => null)); // fix this so that we only keep this and not the other
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < i + 1; j++) {
          if (deck.m_size <= 0) { // figure out why it goes back in here???
            break;
          }
          dealt[i][j] = deck.deal_top();
          let val = dealt[i][j].m_value.toString() + dealt[i][j].m_suit;
          newCards[i][j] = val;
        }
      }
      while (deck.m_size > 0) {
        drawpile.push(deck.deal_top());
      }
      return newCards;
    }

    function faceup(i, j, face) {
      return (i == 5 && j >= 8) ? true : face[i][j];
    }

    function dp_is_empty() {
      if (drawpile.length > 0) {
        return false;
      }
      return null;
    }

    function get_discard(i) {
      if (discard.length - i < 0) {
        return null;
      }
      let card = discard[discard.length-i];
      let val = card.m_value.toString() + card.m_suit;
      return val;
    }

    function get_img_link(card, faceup, show_empty = false) {
      if (card == null && faceup != false) { // fix
        if (show_empty) {
          return "/images/discard.png";
        }
        return null;
      }
      if (!faceup) {
        return "/images/back.png";
      }
      let suit = card[card.length-1];
      let value = parseInt(card);
      let link = "/images/";
      switch(value) {
        case 1:
          link += "A";
          break;
        case 11:
          link += "J";
          break;
        case 12:
          link += "Q";
          break;
        case 13:
          link += "K";
          break;
        default:
          link += value.toString();
      }
      link += "of-";
      switch(suit) {
        case 'D':
          link += "Diamonds";
          break;
        case 'C':
          link += "Clubs";
          break;
        case 'H':
          link += "Hearts";
          break;
        case 'S':
          link += "Spades";
          break;
      }
      link += "-White.png";
      return link;
    }

    function restart(win = false) {
      if (!win && !confirm("are you sure you want to restart?")) {
        return;
      }
      setCards(Array.from({length: 7},()=> Array.from({length: 19}, () => null)));
      deck = new Deck;
      denied = false;
      setFace(Array.from({length: 7},()=> Array.from({length: 19}, () => null)));
      setPiles(Array.from({length: 4},()=> Array.from({length: 13}, () => null)));
      setDrawpile([]);
      setDiscard([]);
      setCardClass({
        stockpile: 'card2',
        discard1: 'card',
        discard2: 'card',
        discard3: 'card',
        foundation1: 'card',
        foundation2: 'card',
        foundation3: 'card',
        foundation4: 'card',
        tableau1bottom: 'card2',
        tableau2bottom: 'card',
        tableau3bottom: 'card',
        tableau4bottom: 'card',
        tableau5bottom: 'card',
        tableau6bottom: 'card',
        tableau7bottom: 'card',
        tableau1second: 'card',
        tableau2second: 'card2',
        tableau3second: 'card',
        tableau4second: 'card',
        tableau5second: 'card',
        tableau6second: 'card',
        tableau7second: 'card',
        tableau1third: 'card',
        tableau2third: 'card',
        tableau3third: 'card2',
        tableau4third: 'card',
        tableau5third: 'card',
        tableau6third: 'card',
        tableau7third: 'card',
        tableau1fourth: 'card',
        tableau2fourth: 'card',
        tableau3fourth: 'card',
        tableau4fourth: 'card2',
        tableau5fourth: 'card',
        tableau6fourth: 'card',
        tableau7fourth: 'card',
        tableau1fifth: 'card',
        tableau2fifth: 'card',
        tableau3fifth: 'card',
        tableau4fifth: 'card',
        tableau5fifth: 'card2',
        tableau6fifth: 'card',
        tableau7fifth: 'card',
        tableau1sixth: 'card',
        tableau2sixth: 'card',
        tableau3sixth: 'card',
        tableau4sixth: 'card',
        tableau5sixth: 'card',
        tableau6sixth: 'card2',
        tableau7sixth: 'card',
        tableau1seventh: 'card',
        tableau2seventh: 'card',
        tableau3seventh: 'card',
        tableau4seventh: 'card',
        tableau5seventh: 'card',
        tableau6seventh: 'card',
        tableau7seventh: 'card2',
        tableau1eighth: 'card',
        tableau2eighth: 'card',
        tableau3eighth: 'card',
        tableau4eighth: 'card',
        tableau5eighth: 'card',
        tableau6eighth: 'card',
        tableau7eighth: 'card',
        tableau1ninth: 'card',
        tableau2ninth: 'card',
        tableau3ninth: 'card',
        tableau4ninth: 'card',
        tableau5ninth: 'card',
        tableau6ninth: 'card',
        tableau7ninth: 'card',
        tableau1tenth: 'card',
        tableau2tenth: 'card',
        tableau3tenth: 'card',
        tableau4tenth: 'card',
        tableau5tenth: 'card',
        tableau6tenth: 'card',
        tableau7tenth: 'card',
        tableau1eleventh: 'card',
        tableau2eleventh: 'card',
        tableau3eleventh: 'card',
        tableau4eleventh: 'card',
        tableau5eleventh: 'card',
        tableau6eleventh: 'card',
        tableau7eleventh: 'card',
        tableau1twelfth: 'card',
        tableau2twelfth: 'card',
        tableau3twelfth: 'card',
        tableau4twelfth: 'card',
        tableau5twelfth: 'card',
        tableau6twelfth: 'card',
        tableau7twelfth: 'card',
        tableau1thirteenth: 'card',
        tableau2thirteenth: 'card',
        tableau3thirteenth: 'card',
        tableau4thirteenth: 'card',
        tableau5thirteenth: 'card',
        tableau6thirteenth: 'card',
        tableau7thirteenth: 'card',
        tableau2fourteenth: 'card',
        tableau3fourteenth: 'card',
        tableau4fourteenth: 'card',
        tableau5fourteenth: 'card',
        tableau6fourteenth: 'card',
        tableau7fourteenth: 'card',
        tableau3fifteenth: 'card',
        tableau4fifteenth: 'card',
        tableau5fifteenth: 'card',
        tableau6fifteenth: 'card',
        tableau7fifteenth: 'card',
        tableau4sixteenth: 'card',
        tableau5sixteenth: 'card',
        tableau6sixteenth: 'card',
        tableau7sixteenth: 'card',
        tableau5seventeenth: 'card',
        tableau6seventeenth: 'card',
        tableau7seventeenth: 'card',
        tableau6eighteenth: 'card',
        tableau7eighteenth: 'card',
        tableau7nineteenth: 'card',
      });
      setVisibility({
        stockpile: true,
        discard1: true,
        discard2: true,
        discard3: true,
        foundation1: true,
        foundation2: true,
        foundation3: true,
        foundation4: true,
        tableau1bottom: true,
        tableau2bottom: true,
        tableau3bottom: true,
        tableau4bottom: true,
        tableau5bottom: true,
        tableau6bottom: true,
        tableau7bottom: true,
        tableau1second: false,
        tableau2second: true,
        tableau3second: true,
        tableau4second: true,
        tableau5second: true,
        tableau6second: true,
        tableau7second: true,
        tableau1third: false,
        tableau2third: false,
        tableau3third: true,
        tableau4third: true,
        tableau5third: true,
        tableau6third: true,
        tableau7third: true,
        tableau1fourth: false,
        tableau2fourth: false,
        tableau3fourth: false,
        tableau4fourth: true,
        tableau5fourth: true,
        tableau6fourth: true,
        tableau7fourth: true,
        tableau1fifth: false,
        tableau2fifth: false,
        tableau3fifth: false,
        tableau4fifth: false,
        tableau5fifth: true,
        tableau6fifth: true,
        tableau7fifth: true,
        tableau1sixth: false,
        tableau2sixth: false,
        tableau3sixth: false,
        tableau4sixth: false,
        tableau5sixth: false,
        tableau6sixth: true,
        tableau7sixth: true,
        tableau1seventh: false,
        tableau2seventh: false,
        tableau3seventh: false,
        tableau4seventh: false,
        tableau5seventh: false,
        tableau6seventh: false,
        tableau7seventh: true,
        tableau1eighth: false,
        tableau2eighth: false,
        tableau3eighth: false,
        tableau4eighth: false,
        tableau5eighth: false,
        tableau6eighth: false,
        tableau7eighth: false,
        tableau1ninth: false,
        tableau2ninth: false,
        tableau3ninth: false,
        tableau4ninth: false,
        tableau5ninth: false,
        tableau6ninth: false,
        tableau7ninth: false,
        tableau1tenth: false,
        tableau2tenth: false,
        tableau3tenth: false,
        tableau4tenth: false,
        tableau5tenth: false,
        tableau6tenth: false,
        tableau7tenth: false,
        tableau1eleventh: false,
        tableau2eleventh: false,
        tableau3eleventh: false,
        tableau4eleventh: false,
        tableau5eleventh: false,
        tableau6eleventh: false,
        tableau7eleventh: false,
        tableau1twelfth: false,
        tableau2twelfth: false,
        tableau3twelfth: false,
        tableau4twelfth: false,
        tableau5twelfth: false,
        tableau6twelfth: false,
        tableau7twelfth: false,
        tableau1thirteenth: false,
        tableau2thirteenth: false,
        tableau3thirteenth: false,
        tableau4thirteenth: false,
        tableau5thirteenth: false,
        tableau6thirteenth: false,
        tableau7thirteenth: false,
        tableau2fourteenth: false,
        tableau3fourteenth: false,
        tableau4fourteenth: false,
        tableau5fourteenth: false,
        tableau6fourteenth: false,
        tableau7fourteenth: false,
        tableau3fifteenth: false,
        tableau4fifteenth: false,
        tableau5fifteenth: false,
        tableau6fifteenth: false,
        tableau7fifteenth: false,
        tableau4sixteenth: false,
        tableau5sixteenth: false,
        tableau6sixteenth: false,
        tableau7sixteenth: false,
        tableau5seventeenth: false,
        tableau6seventeenth: false,
        tableau7seventeenth: false,
        tableau6eighteenth: false,
        tableau7eighteenth: false,
        tableau7nineteenth: false,
      });
      setFirstClick(null);
      setStart(true);
    }

    function isTop(i, j) {
      if (j < i + 13 && cards[i][j] != null && cards[i][j+1] == null) {
        return true;
      }
      if (j == 0 && cards[i][j+1] == null) {
        return true;
      }
      return false;
    }

    function getName(i, j) {
      i += 1;
      let result = "tableau" + i.toString();
      switch(j) {
        case 0:
          result += "bottom";
          break;
        case 1:
          result += "second";
          break;
        case 2:
          result += "third";
          break;
        case 3:
          result += "fourth";
          break;
        case 4:
          result += "fifth";
          break;
        case 5:
          result += "sixth";
          break;
        case  6:
          result += "seventh";
          break;
        case 7:
          result += "eighth";
          break;
        case 8:
          result += "ninth";
          break;
        case 9:
          result += "tenth";
          break;
        case 10:
          result += "eleventh";
          break;
        case 11:
          result += "twelfth";
          break;
        case 12:
          result += "thirteenth";
          break;
        case 13:
          result += "fourteenth";
          break;
        case 14:
          result += "fifteenth";
          break;
        case 15:
          result += "sixteenth";
          break;
        case 16:
          result += "seventeenth";
          break;
        case 17:
          result += "eighteenth";
          break;
        case 18:
          result += "nineteenth";
          break;
        default:
          result = null;
      }
      return result;
    }
    
    function newLocation(id) {
      let card = null; 
      let numb = null;
      let foundation = false;
      let testString = firstClick.substring(8);
      let newTop = "tableau";
      let match = firstClick.match(/\d+/); 
      let x = parseInt(match) - 1;
      let y = null;
      if (firstClick[0] == 'f') {
        numb = parseInt(firstClick[10]) - 1;
        card = piles[numb][0];
      }
      else if (firstClick[0] == 'd') {
        numb = parseInt(firstClick[7]);
        card = get_discard(numb);
      }
      else if (firstClick[0] == 't') {
        newTop += firstClick[7];
        if (testString == "bottom") {
          newTop = "bottom";
          y = 0;
        }
        else if (testString == "second") {
          newTop += "bottom";
          y = 1;
        }
        else if (testString == "third") {
          newTop += "second";
          y = 2;
        }
        else if (testString == "fourth") {
          newTop += "third";
          y = 3;
        }
        else if (testString == "fifth") {
          newTop += "fourth";
          y = 4;
        }
        else if (testString == "sixth") {
          newTop += "fifth";
          y = 5;
        }
        else if (testString == "seventh") {
          newTop += "sixth";
          y = 6;
        }
        else if (testString == "eighth") {
          newTop += "seventh";
          y = 7;
        }
        else if (testString == "ninth") {
          newTop += "eighth";
          y = 8;
        }
        else if (testString == "tenth") {
          newTop += "ninth";
          y = 9;
        }
        else if (testString == "eleventh") {
          newTop += "tenth";
          y = 10;
        }
        else if (testString == "twelfth") {
          newTop += "eleventh";
          y = 11;
        }
        else if (testString == "thirteenth") {
          newTop += "twelfth";
          y = 12;
        }
        else if (testString == "fourteenth") {
          newTop += "thirteenth";
          y = 13;
        }
        else if (testString == "fifteenth") {
          newTop += "fourteenth";
          y = 14;
        }
        else if (testString == "sixteenth") {
          newTop += "fifteenth";
          y = 15;
        }
        else if (testString == "seventeenth") {
          newTop += "sixteenth";
          y = 16;
        }
        else if (testString == "eighteenth") {
          newTop += "seventeenth";
          y = 17;
        }
        else if (testString == "nineteenth") {
          newTop += "eighteenth";
          y = 18;
        }
        card = cards[x][y];
      }
      if (card == null) {
        return null;
      }
      let card_value = card.match(/\d+/); // get the value of the card to be moved
      let value = parseInt(card_value);
      let card_suit = card[card.length - 1]; // get the suit of the card to be moved
      
      let potential_card = null;
      let result = id.substring(0, 8);
      let i = null;
      let j = null;
      let numb2 = null;
      if (id[0] == 'f') {
        if (firstClick[0] != 't' || isTop(x, y)) {
          result = id;
          let match = id[10];
          numb2 = parseInt(match) - 1;
          potential_card = piles[numb2][0];
          foundation = true;
        }
        else {
          result = null;
        }
      }
      else if (id[0] == 't') {
        let testString = id.substring(8);
        let match = id.match(/\d+/); 
        i = parseInt(match) - 1;
        if (testString == "bottom") {
          j = 0;
        }
        else if (testString == "second") {
          j = 1;
        }
        else if (testString == "third") {
          j = 2;
        }
        else if (testString == "fourth") {
          j = 3;
        }
        else if (testString == "fifth") {
          j = 4;
        }
        else if (testString == "sixth") {
          j = 5;
        }
        else if (testString == "seventh") {
          j = 6;
        }
        else if (testString == "eighth") {
          j = 7;
        }
        else if (testString == "ninth") {
          j = 8;
        }
        else if (testString == "tenth") {
          j = 9;
        }
        else if (testString == "eleventh") {
          j = 10;
        }
        else if (testString == "twelfth") {
          j = 11;
        }
        else if (testString == "thirteenth") {
          j = 12;
        }
        else if (testString == "fourteenth") {
          j = 13;
        }
        else if (testString == "fifteenth") {
          j = 14;
        }
        else if (testString == "sixteenth") {
          j = 15;
        }
        else if (testString == "seventeenth") {
          j = 16;
        }
        else if (testString == "eighteenth") {
          j = 17;
        }
        else {
          return null;
        }

        switch(j) {
          case 0:
            result += "second";
            break;
          case 1:
            result += "third";
            break;
          case 2:
            result += "fourth";
            break;
          case 3:
            result += "fifth";
            break;
          case 4:
            result += "sixth";
            break;
          case 5:
            result += "seventh";
            break;
          case  6:
            result += "eighth";
            break;
          case 7:
            result += "ninth";
            break;
          case 8:
            result += "tenth";
            break;
          case 9:
            result += "eleventh";
            break;
          case 10:
            result += "twelfth";
            break;
          case 11:
            result += "thirteenth";
            break;
          case 12:
            result += "fourteenth";
            break;
          case 13:
            result += "fifteenth";
            break;
          case 14:
            result += "sixteenth";
            break;
          case 15:
            result += "seventeenth";
            break;
          case 16:
            result += "eighteenth";
            break;
          case 17:
            result += "nineteenth";
            break;
          default:
            result = null;
        }
        potential_card = cards[i][j];
        if (!isTop(i,j)) {
          return null;
        }
      }
      else {
        return null;        
      }

      let potential_card_value = potential_card ? potential_card.match(/\d+/) : null; // get the value of the card to be moved to
      let value2 = potential_card_value ? parseInt(potential_card_value) : null;
      let potential_card_suit = potential_card ? potential_card[potential_card.length - 1] : null; // get the suit of the card to be moved to
      let moveKing = false;
      if (foundation) {
        let newPiles = piles.slice();
        if (potential_card == null) {
          if (value != 1) {
            return null;
          }
          else {
            newPiles[numb2][0] = card;
          }
        }
        else {
          if (card_suit != potential_card_suit) {
            return null;
          }
          if (value != value2 + 1) {
            return null;
          }
          newPiles[numb2].pop();
          newPiles[numb2].unshift(card);
        }
        setPiles(newPiles);
      }
      let newCards = cards.slice();
      let newFace = face.slice();
      if(!foundation) {
        if ((card_suit == 'S' || card_suit == 'C') && (potential_card_suit == 'S' || potential_card_suit == 'C')) { // if new suit is black, return null if potential suit is black too
          return null;
        }
        if ((card_suit == 'H' || card_suit == 'D') && (potential_card_suit == 'H' || potential_card_suit == 'D')) { // same with red
          return null;
        }  
        if (value2 != null) {
          if (value != value2 - 1) {
            return null;
          }
          newCards[i][j+1] = card;
          newFace[i][j+1] = true;
          if (firstClick[0] == 't') {
            for (let k = y+1; k < 19; k++) {
              if (cards[x][k] == null) {
                break;
              }
              newCards[i][j+k-y+1] = cards[x][k];
              newCards[x][k] = null;
              newFace[i][j+k-y+1] = true;
              setVisibility(prevState => ({
                ...prevState,
                [getName(x,k)]: false,
                [getName(i, j+k-y+1)]: true,
              }));
              setCardClass(prevState => ({
                ...prevState,
                [getName(x,k)]: "card",
                [getName(i, j+k-y+1)]: "card2",
              }))
            }
          }
        }
        else {
          if (value != 13) {
            return null;
          }
          moveKing = true;
          newCards[i][0] = card;
          newFace[i][0] = true;
          if (firstClick[0] == 't') {
            for (let k = y+1; k < 19; k++) {
              if (cards[x][k] == null) {
                break;
              }
              newCards[i][k-y] = cards[x][k];
              newCards[x][k] = null;
              newFace[i][k-y] = true;
              setVisibility(prevState => ({
                ...prevState,
                [getName(x,k)]: false,
                [getName(i, k-y)]: true,
              }));
              setCardClass(prevState => ({
                ...prevState,
                [getName(x,k)]: "card",
                [getName(i, k-y)]: "card2",
              }))
            }
          }
        }
      }
      if (y > 0) {
        newFace[x][y-1] = true;
      }
      if (firstClick[0] == 't') {
        cards[x][y] = null;
      }
      else if (firstClick[0] == 'd') {
        let temp_card = new Card();
        temp_card.assign(discard[discard.length - 1]);
        let new_discard = discard.slice();
        new_discard.pop();
        setDiscard(new_discard);
      }
      else if (firstClick[0] == 'f') {
        let newPiles = piles.slice();
        newPiles[numb].shift();
        newPiles[numb].push(null); 
        setPiles(newPiles);
      }
      setCards(newCards);
      if (newTop != null) {
        setCardClass(prevState => ({
          ...prevState,
          [newTop]: "card2",
        }));
      }
      if (moveKing) {
        return result.substring(0, 8) + "bottom";
      }
      return result;
    }
    function draw() {
      setFirstClick(null);
      let new_discard = discard.slice();
      let new_drawpile = drawpile.slice();
      if (new_drawpile.length == 0) {
        setDrawpile(new_discard);
        setDiscard(new_drawpile);
        setCardClass(prevState => ({
          ...prevState,
          ["discard1"]: "card",
        }));
        return;
      }
      if (hardMode) {
        let num_drawn = 0;
        while (new_drawpile.length != 0 && num_drawn < 3) {
          new_discard.push(new_drawpile.shift());
          num_drawn++;
        }
        setVisibility(prevState => ({
          ...prevState,
          ["discard2"]: true,
          ["discard3"]: true,
        }))
      }
      else {
        new_discard.push(new_drawpile.shift());
        setVisibility(prevState => ({
          ...prevState,
          ["discard2"]: false,
          ["discard3"]: false,
        }))
      }
      if (new_discard.length - 1 >= 0) {
        setCardClass(prevState => ({
          ...prevState,
          ["discard1"]: "card2",
        }));
      }
      setDrawpile(new_drawpile);
      setDiscard(new_discard);
    }

    function move(id) {
      console.log("cards");
      console.log(cards);
      console.log("visibility");
      console.log(visibility);
      if (cardClass[id] == "card") {
        if (id[0] != 'f') {
          return;
        }
      }
      if (firstClick == null ) {
        if (id[0] != 'f' || (piles[parseInt(id[10])-1][0] != null)) {
          setFirstClick(id);
          setCardClass(prevState => ({
            ...prevState,
            [id]: 'card3'
          }));
        }
      }
      else {
        if (firstClick == id) {
            setCardClass(prevState => ({
              ...prevState,
              [firstClick]: 'card2',
            }));
          setFirstClick(null);
          return;
        }
        let location = newLocation(id);
        if (location != null) {
          setCardClass(prevState => ({
            ...prevState,
            [firstClick]: 'card',
            [location]: 'card2',
          }));
          if (firstClick[0] == 'd' || (firstClick[0] == 'f' && piles[parseInt(firstClick[10])-1][0] != null) || (firstClick[0] == 't' && firstClick[8] == 'b')) {
            setCardClass(prevState => ({
              ...prevState,
              [firstClick]: 'card2',
            }));
          }
          setVisibility(prevState => ({
            ...prevState,
            [location]: true,
          }));
          if (firstClick[0] != 'f' && firstClick[0] != 'd' && firstClick[8] != 'b') {
            setVisibility(prevState => ({
              ...prevState,
              [firstClick]: false,
            }));
          }
          setFirstClick(null);
        }
        else {
          alert("invalid second click"); // deal with this later
          setCardClass(prevState => ({
            ...prevState,
            [firstClick]: 'card2',
          }));
          setFirstClick(null);
        }
      }
    }

    function toggleDifficulty() {
      hardMode = !hardMode;
      if (hardMode) {
        setVisibility(prevState => ({
          ...prevState,
          ["discard1"]: true,
          ["discard2"]: true,
          ["discard3"]: true,
        }));
      }
      else {
        setVisibility(prevState => ({
          ...prevState,
          ["discard1"]: true,
          ["discard2"]: false,
          ["discard3"]: false,
        }));
      }
    }

    function isWin() {
      if (piles[0][0] == null || piles[1][0] == null || piles[2][0] == null || piles[3][0] == null) {
        return false;
      }
      if (piles[0][0].match(/\d+/) == "13" && piles[1][0].match(/\d+/) == "13" && piles[2][0].match(/\d+/) == "13" && piles[3][0].match(/\d+/) == "13") {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        return true;
      }
      return false;
    }

    if(denied == false && isWin()) {
      if(confirm("congratulations on winning! would you like to restart?")) {
        restart(true);
      }
      else {
        denied = true;
      } 
    }

    function getTime() {
      let result;
      let hours = 0;
      if (seconds > 3600) {
        hours = (seconds - seconds % 3600)/3600;
        result = hours.toString() + ":";
      }
      else {
        result = "0:";
      }
      let minutes = 0; 
      if (seconds > 60) {
        minutes = (seconds-seconds % 60)/60 - hours*60;
      }
      let remainder = seconds % 60;
      if (minutes < 10) {
        result += "0";
      }
      result += minutes.toString();
      result += ":";
      if (remainder < 10) {
        result += "0";
      }
      return result + remainder.toString();
    }

    function solve() {
      setCards(Array.from({length: 7},()=> Array.from({length: 19}, () => null)));
      setDiscard([]);
      setDrawpile([]);
      let newPiles = piles.slice();
      let suits = Array.from({length: 4}, () => null);
      for (let i = 0; i < 4; i++) {
        if (piles[i][0] == null) {
          let suit = piles[i][0][piles[i][0].length-1];
          switch(suit) {
            case 'D':
              suits[0] = i;
              break;
            case 'C':
              suits[1] = i;
              break;
            case 'H':
              suits[2] = i;
              break;
            case 'S':
              suits[3] = i;
              break;
            default:
              break;
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        if (piles[i][0] == null) {
          for (let j = 0; j < 4; j++) {
            if (suits[j] == null) {
              suits[j] = i;
              let suit;
              switch(j) {
                case 0:
                  suit = 'D';
                  break;
                case 1:
                  suit = 'C';
                  break;
                case 2:
                  suit = 'H';
                  break;
                case 3:
                  suit = 'S';
                  break;
                default:
                  break;
              }
              newPiles[i][0] = "1" + suit;
              break;
            }
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        let card_value = newPiles[i][0].match(/\d+/); // get the value of the card to be moved
        let value = parseInt(card_value);
        let suit = piles[i][0][piles[i][0].length-1];
        for (let j = value+1; j <= 13; j++) {
          newPiles[i].pop();
          newPiles[i].unshift(j.toString() + suit);
        }
      }
      setPiles(newPiles);
      setCardClass({
        stockpile: 'card',
        discard1: 'card',
        discard2: 'card',
        discard3: 'card',
        foundation1: 'card2',
        foundation2: 'card2',
        foundation3: 'card2',
        foundation4: 'card2',
        tableau1bottom: 'card2',
        tableau2bottom: 'card2',
        tableau3bottom: 'card2',
        tableau4bottom: 'card2',
        tableau5bottom: 'card2',
        tableau6bottom: 'card2',
        tableau7bottom: 'card2',
        tableau1second: 'card',
        tableau2second: 'card',
        tableau3second: 'card',
        tableau4second: 'card',
        tableau5second: 'card',
        tableau6second: 'card',
        tableau7second: 'card',
        tableau1third: 'card',
        tableau2third: 'card',
        tableau3third: 'card',
        tableau4third: 'card',
        tableau5third: 'card',
        tableau6third: 'card',
        tableau7third: 'card',
        tableau1fourth: 'card',
        tableau2fourth: 'card',
        tableau3fourth: 'card',
        tableau4fourth: 'card',
        tableau5fourth: 'card',
        tableau6fourth: 'card',
        tableau7fourth: 'card',
        tableau1fifth: 'card',
        tableau2fifth: 'card',
        tableau3fifth: 'card',
        tableau4fifth: 'card',
        tableau5fifth: 'card',
        tableau6fifth: 'card',
        tableau7fifth: 'card',
        tableau1sixth: 'card',
        tableau2sixth: 'card',
        tableau3sixth: 'card',
        tableau4sixth: 'card',
        tableau5sixth: 'card',
        tableau6sixth: 'card',
        tableau7sixth: 'card',
        tableau1seventh: 'card',
        tableau2seventh: 'card',
        tableau3seventh: 'card',
        tableau4seventh: 'card',
        tableau5seventh: 'card',
        tableau6seventh: 'card',
        tableau7seventh: 'card',
        tableau1eighth: 'card',
        tableau2eighth: 'card',
        tableau3eighth: 'card',
        tableau4eighth: 'card',
        tableau5eighth: 'card',
        tableau6eighth: 'card',
        tableau7eighth: 'card',
        tableau1ninth: 'card',
        tableau2ninth: 'card',
        tableau3ninth: 'card',
        tableau4ninth: 'card',
        tableau5ninth: 'card',
        tableau6ninth: 'card',
        tableau7ninth: 'card',
        tableau1tenth: 'card',
        tableau2tenth: 'card',
        tableau3tenth: 'card',
        tableau4tenth: 'card',
        tableau5tenth: 'card',
        tableau6tenth: 'card',
        tableau7tenth: 'card',
        tableau1eleventh: 'card',
        tableau2eleventh: 'card',
        tableau3eleventh: 'card',
        tableau4eleventh: 'card',
        tableau5eleventh: 'card',
        tableau6eleventh: 'card',
        tableau7eleventh: 'card',
        tableau1twelfth: 'card',
        tableau2twelfth: 'card',
        tableau3twelfth: 'card',
        tableau4twelfth: 'card',
        tableau5twelfth: 'card',
        tableau6twelfth: 'card',
        tableau7twelfth: 'card',
        tableau1thirteenth: 'card',
        tableau2thirteenth: 'card',
        tableau3thirteenth: 'card',
        tableau4thirteenth: 'card',
        tableau5thirteenth: 'card',
        tableau6thirteenth: 'card',
        tableau7thirteenth: 'card',
        tableau2fourteenth: 'card',
        tableau3fourteenth: 'card',
        tableau4fourteenth: 'card',
        tableau5fourteenth: 'card',
        tableau6fourteenth: 'card',
        tableau7fourteenth: 'card',
        tableau3fifteenth: 'card',
        tableau4fifteenth: 'card',
        tableau5fifteenth: 'card',
        tableau6fifteenth: 'card',
        tableau7fifteenth: 'card',
        tableau4sixteenth: 'card',
        tableau5sixteenth: 'card',
        tableau6sixteenth: 'card',
        tableau7sixteenth: 'card',
        tableau5seventeenth: 'card',
        tableau6seventeenth: 'card',
        tableau7seventeenth: 'card',
        tableau6eighteenth: 'card',
        tableau7eighteenth: 'card',
        tableau7nineteenth: 'card',
      });
      setVisibility({
        stockpile: true,
        discard1: true,
        discard2: true,
        discard3: true,
        foundation1: true,
        foundation2: true,
        foundation3: true,
        foundation4: true,
        tableau1bottom: true,
        tableau2bottom: true,
        tableau3bottom: true,
        tableau4bottom: true,
        tableau5bottom: true,
        tableau6bottom: true,
        tableau7bottom: true,
        tableau1second: false,
        tableau2second: false,
        tableau3second: false,
        tableau4second: false,
        tableau5second: false,
        tableau6second: false,
        tableau7second: false,
        tableau1third: false,
        tableau2third: false,
        tableau3third: false,
        tableau4third: false,
        tableau5third: false,
        tableau6third: false,
        tableau7third: false,
        tableau1fourth: false,
        tableau2fourth: false,
        tableau3fourth: false,
        tableau4fourth: false,
        tableau5fourth: false,
        tableau6fourth: false,
        tableau7fourth: false,
        tableau1fifth: false,
        tableau2fifth: false,
        tableau3fifth: false,
        tableau4fifth: false,
        tableau5fifth: false,
        tableau6fifth: false,
        tableau7fifth: false,
        tableau1sixth: false,
        tableau2sixth: false,
        tableau3sixth: false,
        tableau4sixth: false,
        tableau5sixth: false,
        tableau6sixth: false,
        tableau7sixth: false,
        tableau1seventh: false,
        tableau2seventh: false,
        tableau3seventh: false,
        tableau4seventh: false,
        tableau5seventh: false,
        tableau6seventh: false,
        tableau7seventh: false,
        tableau1eighth: false,
        tableau2eighth: false,
        tableau3eighth: false,
        tableau4eighth: false,
        tableau5eighth: false,
        tableau6eighth: false,
        tableau7eighth: false,
        tableau1ninth: false,
        tableau2ninth: false,
        tableau3ninth: false,
        tableau4ninth: false,
        tableau5ninth: false,
        tableau6ninth: false,
        tableau7ninth: false,
        tableau1tenth: false,
        tableau2tenth: false,
        tableau3tenth: false,
        tableau4tenth: false,
        tableau5tenth: false,
        tableau6tenth: false,
        tableau7tenth: false,
        tableau1eleventh: false,
        tableau2eleventh: false,
        tableau3eleventh: false,
        tableau4eleventh: false,
        tableau5eleventh: false,
        tableau6eleventh: false,
        tableau7eleventh: false,
        tableau1twelfth: false,
        tableau2twelfth: false,
        tableau3twelfth: false,
        tableau4twelfth: false,
        tableau5twelfth: false,
        tableau6twelfth: false,
        tableau7twelfth: false,
        tableau1thirteenth: false,
        tableau2thirteenth: false,
        tableau3thirteenth: false,
        tableau4thirteenth: false,
        tableau5thirteenth: false,
        tableau6thirteenth: false,
        tableau7thirteenth: false,
        tableau2fourteenth: false,
        tableau3fourteenth: false,
        tableau4fourteenth: false,
        tableau5fourteenth: false,
        tableau6fourteenth: false,
        tableau7fourteenth: false,
        tableau3fifteenth: false,
        tableau4fifteenth: false,
        tableau5fifteenth: false,
        tableau6fifteenth: false,
        tableau7fifteenth: false,
        tableau4sixteenth: false,
        tableau5sixteenth: false,
        tableau6sixteenth: false,
        tableau7sixteenth: false,
        tableau5seventeenth: false,
        tableau6seventeenth: false,
        tableau7seventeenth: false,
        tableau6eighteenth: false,
        tableau7eighteenth: false,
        tableau7nineteenth: false,
      });
    }

    function autoSolve() {
      if ((discard.length == 0 && drawpile.length == 0) || !hardMode) {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j <= i; j++) {
            if (face[i][j] == false) {
              if (hardMode) {
                alert("sorry, autosolve unavailable until discard/draw piles are empty and all tableau cards are face up");
              }
              else {
                alert("sorry, autosolve unavailable until all tableau cards are face up");
              }
              return;
            }
          }
        }
        solve();
        return;
      }
      if (hardMode) {
        alert("sorry, autosolve unavailable until discard/draw piles are empty and all tableau cards are face up");
      }
      else {
        alert("sorry, autosolve unavailable until all tableau cards are face up");
      }
      return;
    }
  
    return ( // return the board object
      <>
        <div className="center-screen">
          <div className="board-row">
            {visibility['stockpile'] && (
              <button id="stockpile" className={cardClass['stockpile']} style={{ left: "20px", top: "140px" }} onClick={() => draw()}>
                {get_img_link(null, dp_is_empty(), true) ? (
                <img id="sp" src={get_img_link(null, dp_is_empty(), true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['discard3'] && (
              <button id="discard3" className={cardClass['discard3']} style={{ left: "160px", top: "140px" }} onClick={() => move("discard3")}>
                {get_img_link(get_discard(3), true, false) ? (
                <img id="disc3" src={get_img_link(get_discard(3), true, false)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['discard2'] && (
              <button id="discard2" className={cardClass['discard2']} style={{ left: "180px", top: "140px" }} onClick={() => move("discard2")}>
                {get_img_link(get_discard(2), true, false) ? (
                <img id="disc2" src={get_img_link(get_discard(2), true, false)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['discard1'] && (
              <button id="discard1" className={cardClass['discard1']} style={{ left: "200px", top: "140px" }} onClick={() => move("discard1")}>
                {get_img_link(get_discard(1), true, false) ? (
                <img id="disc1" src={get_img_link(get_discard(1), true, false)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['foundation1'] && (
              <button id="foundation1" className={cardClass['foundation1']} style={{ left: "440px", top: "140px" }} onClick={() => move("foundation1")}>
                {get_img_link(piles[0][0],true, true) ? (
                <img id="found1" src={get_img_link(piles[0][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['foundation2'] && (
              <button id="foundation2" className={cardClass['foundation2']} style={{ left: "580px", top: "140px" }} onClick={() => move("foundation2")}>
                {get_img_link(piles[1][0],true, true) ? (
                <img id="found2" src={get_img_link(piles[1][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['foundation3'] && (
              <button id="foundation3" className={cardClass['foundation3']} style={{ left: "720px", top: "140px" }} onClick={() => move("foundation3")}>
                {get_img_link(piles[2][0],true, true) ? (
                <img id="found3" src={get_img_link(piles[2][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['foundation4'] && (
              <button id="foundation4" className={cardClass['foundation4']} style={{ left: "860px", top: "140px" }} onClick={() => move("foundation4")}>
                {get_img_link(piles[3][0],true, true) ? (
                <img id="found4" src={get_img_link(piles[3][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1bottom'] && (
              <button id="tableau1bottom" className={cardClass['tableau1bottom']} style={{ left: "20px", top: "330px" }} onClick={() => move("tableau1bottom")}>
                {get_img_link(cards[0][0],faceup(0,0,face),true) ? (
                <img id="t1b" src={get_img_link(cards[0][0],faceup(0,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2bottom'] && (
              <button id="tableau2bottom" className={cardClass['tableau2bottom']} style={{ left: "160px", top: "330px" }} onClick={() => move("tableau2bottom")}>
                {get_img_link(cards[1][0],faceup(1,0,face),true) ? (
                <img id="t2b" src={get_img_link(cards[1][0],faceup(1,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3bottom'] && (
              <button id="tableau3bottom" className={cardClass['tableau3bottom']} style={{ left: "300px", top: "330px" }} onClick={() => move("tableau3bottom")}>
                {get_img_link(cards[2][0],faceup(2,0,face),true) ? (
                <img id="t3b" src={get_img_link(cards[2][0],faceup(2,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4bottom'] && (
              <button id="tableau4bottom" className={cardClass['tableau4bottom']} style={{ left: "440px", top: "330px" }} onClick={() => move("tableau4bottom")}>
                {get_img_link(cards[3][0],faceup(3,0,face),true) ? (
                <img id="t4b" src={get_img_link(cards[3][0],faceup(3,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5bottom'] && (
              <button id="tableau5bottom" className={cardClass['tableau5bottom']} style={{ left: "580px", top: "330px" }} onClick={() => move("tableau5bottom")}>
                {get_img_link(cards[4][0],faceup(4,0,face),true) ? (
                <img id="t5b" src={get_img_link(cards[4][0],faceup(4,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6bottom'] && (
              <button id="tableau6bottom" className={cardClass['tableau6bottom']} style={{ left: "720px", top: "330px" }} onClick={() => move("tableau6bottom")}>
                {get_img_link(cards[5][0],faceup(5,0,face),true) ? (
                <img id="t6b" src={get_img_link(cards[5][0],faceup(5,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7bottom'] && (
              <button id="tableau7bottom" className={cardClass['tableau7bottom']} style={{ left: "860px", top: "330px" }} onClick={() => move("tableau7bottom")}>
                {get_img_link(cards[6][0],faceup(6,0,face),true) ? (
                <img id="t7b" src={get_img_link(cards[6][0],faceup(6,0,face),true)} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1second'] && (
              <button id="tableau1second" className={cardClass['tableau1second']} style={{ left: "20px", top: "350px" }} onClick={() => move("tableau1second")}>
                {get_img_link(cards[0][1],faceup(0,1,face)) ? (
                <img id="t1sec" src={get_img_link(cards[0][1],faceup(0,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2second'] && (
              <button id="tableau2second" className={cardClass['tableau2second']} style={{ left: "160px", top: "350px" }} onClick={() => move("tableau2second")}>
                {get_img_link(cards[1][1],faceup(1,1,face)) ? (
                <img id="t2sec" src={get_img_link(cards[1][1],faceup(1,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3second'] && (
              <button id="tableau3second" className={cardClass['tableau3second']} style={{ left: "300px", top: "350px" }} onClick={() => move("tableau3second")}>
                {get_img_link(cards[2][1],faceup(2,1,face)) ? (
                <img id="t3sec" src={get_img_link(cards[2][1],faceup(2,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4second'] && (
              <button id="tableau4second" className={cardClass['tableau4second']} style={{ left: "440px", top: "350px" }} onClick={() => move("tableau4second")}>
                {get_img_link(cards[3][1],faceup(3,1,face)) ? (
                <img id="t4sec" src={get_img_link(cards[3][1],faceup(3,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5second'] && (
              <button id="tableau5second" className={cardClass['tableau5second']} style={{ left: "580px", top: "350px" }} onClick={() => move("tableau5second")}>
                {get_img_link(cards[4][1],faceup(4,1,face)) ? (
                <img id="t5sec" src={get_img_link(cards[4][1],faceup(4,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6second'] && (
              <button id="tableau6second" className={cardClass['tableau6second']} style={{ left: "720px", top: "350px" }} onClick={() => move("tableau6second")}>
                {get_img_link(cards[5][1],faceup(5,1,face)) ? (
                <img id="t6sec" src={get_img_link(cards[5][1],faceup(5,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7second'] && (
              <button id="tableau7second" className={cardClass['tableau7second']} style={{ left: "860px", top: "350px" }} onClick={() => move("tableau7second")}>
                {get_img_link(cards[6][1],faceup(6,1,face)) ? (
                <img id="t7sec" src={get_img_link(cards[6][1],faceup(6,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
          {visibility['tableau1third'] && (
              <button id="tableau1third" className={cardClass['tableau1third']} style={{ left: "20px", top: "370px" }} onClick={() => move("tableau1third")}>
                {get_img_link(cards[0][2],faceup(0,2,face)) ? (
                <img id="t1thi" src={get_img_link(cards[0][2],faceup(0,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau2third'] && (
              <button id="tableau2third" className={cardClass['tableau2third']} style={{ left: "160px", top: "370px" }} onClick={() => move("tableau2third")}>
                {get_img_link(cards[1][2],faceup(1,2,face)) ? (
                <img id="t2thi" src={get_img_link(cards[1][2],faceup(1,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau3third'] && (
              <button id="tableau3third" className={cardClass['tableau3third']} style={{ left: "300px", top: "370px" }} onClick={() => move("tableau3third")}>
                {get_img_link(cards[2][2],faceup(2,2,face)) ? (
                <img id="t3thi" src={get_img_link(cards[2][2],faceup(2,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau4third'] && (
              <button id="tableau4third" className={cardClass['tableau4third']} style={{ left: "440px", top: "370px" }} onClick={() => move("tableau4third")}>
                {get_img_link(cards[3][2],faceup(3,2,face)) ? (
                <img id="t4thi" src={get_img_link(cards[3][2],faceup(3,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau5third'] && (
              <button id="tableau5third" className={cardClass['tableau5third']} style={{ left: "580px", top: "370px" }} onClick={() => move("tableau5third")}>
                {get_img_link(cards[4][2],faceup(4,2,face)) ? (
                <img id="t5thi" src={get_img_link(cards[4][2],faceup(4,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau6third'] && (
              <button id="tableau6third" className={cardClass['tableau6third']} style={{ left: "720px", top: "370px" }} onClick={() => move("tableau6third")}>
                {get_img_link(cards[5][2],faceup(5,2,face)) ? (
                <img id="t6thi" src={get_img_link(cards[5][2],faceup(5,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          {visibility['tableau7third'] && (
              <button id="tableau7third" className={cardClass['tableau7third']} style={{ left: "860px", top: "370px" }} onClick={() => move("tableau7third")}>
                {get_img_link(cards[6][2],faceup(6,2,face)) ? (
                <img id="t7thi" src={get_img_link(cards[6][2],faceup(6,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
          )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1fourth'] && (
              <button id="tableau1fourth" className={cardClass['tableau1fourth']} style={{ left: "20px", top: "390px" }} onClick={() => move("tableau1fourth")}>
                {get_img_link(cards[0][3],faceup(0,3,face)) ? (
                <img id="t1fou" src={get_img_link(cards[0][3],faceup(0,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2fourth'] && (
              <button id="tableau2fourth" className={cardClass['tableau2fourth']} style={{ left: "160px", top: "390px" }} onClick={() => move("tableau2fourth")}>
                {get_img_link(cards[1][3],faceup(1,3,face)) ? (
                <img id="t2fou" src={get_img_link(cards[1][3],faceup(1,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3fourth'] && (
              <button id="tableau3fourth" className={cardClass['tableau3fourth']} style={{ left: "300px", top: "390px" }} onClick={() => move("tableau3fourth")}>
                {get_img_link(cards[2][3],faceup(2,3,face)) ? (
                <img id="t3fou" src={get_img_link(cards[2][3],faceup(2,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4fourth'] && (
              <button id="tableau4fourth" className={cardClass['tableau4fourth']} style={{ left: "440px", top: "390px" }} onClick={() => move("tableau4fourth")}>
                {get_img_link(cards[3][3],faceup(3,3,face)) ? (
                <img id="t4fou" src={get_img_link(cards[3][3],faceup(3,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5fourth'] && (
              <button id="tableau5fourth" className={cardClass['tableau5fourth']} style={{ left: "580px", top: "390px" }} onClick={() => move("tableau5fourth")}>
                {get_img_link(cards[4][3],faceup(4,3,face)) ? (
                <img id="t5fou" src={get_img_link(cards[4][3],faceup(4,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6fourth'] && (
              <button id="tableau6fourth" className={cardClass['tableau6fourth']} style={{ left: "720px", top: "390px" }} onClick={() => move("tableau6fourth")}>
                {get_img_link(cards[5][3],faceup(5,3,face)) ? (
                <img id="t6fou" src={get_img_link(cards[5][3],faceup(5,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7fourth'] && (
              <button id="tableau7fourth" className={cardClass['tableau7fourth']} style={{ left: "860px", top: "390px" }} onClick={() => move("tableau7fourth")}>
                {get_img_link(cards[6][3],faceup(6,3,face)) ? (
                <img id="t7fou" src={get_img_link(cards[6][3],faceup(6,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1fifth'] && (
              <button id="tableau1fifth" className={cardClass['tableau1fifth']} style={{ left: "20px", top: "410px" }} onClick={() => move("tableau1fifth")}>
                {get_img_link(cards[0][4],faceup(0,4,face)) ? (
                <img id="t1fif" src={get_img_link(cards[0][4],faceup(0,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2fifth'] && (
              <button id="tableau2fifth" className={cardClass['tableau2fifth']} style={{ left: "160px", top: "410px" }} onClick={() => move("tableau2fifth")}>
                {get_img_link(cards[1][4],faceup(1,4,face)) ? (
                <img id="t2fif" src={get_img_link(cards[1][4],faceup(1,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3fifth'] && (
              <button id="tableau3fifth" className={cardClass['tableau3fifth']} style={{ left: "300px", top: "410px" }} onClick={() => move("tableau3fifth")}>
                {get_img_link(cards[2][4],faceup(2,4,face)) ? (
                <img id="t3fif" src={get_img_link(cards[2][4],faceup(2,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4fifth'] && (
              <button id="tableau4fifth" className={cardClass['tableau4fifth']} style={{ left: "440px", top: "410px" }} onClick={() => move("tableau4fifth")}>
                {get_img_link(cards[3][4],faceup(3,4,face)) ? (
                <img id="t4fif" src={get_img_link(cards[3][4],faceup(3,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5fifth'] && (
              <button id="tableau5fifth" className={cardClass['tableau5fifth']} style={{ left: "580px", top: "410px" }} onClick={() => move("tableau5fifth")}>
                {get_img_link(cards[4][4],faceup(4,4,face)) ? (
                <img id="t5fif" src={get_img_link(cards[4][4],faceup(4,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6fifth'] && (
              <button id="tableau6fifth" className={cardClass['tableau6fifth']} style={{ left: "720px", top: "410px" }} onClick={() => move("tableau6fifth")}>
                {get_img_link(cards[5][4],faceup(5,4,face)) ? (
                <img id="t6fif" src={get_img_link(cards[5][4],faceup(5,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7fifth'] && (
              <button id="tableau7fifth" className={cardClass['tableau7fifth']} style={{ left: "860px", top: "410px" }} onClick={() => move("tableau7fifth")}>
                {get_img_link(cards[6][4],faceup(6,4,face)) ? (
                <img id="t7fif" src={get_img_link(cards[6][4],faceup(6,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1sixth'] && (
              <button id="tableau1sixth" className={cardClass['tableau1sixth']} style={{ left: "20px", top: "430px" }} onClick={() => move("tableau1sixth")}>
                {get_img_link(cards[0][5],faceup(0,5,face)) ? (
                <img id="t1six" src={get_img_link(cards[0][5],faceup(0,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2sixth'] && (
              <button id="tableau2sixth" className={cardClass['tableau2sixth']} style={{ left: "160px", top: "430px" }} onClick={() => move("tableau2sixth")}>
                {get_img_link(cards[1][5],faceup(1,5,face)) ? (
                <img id="t2six" src={get_img_link(cards[1][5],faceup(1,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3sixth'] && (
              <button id="tableau3sixth" className={cardClass['tableau3sixth']} style={{ left: "300px", top: "430px" }} onClick={() => move("tableau3sixth")}>
                {get_img_link(cards[2][5],faceup(2,5,face)) ? (
                <img id="t3six" src={get_img_link(cards[2][5],faceup(2,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4sixth'] && (
              <button id="tableau4sixth" className={cardClass['tableau4sixth']} style={{ left: "440px", top: "430px" }} onClick={() => move("tableau4sixth")}>
                {get_img_link(cards[3][5],faceup(3,5,face)) ? (
                <img id="t4six" src={get_img_link(cards[3][5],faceup(3,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5sixth'] && (
              <button id="tableau5sixth" className={cardClass['tableau5sixth']} style={{ left: "580px", top: "430px" }} onClick={() => move("tableau5sixth")}>
                {get_img_link(cards[4][5],faceup(4,5,face)) ? (
                <img id="t5six" src={get_img_link(cards[4][5],faceup(4,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6sixth'] && (
              <button id="tableau6sixth" className={cardClass['tableau6sixth']} style={{ left: "720px", top: "430px" }} onClick={() => move("tableau6sixth")}>
                {get_img_link(cards[5][5],faceup(5,5,face)) ? (
                <img id="t6six" src={get_img_link(cards[5][5],faceup(5,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7sixth'] && (
              <button id="tableau7sixth" className={cardClass['tableau7sixth']} style={{ left: "860px", top: "430px" }} onClick={() => move("tableau7sixth")}>
                {get_img_link(cards[6][5],faceup(6,5,face)) ? (
                <img id="t7six" src={get_img_link(cards[6][5],faceup(6,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1seventh'] && (
              <button id="tableau1seventh" className={cardClass['tableau1seventh']} style={{ left: "20px", top: "450px" }} onClick={() => move("tableau1seventh")}>
                {get_img_link(cards[0][6],faceup(0,6,face)) ? (
                <img id="t1sev" src={get_img_link(cards[0][6],faceup(0,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2seventh'] && (
              <button id="tableau2seventh" className={cardClass['tableau2seventh']} style={{ left: "160px", top: "450px" }} onClick={() => move("tableau2seventh")}>
                {get_img_link(cards[1][6],faceup(1,6,face)) ? (
                <img id="t2sev" src={get_img_link(cards[1][6],faceup(1,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3seventh'] && (
              <button id="tableau3seventh" className={cardClass['tableau3seventh']} style={{ left: "300px", top: "450px" }} onClick={() => move("tableau3seventh")}>
                {get_img_link(cards[2][6],faceup(2,6,face)) ? (
                <img id="t3sev" src={get_img_link(cards[2][6],faceup(2,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4seventh'] && (
              <button id="tableau4seventh" className={cardClass['tableau4seventh']} style={{ left: "440px", top: "450px" }} onClick={() => move("tableau4seventh")}>
                {get_img_link(cards[3][6],faceup(3,6,face)) ? (
                <img id="t4sev" src={get_img_link(cards[3][6],faceup(3,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5seventh'] && (
              <button id="tableau5seventh" className={cardClass['tableau5seventh']} style={{ left: "580px", top: "450px" }} onClick={() => move("tableau5seventh")}>
                {get_img_link(cards[4][6],faceup(4,6,face)) ? (
                <img id="t5sev" src={get_img_link(cards[4][6],faceup(4,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6seventh'] && (
              <button id="tableau6seventh" className={cardClass['tableau6seventh']} style={{ left: "720px", top: "450px" }} onClick={() => move("tableau6seventh")}>
                {get_img_link(cards[5][6],faceup(5,6,face)) ? (
                <img id="t6sev" src={get_img_link(cards[5][6],faceup(5,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7seventh'] && (
              <button id="tableau7seventh" className={cardClass['tableau7seventh']} style={{ left: "860px", top: "450px" }} onClick={() => move("tableau7seventh")}>
                {get_img_link(cards[6][6],faceup(6,6,face)) ? (
                <img id="t7sev" src={get_img_link(cards[6][6],faceup(6,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1eighth'] && (
                <button id="tableau1eighth" className={cardClass['tableau1eighth']} style={{ left: "20px", top: "470px" }} onClick={() => move("tableau1eighth")}>
                {get_img_link(cards[0][7],faceup(0,7,face)) ? (
                <img id="t1eig" src={get_img_link(cards[0][7],faceup(0,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2eighth'] && (
              <button id="tableau2eighth" className={cardClass['tableau2eighth']} style={{ left: "160px", top: "470px" }} onClick={() => move("tableau2eighth")}>
                {get_img_link(cards[1][7],faceup(1,7,face)) ? (
                <img id="t2eig" src={get_img_link(cards[1][7],faceup(1,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3eighth'] && (
              <button id="tableau3eighth" className={cardClass['tableau3eighth']} style={{ left: "300px", top: "470px" }} onClick={() => move("tableau3eighth")}>
                {get_img_link(cards[2][7],faceup(2,7,face)) ? (
                <img id="t3eig" src={get_img_link(cards[2][7],faceup(2,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4eighth'] && (
              <button id="tableau4eighth" className={cardClass['tableau4eighth']} style={{ left: "440px", top: "470px" }} onClick={() => move("tableau4eighth")}>
                {get_img_link(cards[3][7],faceup(3,7,face)) ? (
                <img id="t4eig" src={get_img_link(cards[3][7],faceup(3,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5eighth'] && (
              <button id="tableau5eighth" className={cardClass['tableau5eighth']} style={{ left: "580px", top: "470px" }} onClick={() => move("tableau5eighth")}>
                {get_img_link(cards[4][7],faceup(4,7,face)) ? (
                <img id="t5eig" src={get_img_link(cards[4][7],faceup(4,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6eighth'] && (
              <button id="tableau6eighth" className={cardClass['tableau6eighth']} style={{ left: "720px", top: "470px" }} onClick={() => move("tableau6eighth")}>
                {get_img_link(cards[5][7],faceup(5,7,face)) ? (
                <img id="t6eig" src={get_img_link(cards[5][7],faceup(5,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7eighth'] && (
              <button id="tableau7eighth" className={cardClass['tableau7eighth']} style={{ left: "860px", top: "470px" }} onClick={() => move("tableau7eighth")}>
                {get_img_link(cards[6][7],faceup(6,7,face)) ? (
                <img id="t7eig" src={get_img_link(cards[6][7],faceup(6,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1ninth'] && (
              <button id="tableau1ninth" className={cardClass['tableau1ninth']} style={{ left: "20px", top: "490px" }} onClick={() => move("tableau1ninth")}>
                {get_img_link(cards[0][8],faceup(0,8,face)) ? (
                <img id="t1nin" src={get_img_link(cards[0][8],faceup(0,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2ninth'] && (
              <button id="tableau2ninth" className={cardClass['tableau2ninth']} style={{ left: "160px", top: "490px" }} onClick={() => move("tableau2ninth")}>
                {get_img_link(cards[1][8],faceup(1,8,face)) ? (
                <img id="t2nin" src={get_img_link(cards[1][8],faceup(1,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3ninth'] && (
              <button id="tableau3ninth" className={cardClass['tableau3ninth']} style={{ left: "300px", top: "490px" }} onClick={() => move("tableau3ninth")}>
                {get_img_link(cards[2][8],faceup(2,8,face)) ? (
                <img id="t3nin" src={get_img_link(cards[2][8],faceup(2,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4ninth'] && (
              <button id="tableau4ninth" className={cardClass['tableau4ninth']} style={{ left: "440px", top: "490px" }} onClick={() => move("tableau4ninth")}>
                {get_img_link(cards[3][8],faceup(3,8,face)) ? (
                <img id="t4nin" src={get_img_link(cards[3][8],faceup(3,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5ninth'] && (
              <button id="tableau5ninth" className={cardClass['tableau5ninth']} style={{ left: "580px", top: "490px" }} onClick={() => move("tableau5ninth")}>
                {get_img_link(cards[4][8],faceup(4,8,face)) ? (
                <img id="t5nin" src={get_img_link(cards[4][8],faceup(4,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6ninth'] && (
              <button id="tableau6ninth" className={cardClass['tableau6ninth']} style={{ left: "720px", top: "490px" }} onClick={() => move("tableau6ninth")}>
                {get_img_link(cards[5][8],faceup(5,8,face)) ? (
                <img id="t6nin" src={get_img_link(cards[5][8],faceup(5,8))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7ninth'] && (
              <button id="tableau7ninth" className={cardClass['tableau7ninth']} style={{ left: "860px", top: "490px" }} onClick={() => move("tableau7ninth")}>
                {get_img_link(cards[6][8],faceup(6,8,face)) ? (
                <img id="t7nin" src={get_img_link(cards[6][8],faceup(6,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1tenth'] && (
              <button id="tableau1tenth" className={cardClass['tableau1tenth']} style={{ left: "20px", top: "510px" }} onClick={() => move("tableau1tenth")}>
                {get_img_link(cards[0][9],faceup(0,9,face)) ? (
                <img id="t1ten" src={get_img_link(cards[0][9],faceup(0,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2tenth'] && (
              <button id="tableau2tenth" className={cardClass['tableau2tenth']} style={{ left: "160px", top: "510px" }} onClick={() => move("tableau2tenth")}>
                {get_img_link(cards[1][9],faceup(1,9,face)) ? (
                <img id="t2ten" src={get_img_link(cards[1][9],faceup(1,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3tenth'] && (
              <button id="tableau3tenth" className={cardClass['tableau3tenth']} style={{ left: "300px", top: "510px" }} onClick={() => move("tableau3tenth")}>
                {get_img_link(cards[2][9],faceup(2,9,face)) ? (
                <img id="t3ten" src={get_img_link(cards[2][9],faceup(2,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4tenth'] && (
              <button id="tableau4tenth" className={cardClass['tableau4tenth']} style={{ left: "440px", top: "510px" }} onClick={() => move("tableau4tenth")}>
                {get_img_link(cards[3][9],faceup(3,9,face)) ? (
                <img id="t4ten" src={get_img_link(cards[3][9],faceup(3,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5tenth'] && (
              <button id="tableau5tenth" className={cardClass['tableau5tenth']} style={{ left: "580px", top: "510px" }} onClick={() => move("tableau5tenth")}>
                {get_img_link(cards[4][9],faceup(4,9,face)) ? (
                <img id="t5ten" src={get_img_link(cards[4][9],faceup(4,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6tenth'] && (
              <button id="tableau6tenth" className={cardClass['tableau6tenth']} style={{ left: "720px", top: "510px" }} onClick={() => move("tableau6tenth")}>
                {get_img_link(cards[5][9],faceup(5,9,face)) ? (
                <img id="t6eig" src={get_img_link(cards[5][9],faceup(5,9))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7tenth'] && (
              <button id="tableau7tenth" className={cardClass['tableau7tenth']} style={{ left: "860px", top: "510px" }} onClick={() => move("tableau7tenth")}>
                {get_img_link(cards[6][9],faceup(6,9,face)) ? (
                <img id="t7ten" src={get_img_link(cards[6][9],faceup(6,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1eleventh'] && (
                <button id="tableau1eleventh" className={cardClass['tableau1eleventh']} style={{ left: "20px", top: "530px" }} onClick={() => move("tableau1eleventh")}>
                {get_img_link(cards[0][10],faceup(0,10,face)) ? (
                <img id="t1ele" src={get_img_link(cards[0][10],faceup(0,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2eleventh'] && (
              <button id="tableau2eleventh" className={cardClass['tableau2eleventh']} style={{ left: "160px", top: "530px" }} onClick={() => move("tableau2eleventh")}>
                {get_img_link(cards[1][10],faceup(1,10,face)) ? (
                <img id="t2ele" src={get_img_link(cards[1][10],faceup(1,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3eleventh'] && (
              <button id="tableau3eleventh" className={cardClass['tableau3eleventh']} style={{ left: "300px", top: "530px" }} onClick={() => move("tableau3eleventh")}>
                {get_img_link(cards[2][10],faceup(2,10,face)) ? (
                <img id="t3ele" src={get_img_link(cards[2][10],faceup(2,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4eleventh'] && (
              <button id="tableau4eleventh" className={cardClass['tableau4eleventh']} style={{ left: "440px", top: "530px" }} onClick={() => move("tableau4eleventh")}>
                {get_img_link(cards[3][10],faceup(3,10,face)) ? (
                <img id="t4ele" src={get_img_link(cards[3][10],faceup(3,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5eleventh'] && (
              <button id="tableau5eleventh" className={cardClass['tableau5eleventh']} style={{ left: "580px", top: "530px" }} onClick={() => move("tableau5eleventh")}>
                {get_img_link(cards[4][10],faceup(4,10,face)) ? (
                <img id="t5ele" src={get_img_link(cards[4][10],faceup(4,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6eleventh'] && (
              <button id="tableau6eleventh" className={cardClass['tableau6eleventh']} style={{ left: "720px", top: "530px" }} onClick={() => move("tableau6eleventh")}>
                {get_img_link(cards[5][10],faceup(5,10,face)) ? (
                <img id="t6ele" src={get_img_link(cards[5][10],faceup(5,10))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7eleventh'] && (
              <button id="tableau7eleventh" className={cardClass['tableau7eleventh']}style={{ left: "860px", top: "530px" }} onClick={() => move("tableau7eleventh")}>
                {get_img_link(cards[6][10],faceup(6,10,face)) ? (
                <img id="t7ele" src={get_img_link(cards[6][10],faceup(6,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1twelfth'] && (
              <button id="tableau1twelfth" className={cardClass['tableau1twelfth']} style={{ left: "20px", top: "550px" }} onClick={() => move("tableau1twelfth")}>
                {get_img_link(cards[0][11],faceup(0,11,face)) ? (
                <img id="t1twe" src={get_img_link(cards[0][11],faceup(0,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2twelfth'] && (
              <button id="tableau2twelfth" className={cardClass['tableau2twelfth']} style={{ left: "160px", top: "550px" }} onClick={() => move("tableau2twelfth")}>
                {get_img_link(cards[1][11],faceup(1,11,face)) ? (
                <img id="t2twe" src={get_img_link(cards[1][11],faceup(1,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3twelfth'] && (
              <button id="tableau3twelfth" className={cardClass['tableau3twelfth']} style={{ left: "300px", top: "550px" }} onClick={() => move("tableau3twelfth")}>
                {get_img_link(cards[2][11],faceup(2,11,face)) ? (
                <img id="t3twe" src={get_img_link(cards[2][11],faceup(2,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4twelfth'] && (
              <button id="tableau4twelfth" className={cardClass['tableau4twelfth']} style={{ left: "440px", top: "550px" }} onClick={() => move("tableau4twelfth")}>
                {get_img_link(cards[3][11],faceup(3,11,face)) ? (
                <img id="t4twe" src={get_img_link(cards[3][11],faceup(3,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5twelfth'] && (
              <button id="tableau5twelfth" className={cardClass['tableau5twelfth']} style={{ left: "580px", top: "550px" }} onClick={() => move("tableau5twelfth")}>
                {get_img_link(cards[4][11],faceup(4,11,face)) ? (
                <img id="t5twe" src={get_img_link(cards[4][11],faceup(4,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6twelfth'] && (
              <button id="tableau6twelfth" className={cardClass['tableau6twelfth']} style={{ left: "720px", top: "550px" }} onClick={() => move("tableau6twelfth")}>
                {get_img_link(cards[5][11],faceup(5,11,face)) ? (
                <img id="t6twe" src={get_img_link(cards[5][11],faceup(5,11))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7twelfth'] && (
              <button id="tableau7twelfth" className={cardClass['tableau7twelfth']} style={{ left: "860px", top: "550px" }} onClick={() => move("tableau7twelfth")}>
                {get_img_link(cards[6][11],faceup(6,11,face)) ? (
                <img id="t7twe" src={get_img_link(cards[6][11],faceup(6,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau1thirteenth'] && (
              <button id="tableau1thirteenth" className={cardClass['tableau1thirteenth']} style={{ left: "20px", top: "570px" }} onClick={() => move("tableau1thirteenth")}>
                {get_img_link(cards[0][12],faceup(0,12,face)) ? (
                <img id="t1tht" src={get_img_link(cards[0][12],faceup(0,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau2thirteenth'] && (
              <button id="tableau2thirteenth" className={cardClass['tableau2thirteenth']} style={{ left: "160px", top: "570px" }} onClick={() => move("tableau2thirteenth")}>
                {get_img_link(cards[1][12],faceup(1,12,face)) ? (
                <img id="t2tht" src={get_img_link(cards[1][12],faceup(1,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3thirteenth'] && (
              <button id="tableau3thirteenth" className={cardClass['tableau3thirteenth']} style={{ left: "300px", top: "570px" }} onClick={() => move("tableau3thirteenth")}>
                {get_img_link(cards[2][12],faceup(2,12,face)) ? (
                <img id="t3tht" src={get_img_link(cards[2][12],faceup(2,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4thirteenth'] && (
              <button id="tableau4thirteenth" className={cardClass['tableau4thirteenth']} style={{ left: "440px", top: "570px" }} onClick={() => move("tableau4thirteenth")}>
                {get_img_link(cards[3][12],faceup(3,12,face)) ? (
                <img id="t4tht" src={get_img_link(cards[3][12],faceup(3,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5thirteenth'] && (
              <button id="tableau5thirteenth" className={cardClass['tableau5thirteenth']} style={{ left: "580px", top: "570px" }} onClick={() => move("tableau5thirteenth")}>
                {get_img_link(cards[4][12],faceup(4,12,face)) ? (
                <img id="t5tht" src={get_img_link(cards[4][12],faceup(4,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6thirteenth'] && (
              <button id="tableau6thirteenth" className={cardClass['tableau6thirteenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6thirteenth")}>
                {get_img_link(cards[5][12],faceup(5,12,face)) ? (
                <img id="t6tht" src={get_img_link(cards[5][12],faceup(5,12))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7thirteenth'] && (
              <button id="tableau7thirteenth" className={cardClass['tableau7thirteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7thirteenth")}>
                {get_img_link(cards[6][12],faceup(6,12,face)) ? (
                <img id="t7tht" src={get_img_link(cards[6][12],faceup(6,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau2fourteenth'] && (
              <button id="tableau2fourteenth" className={cardClass['tableau2fourteenth']} style={{ left: "160px", top: "570px" }} onClick={() => move("tableau2fourteenth")}>
                {get_img_link(cards[1][13],faceup(1,13,face)) ? (
                <img id="t2frt" src={get_img_link(cards[1][13],faceup(1,13,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau3fourteenth'] && (
              <button id="tableau3fourteenth" className={cardClass['tableau3fourteenth']} style={{ left: "300px", top: "570px" }} onClick={() => move("tableau3fourteenth")}>
                {get_img_link(cards[2][13],faceup(2,13,face)) ? (
                <img id="t3frt" src={get_img_link(cards[2][13],faceup(2,13,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4fourteenth'] && (
              <button id="tableau4fourteenth" className={cardClass['tableau4fourteenth']} style={{ left: "440px", top: "570px" }} onClick={() => move("tableau4fourteenth")}>
                {get_img_link(cards[3][13],faceup(3,13,face)) ? (
                <img id="t4frt" src={get_img_link(cards[3][13],faceup(3,13,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5fourteenth'] && (
              <button id="tableau5fourteenth" className={cardClass['tableau5fourteenth']} style={{ left: "580px", top: "570px" }} onClick={() => move("tableau5fourteenth")}>
                {get_img_link(cards[4][13],faceup(4,13,face)) ? (
                <img id="t5frt" src={get_img_link(cards[4][13],faceup(4,13,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6fourteenth'] && (
              <button id="tableau6fourteenth" className={cardClass['tableau6fourteenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6fourteenth")}>
                {get_img_link(cards[5][13],faceup(5,13,face)) ? (
                <img id="t6frt" src={get_img_link(cards[5][13],faceup(5,13))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7fourteenth'] && (
              <button id="tableau7fourteenth" className={cardClass['tableau7fourteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7fourteenth")}>
                {get_img_link(cards[6][13],faceup(6,13,face)) ? (
                <img id="t7frt" src={get_img_link(cards[6][13],faceup(6,13,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau3fifteenth'] && (
              <button id="tableau3fifteenth" className={cardClass['tableau3fifteenth']} style={{ left: "300px", top: "570px" }} onClick={() => move("tableau3fifteenth")}>
                {get_img_link(cards[2][14],faceup(2,14,face)) ? (
                <img id="t3fft" src={get_img_link(cards[2][14],faceup(2,14,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau4fifteenth'] && (
              <button id="tableau4fifteenth" className={cardClass['tableau4fifteenth']} style={{ left: "440px", top: "570px" }} onClick={() => move("tableau4fifteenth")}>
                {get_img_link(cards[3][14],faceup(3,14,face)) ? (
                <img id="t4fft" src={get_img_link(cards[3][14],faceup(3,14,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5fifteenth'] && (
              <button id="tableau5fourteenth" className={cardClass['tableau5fifteenth']} style={{ left: "580px", top: "570px" }} onClick={() => move("tableau5fifteenth")}>
                {get_img_link(cards[4][14],faceup(4,14,face)) ? (
                <img id="t5fft" src={get_img_link(cards[4][14],faceup(4,14,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6fifteenth'] && (
              <button id="tableau6fifteenth" className={cardClass['tableau6fifteenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6fifteenth")}>
                {get_img_link(cards[5][14],faceup(5,14,face)) ? (
                <img id="t6fft" src={get_img_link(cards[5][14],faceup(5,14))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7fifteenth'] && (
              <button id="tableau7fifteenth" className={cardClass['tableau7fifteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7fifteenth")}>
                {get_img_link(cards[6][14],faceup(6,14,face)) ? (
                <img id="t7fft" src={get_img_link(cards[6][14],faceup(6,14,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau4sixteenth'] && (
              <button id="tableau4sixteenth" className={cardClass['tableau4sixteenth']} style={{ left: "440px", top: "570px" }} onClick={() => move("tableau4sixteenth")}>
                {get_img_link(cards[3][15],faceup(3,15,face)) ? (
                <img id="t4sxt" src={get_img_link(cards[3][15],faceup(3,15,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau5sixteenth'] && (
              <button id="tableau5sixteenth" className={cardClass['tableau5sixteenth']} style={{ left: "580px", top: "570px" }} onClick={() => move("tableau5sixteenth")}>
                {get_img_link(cards[4][15],faceup(4,15,face)) ? (
                <img id="t5sxt" src={get_img_link(cards[4][15],faceup(4,15,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6sixteenth'] && (
              <button id="tableau6sixteenth" className={cardClass['tableau6sixteenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6sixteenth")}>
                {get_img_link(cards[5][15],faceup(5,15,face)) ? (
                <img id="t6sxt" src={get_img_link(cards[5][15],faceup(5,15))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7sixteenth'] && (
              <button id="tableau7sixteenth" className={cardClass['tableau7sixteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7sixteenth")}>
                {get_img_link(cards[6][15],faceup(6,15,face)) ? (
                <img id="t7sxt" src={get_img_link(cards[6][15],faceup(6,15,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau5seventeenth'] && (
              <button id="tableau5seventeenth" className={cardClass['tableau5seventeenth']} style={{ left: "580px", top: "570px" }} onClick={() => move("tableau5seventeenth")}>
                {get_img_link(cards[4][16],faceup(4,16,face)) ? (
                <img id="t5svt" src={get_img_link(cards[4][16],faceup(4,16,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau6seventeenth'] && (
              <button id="tableau6seventeenth" className={cardClass['tableau6seventeenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6seventeenth")}>
                {get_img_link(cards[5][16],faceup(5,16,face)) ? (
                <img id="t6svt" src={get_img_link(cards[5][16],faceup(5,16))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7seventeenth'] && (
              <button id="tableau7seventeenth" className={cardClass['tableau7seventeenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7seventeenth")}>
                {get_img_link(cards[6][16],faceup(6,16,face)) ? (
                <img id="t7svt" src={get_img_link(cards[6][16],faceup(6,16,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau6eighteenth'] && (
              <button id="tableau6eighteenth" className={cardClass['tableau6eighteenth']} style={{ left: "720px", top: "570px" }} onClick={() => move("tableau6eighteenth")}>
                {get_img_link(cards[5][17],faceup(5,17,face)) ? (
                <img id="t6egt" src={get_img_link(cards[5][17],faceup(5,17))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
            {visibility['tableau7eighteenth'] && (
              <button id="tableau7eighteenth" className={cardClass['tableau7eighteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7eighteenth")}>
                {get_img_link(cards[6][17],faceup(6,17,face)) ? (
                <img id="t7egt" src={get_img_link(cards[6][17],faceup(6,17,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            {visibility['tableau7nineteenth'] && (
              <button id="tableaunineteenth" className={cardClass['tableau7nineteenth']} style={{ left: "860px", top: "570px" }} onClick={() => move("tableau7nineteenth")}>
                {get_img_link(cards[6][18],faceup(6,18,face)) ? (
                <img id="t7nnt" src={get_img_link(cards[6][18],faceup(6,18,face))} alt="card" style={{ width: "120px", height: "168px" }} />
                ) : null }
              </button>
            )}
          </div>
        </div>
        <button id="placeholder" className="button2" style={{ left: "20px", top: "750px" }}></button>
        <button id="reset" className="button1" style={{ left: "20px", top: "20px" }} onClick={() => restart()}>reset</button>
        <button id="toggleDifficulty" className="button1" style={{ left: "100px", top: "20px" }} onClick={() => toggleDifficulty()}>
          {hardMode ? (
            "go to easy mode"
          ) : "go to hard mode" }
        </button>
        <button id="autosolve" className="button1" style={{ left: "300px", top: "20px" }} onClick={() => autoSolve()}>autosolve</button>
        <div>
          <button className="button1" style={{ left: "800px", top: "20px" }}> Time: {getTime()}</button>
        </div>
      </>
    );
}

/* things I still need to add
  - iron out bugs
  - fix sizing (particularly of the newly added tableau slots)
  - theres a bug with faceup tableau 6 ninth???? idk, fixed by going around the issue, not happy
  - deal with invalid second click alert
*/