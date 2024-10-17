import { useState } from 'react';
import { Deck } from "./deck.js"

// function draw() {
//   if (drawpile.length == 0) {
//     drawpile = discard.slice(); // can i do this???
//     discard.length = 0;
//   }
//   let num_drawn = 0;
//   while (drawpile.length != 0 && num_drawn < 3) {
//     discard.push(drawpile.shift());
//     console.log(discard[discard.length-1]);
//     num_drawn++;
//   }
//   console.log("test ", drawpile.length, discard.length);
// }

export default function Board() { // board inspired by tic tac toe tutorial
  const [cards, setCards] = useState(Array.from({length: 7},()=> Array.from({length: 13}, () => null)));
  const [face, setFace] = useState(Array.from({length: 7},()=> Array.from({length: 13}, () => null)));
  const [piles, setPiles] = useState(Array.from({length: 4},()=> Array.from({length: 13}, () => null)));
  const [clickable, setClickable] = useState(Array.from({length: 7},()=> Array.from({length: 14}, () => null)));
  const [start, setStart] = useState(true);
  const [drawpile, setDrawpile] = useState([]);
  const [discard, setDiscard] = useState([]);
  var deck = new Deck;
    if (start) { // shuffle and deal
      let newClickable = Array.from({length: 8},()=> Array.from({length: 13}, () => null));
      deck.shuffle();
      let newCardValue = deal();
      setCards(newCardValue);
      let newFace = Array.from({length: 7},()=> Array.from({length: 13}, () => null));
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
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 13; j++) {
          if (j == i + 1) {
            newClickable[i][j] = true;
          }
          else {
            newClickable[i][j] = false;
          }
        }
      }
      setClickable(newClickable);
      setStart(false);
    }

    function deal() {
      let newCards = Array.from({length: 7},()=> Array.from({length: 13}, () => null));
      let dealt = Array.from({length: 7},()=> Array.from({length: 13}, () => null)); // fix this so that we only keep this and not the other 
      
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < i + 1; j++) {
          //console.log(deck.m_size);
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
      return face[i][j];
    }

    function dp_is_empty() {
      if (drawpile.length > 0) {
        return false;
      }
      return null;
    }

    function get_discard(i) {
      if (discard.length == 0) {
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

    function get_type(x = -1, y = -1) {
      if ((x == -1 && y == -1) || (x != -1 && y != -1 && clickable[x][y])) {
        return "card2";
      }
      return "card";
    }

    function restart() {
      setCards(Array.from({length: 7},()=> Array.from({length: 13}, () => null)));
      drawpile.reset();
      setFace(Array.from({length: 7},()=> Array.from({length: 13}, () => null)));
      setPiles(Array.from({length: 4},()=> Array.from({length: 13}, () => null)));
      setStart(true);
    }

    document.onkeydown = (e) => { // control what happens when keys are hit
      let dir;
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        console.log("up pressed");
        dir = UP;
      } 
      else if (e.code === "ArrowDown" || e.code === "KeyS") {
        console.log("down pressed");
        dir = DOWN;
      } 
      else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        console.log("left pressed");
        dir = LEFT;
      } 
      else if (e.code === "ArrowRight" || e.code === "KeyD") {
        console.log("right pressed");
        dir = RIGHT;
      }
      else {
        return;
      }
    };

    function draw() {
      let new_discard = discard.slice();
      let new_drawpile = drawpile.slice();
      if (new_drawpile.length == 0) {
        setDrawpile(new_discard); // can i do this???
        setDiscard(new_drawpile);
        return;
      }
      let num_drawn = 0;
      while (new_drawpile.length != 0 && num_drawn < 3) {
        new_discard.push(new_drawpile.shift());
        num_drawn++;
      }
      setDrawpile(new_drawpile);
      setDiscard(new_discard);
    }
  
    return ( // return the board object
      <>
        <div className="center-screen">
          <div className="board-row">
            <button id="stockpile" className={get_type()} style={{ left: "20px", top: "140px" }} onClick={() => draw()}>
              {get_img_link(null, dp_is_empty(), true) ? (
              <img id="sp" src={get_img_link(null, dp_is_empty(), true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard3" className={get_type(0,0)} style={{ left: "160px", top: "140px" }}>
              {get_img_link(get_discard(3), true, true) ? (
              <img id="disc3" src={get_img_link(get_discard(3), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard2" className={get_type(1,0)} style={{ left: "180px", top: "140px" }}>
              {get_img_link(get_discard(2), true, false) ? (
              <img id="disc2" src={get_img_link(get_discard(2), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard1" className={get_type(2,0)} style={{ left: "200px", top: "140px" }}>
              {get_img_link(get_discard(1), true, false) ? (
              <img id="disc1" src={get_img_link(get_discard(1), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation1" className={get_type(3,0)} style={{ left: "440px", top: "140px" }}>
              {get_img_link(piles[0][0],true, true) ? (
              <img id="found1" src={get_img_link(piles[0][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation2" className={get_type(4,0)} style={{ left: "580px", top: "140px" }}>
              {get_img_link(piles[1][0],true, true) ? (
              <img id="found2" src={get_img_link(piles[1][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation3" className={get_type(5,0)} style={{ left: "720px", top: "140px" }}>
              {get_img_link(piles[2][0],true, true) ? (
              <img id="found3" src={get_img_link(piles[2][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation4" className={get_type(6,0)} style={{ left: "860px", top: "140px" }}>
              {get_img_link(piles[3][0],true, true) ? (
              <img id="found4" src={get_img_link(piles[3][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1bottom" className={get_type(0,1)} style={{ left: "20px", top: "330px" }}>
              {get_img_link(cards[0][0],faceup(0,0,face)) ? (
              <img id="t1b" src={get_img_link(cards[0][0],faceup(0,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2bottom" className={get_type(1,1)} style={{ left: "160px", top: "330px" }}>
              {get_img_link(cards[1][0],faceup(1,0,face)) ? (
              <img id="t2b" src={get_img_link(cards[1][0],faceup(1,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3bottom" className={get_type(2,1)} style={{ left: "300px", top: "330px" }}>
              {get_img_link(cards[2][0],faceup(2,0,face)) ? (
              <img id="t3b" src={get_img_link(cards[2][0],faceup(2,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4bottom" className={get_type(3,1)} style={{ left: "440px", top: "330px" }}>
              {get_img_link(cards[3][0],faceup(3,0,face)) ? (
              <img id="t4b" src={get_img_link(cards[3][0],faceup(3,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5bottom" className={get_type(4,1)} style={{ left: "580px", top: "330px" }}>
              {get_img_link(cards[4][0],faceup(4,0,face)) ? (
              <img id="t5b" src={get_img_link(cards[4][0],faceup(4,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6bottom" className={get_type(5,1)} style={{ left: "720px", top: "330px" }}>
              {get_img_link(cards[5][0],faceup(5,0,face)) ? (
              <img id="t6b" src={get_img_link(cards[5][0],faceup(5,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7bottom" className={get_type(6,1)} style={{ left: "860px", top: "330px" }}>
              {get_img_link(cards[6][0],faceup(6,0,face)) ? (
              <img id="t7b" src={get_img_link(cards[6][0],faceup(6,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1second" className={get_type(0,2)} style={{ left: "20px", top: "350px" }}>
              {get_img_link(cards[0][1],faceup(0,1,face)) ? (
              <img id="t1sec" src={get_img_link(cards[0][1],faceup(0,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2second" className={get_type(1,2)} style={{ left: "160px", top: "350px" }}>
              {get_img_link(cards[1][1],faceup(1,1,face)) ? (
              <img id="t2sec" src={get_img_link(cards[1][1],faceup(1,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3second" className={get_type(2,2)} style={{ left: "300px", top: "350px" }}>
              {get_img_link(cards[2][1],faceup(2,1,face)) ? (
              <img id="t3sec" src={get_img_link(cards[2][1],faceup(2,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4second" className={get_type(3,2)} style={{ left: "440px", top: "350px" }}>
              {get_img_link(cards[3][1],faceup(3,1,face)) ? (
              <img id="t4sec" src={get_img_link(cards[3][1],faceup(3,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5second" className={get_type(4,2)} style={{ left: "580px", top: "350px" }}>
              {get_img_link(cards[4][1],faceup(4,1,face)) ? (
              <img id="t5sec" src={get_img_link(cards[4][1],faceup(4,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6second" className={get_type(5,2)} style={{ left: "720px", top: "350px" }}>
              {get_img_link(cards[5][1],faceup(5,1,face)) ? (
              <img id="t6sec" src={get_img_link(cards[5][1],faceup(5,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7second" className={get_type(6,2)} style={{ left: "860px", top: "350px" }}>
              {get_img_link(cards[6][1],faceup(6,1,face)) ? (
              <img id="t7sec" src={get_img_link(cards[6][1],faceup(6,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1third" className={get_type(0,3)} style={{ left: "20px", top: "370px" }}>
              {get_img_link(cards[0][2],faceup(0,2,face)) ? (
              <img id="t1thi" src={get_img_link(cards[0][2],faceup(0,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2third" className={get_type(1,3)} style={{ left: "160px", top: "370px" }}>
              {get_img_link(cards[1][2],faceup(1,2,face)) ? (
              <img id="t2thi" src={get_img_link(cards[1][2],faceup(1,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3third" className={get_type(2,3)} style={{ left: "300px", top: "370px" }}>
              {get_img_link(cards[2][2],faceup(2,2,face)) ? (
              <img id="t3thi" src={get_img_link(cards[2][2],faceup(2,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4third" className={get_type(3,3)} style={{ left: "440px", top: "370px" }}>
              {get_img_link(cards[3][2],faceup(3,2,face)) ? (
              <img id="t4thi" src={get_img_link(cards[3][2],faceup(3,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5third" className={get_type(4,3)} style={{ left: "580px", top: "370px" }}>
              {get_img_link(cards[4][2],faceup(4,2,face)) ? (
              <img id="t5thi" src={get_img_link(cards[4][2],faceup(4,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6third" className={get_type(5,3)} style={{ left: "720px", top: "370px" }}>
              {get_img_link(cards[5][2],faceup(5,2,face)) ? (
              <img id="t6thi" src={get_img_link(cards[5][2],faceup(5,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7third" className={get_type(6,3)} style={{ left: "860px", top: "370px" }}>
              {get_img_link(cards[6][2],faceup(6,2,face)) ? (
              <img id="t7thi" src={get_img_link(cards[6][2],faceup(6,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1fourth" className={get_type(0,4)} style={{ left: "20px", top: "390px" }}>
              {get_img_link(cards[0][3],faceup(0,3,face)) ? (
              <img id="t1fou" src={get_img_link(cards[0][3],faceup(0,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2fourth" className={get_type(1,4)} style={{ left: "160px", top: "390px" }}>
              {get_img_link(cards[1][3],faceup(1,3,face)) ? (
              <img id="t2fou" src={get_img_link(cards[1][3],faceup(1,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3fourth" className={get_type(2,4)} style={{ left: "300px", top: "390px" }}>
              {get_img_link(cards[2][3],faceup(2,3,face)) ? (
              <img id="t3fou" src={get_img_link(cards[2][3],faceup(2,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4fourth" className={get_type(3,4)} style={{ left: "440px", top: "390px" }}>
              {get_img_link(cards[3][3],faceup(3,3,face)) ? (
              <img id="t4fou" src={get_img_link(cards[3][3],faceup(3,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5fourth" className={get_type(4,4)} style={{ left: "580px", top: "390px" }}>
              {get_img_link(cards[4][3],faceup(4,3,face)) ? (
              <img id="t5fou" src={get_img_link(cards[4][3],faceup(4,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6fourth" className={get_type(5,4)} style={{ left: "720px", top: "390px" }}>
              {get_img_link(cards[5][3],faceup(5,3,face)) ? (
              <img id="t6fou" src={get_img_link(cards[5][3],faceup(5,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7fourth" className={get_type(6,4)} style={{ left: "860px", top: "390px" }}>
              {get_img_link(cards[6][3],faceup(6,3,face)) ? (
              <img id="t7fou" src={get_img_link(cards[6][3],faceup(6,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1fifth" className={get_type(0,5)} style={{ left: "20px", top: "410px" }}>
              {get_img_link(cards[0][4],faceup(0,4,face)) ? (
              <img id="t1fif" src={get_img_link(cards[0][4],faceup(0,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2fifth" className={get_type(1,5)} style={{ left: "160px", top: "410px" }}>
              {get_img_link(cards[1][4],faceup(1,4,face)) ? (
              <img id="t2fif" src={get_img_link(cards[1][4],faceup(1,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3fifth" className={get_type(2,5)} style={{ left: "300px", top: "410px" }}>
              {get_img_link(cards[2][4],faceup(2,4,face)) ? (
              <img id="t3fif" src={get_img_link(cards[2][4],faceup(2,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4fifth" className={get_type(3,5)} style={{ left: "440px", top: "410px" }}>
              {get_img_link(cards[3][4],faceup(3,4,face)) ? (
              <img id="t4fif" src={get_img_link(cards[3][4],faceup(3,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5fifth" className={get_type(4,5)} style={{ left: "580px", top: "410px" }}>
              {get_img_link(cards[4][4],faceup(4,4,face)) ? (
              <img id="t5fif" src={get_img_link(cards[4][4],faceup(4,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6fifth" className={get_type(5,5)} style={{ left: "720px", top: "410px" }}>
              {get_img_link(cards[5][4],faceup(5,4,face)) ? (
              <img id="t6fif" src={get_img_link(cards[5][4],faceup(5,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7fifth" className={get_type(6,5)} style={{ left: "860px", top: "410px" }}>
              {get_img_link(cards[6][4],faceup(6,4,face)) ? (
              <img id="t7fif" src={get_img_link(cards[6][4],faceup(6,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1sixth" className={get_type(0,6)} style={{ left: "20px", top: "430px" }}>
              {get_img_link(cards[0][5],faceup(0,5,face)) ? (
              <img id="t1six" src={get_img_link(cards[0][5],faceup(0,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2sixth" className={get_type(1,6)} style={{ left: "160px", top: "430px" }}>
              {get_img_link(cards[1][5],faceup(1,5,face)) ? (
              <img id="t2six" src={get_img_link(cards[1][5],faceup(1,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3sixth" className={get_type(2,6)} style={{ left: "300px", top: "430px" }}>
              {get_img_link(cards[2][5],faceup(2,5,face)) ? (
              <img id="t3six" src={get_img_link(cards[2][5],faceup(2,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4sixth" className={get_type(3,6)} style={{ left: "440px", top: "430px" }}>
              {get_img_link(cards[3][5],faceup(3,5,face)) ? (
              <img id="t4six" src={get_img_link(cards[3][5],faceup(3,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5sixth" className={get_type(4,6)} style={{ left: "580px", top: "430px" }}>
              {get_img_link(cards[4][5],faceup(4,5,face)) ? (
              <img id="t5six" src={get_img_link(cards[4][5],faceup(4,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6sixth" className={get_type(5,6)} style={{ left: "720px", top: "430px" }}>
              {get_img_link(cards[5][5],faceup(5,5,face)) ? (
              <img id="t6six" src={get_img_link(cards[5][5],faceup(5,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7sixth" className={get_type(6,6)} style={{ left: "860px", top: "430px" }}>
              {get_img_link(cards[6][5],faceup(6,5,face)) ? (
              <img id="t7six" src={get_img_link(cards[6][5],faceup(6,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1seventh" className={get_type(0,7)} style={{ left: "20px", top: "450px" }}>
              {get_img_link(cards[0][6],faceup(0,6,face)) ? (
              <img id="t1sev" src={get_img_link(cards[0][6],faceup(0,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2seventh" className={get_type(1,7)} style={{ left: "160px", top: "450px" }}>
              {get_img_link(cards[1][6],faceup(1,6,face)) ? (
              <img id="t2sev" src={get_img_link(cards[1][6],faceup(1,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3seventh" className={get_type(2,7)} style={{ left: "300px", top: "450px" }}>
              {get_img_link(cards[2][6],faceup(2,6,face)) ? (
              <img id="t3sev" src={get_img_link(cards[2][6],faceup(2,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4seventh" className={get_type(3,7)} style={{ left: "440px", top: "450px" }}>
              {get_img_link(cards[3][6],faceup(3,6,face)) ? (
              <img id="t4sev" src={get_img_link(cards[3][6],faceup(3,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5seventh" className={get_type(4,7)} style={{ left: "580px", top: "450px" }}>
              {get_img_link(cards[4][6],faceup(4,6,face)) ? (
              <img id="t5sev" src={get_img_link(cards[4][6],faceup(4,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6seventh" className={get_type(5,7)} style={{ left: "720px", top: "450px" }}>
              {get_img_link(cards[5][6],faceup(5,6,face)) ? (
              <img id="t6sev" src={get_img_link(cards[5][6],faceup(5,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7seventh" className={get_type(6,7)} style={{ left: "860px", top: "450px" }}>
              {get_img_link(cards[6][6],faceup(6,6,face)) ? (
              <img id="t7sev" src={get_img_link(cards[6][6],faceup(6,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1eighth" className={get_type(0,8)} style={{ left: "20px", top: "470px" }}>
              {get_img_link(cards[0][7],faceup(0,7,face)) ? (
              <img id="t1eig" src={get_img_link(cards[0][7],faceup(0,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2eighth" className={get_type(1,8)} style={{ left: "160px", top: "470px" }}>
              {get_img_link(cards[1][7],faceup(1,7,face)) ? (
              <img id="t2eig" src={get_img_link(cards[1][7],faceup(1,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3eighth" className={get_type(2,8)} style={{ left: "300px", top: "470px" }}>
              {get_img_link(cards[2][7],faceup(2,7,face)) ? (
              <img id="t3eig" src={get_img_link(cards[2][7],faceup(2,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4eighth" className={get_type(3,8)} style={{ left: "440px", top: "470px" }}>
              {get_img_link(cards[3][7],faceup(3,7,face)) ? (
              <img id="t4eig" src={get_img_link(cards[3][7],faceup(3,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5eighth" className={get_type(4,8)} style={{ left: "580px", top: "470px" }}>
              {get_img_link(cards[4][7],faceup(4,7,face)) ? (
              <img id="t5eig" src={get_img_link(cards[4][7],faceup(4,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6eighth" className={get_type(5,8)} style={{ left: "720px", top: "470px" }}>
              {get_img_link(cards[5][7],faceup(5,7,face)) ? (
              <img id="t6eig" src={get_img_link(cards[5][7],faceup(5,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7eighth" className={get_type(6,8)} style={{ left: "860px", top: "470px" }}>
              {get_img_link(cards[6][7],faceup(6,7,face)) ? (
              <img id="t7eig" src={get_img_link(cards[6][7],faceup(6,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1ninth" className={get_type(0,9)} style={{ left: "20px", top: "490px" }}>
              {get_img_link(cards[0][8],faceup(0,8,face)) ? (
              <img id="t1nin" src={get_img_link(cards[0][8],faceup(0,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2ninth" className={get_type(1,9)} style={{ left: "160px", top: "490px" }}>
              {get_img_link(cards[1][8],faceup(1,8,face)) ? (
              <img id="t2nin" src={get_img_link(cards[1][8],faceup(1,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3ninth" className={get_type(2,9)} style={{ left: "300px", top: "490px" }}>
              {get_img_link(cards[2][8],faceup(2,8,face)) ? (
              <img id="t3nin" src={get_img_link(cards[2][8],faceup(2,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4ninth" className={get_type(3,9)} style={{ left: "440px", top: "490px" }}>
              {get_img_link(cards[3][8],faceup(3,8,face)) ? (
              <img id="t4nin" src={get_img_link(cards[3][8],faceup(3,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5ninth" className={get_type(4,9)} style={{ left: "580px", top: "490px" }}>
              {get_img_link(cards[4][8],faceup(4,8,face)) ? (
              <img id="t5nin" src={get_img_link(cards[4][8],faceup(4,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6ninth" className={get_type(5,9)} style={{ left: "720px", top: "490px" }}>
              {get_img_link(cards[5][8],faceup(5,8,face)) ? (
              <img id="t6nin" src={get_img_link(cards[5][8],faceup(5,8))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7ninth" className={get_type(6,9)} style={{ left: "860px", top: "490px" }}>
              {get_img_link(cards[6][8],faceup(6,8,face)) ? (
              <img id="t7nin" src={get_img_link(cards[6][8],faceup(6,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1tenth" className={get_type(0,10)} style={{ left: "20px", top: "510px" }}>
              {get_img_link(cards[0][9],faceup(0,9,face)) ? (
              <img id="t1ten" src={get_img_link(cards[0][9],faceup(0,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2tenth" className={get_type(1,10)} style={{ left: "160px", top: "510px" }}>
              {get_img_link(cards[1][9],faceup(1,9,face)) ? (
              <img id="t2ten" src={get_img_link(cards[1][9],faceup(1,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3tenth" className={get_type(2,10)} style={{ left: "300px", top: "510px" }}>
              {get_img_link(cards[2][9],faceup(2,9,face)) ? (
              <img id="t3ten" src={get_img_link(cards[2][9],faceup(2,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4tenth" className={get_type(3,10)} style={{ left: "440px", top: "510px" }}>
              {get_img_link(cards[3][9],faceup(3,9,face)) ? (
              <img id="t4ten" src={get_img_link(cards[3][9],faceup(3,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5tenth" className={get_type(4,10)} style={{ left: "580px", top: "510px" }}>
              {get_img_link(cards[4][9],faceup(4,9,face)) ? (
              <img id="t5ten" src={get_img_link(cards[4][9],faceup(4,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6tenth" className={get_type(5,10)} style={{ left: "720px", top: "510px" }}>
              {get_img_link(cards[5][9],faceup(5,9,face)) ? (
              <img id="t6eig" src={get_img_link(cards[5][9],faceup(5,9))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7tenth" className={get_type(6,10)} style={{ left: "860px", top: "510px" }}>
              {get_img_link(cards[6][9],faceup(6,9,face)) ? (
              <img id="t7ten" src={get_img_link(cards[6][9],faceup(6,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1eleventh" className={get_type(0,11)} style={{ left: "20px", top: "530px" }}>
              {get_img_link(cards[0][10],faceup(0,10,face)) ? (
              <img id="t1ele" src={get_img_link(cards[0][10],faceup(0,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2eleventh" className={get_type(1,11)} style={{ left: "160px", top: "530px" }}>
              {get_img_link(cards[1][10],faceup(1,10,face)) ? (
              <img id="t2ele" src={get_img_link(cards[1][10],faceup(1,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3eleventh" className={get_type(2,11)} style={{ left: "300px", top: "530px" }}>
              {get_img_link(cards[2][10],faceup(2,10,face)) ? (
              <img id="t3ele" src={get_img_link(cards[2][10],faceup(2,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4eleventh" className={get_type(3,11)} style={{ left: "440px", top: "530px" }}>
              {get_img_link(cards[3][10],faceup(3,10,face)) ? (
              <img id="t4ele" src={get_img_link(cards[3][10],faceup(3,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5eleventh" className={get_type(4,11)} style={{ left: "580px", top: "530px" }}>
              {get_img_link(cards[4][10],faceup(4,10,face)) ? (
              <img id="t5ele" src={get_img_link(cards[4][10],faceup(4,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6eleventh" className={get_type(5,11)} style={{ left: "720px", top: "530px" }}>
              {get_img_link(cards[5][10],faceup(5,10,face)) ? (
              <img id="t6ele" src={get_img_link(cards[5][10],faceup(5,10))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7eleventh" className={get_type(6,11)}style={{ left: "860px", top: "530px" }}>
              {get_img_link(cards[6][10],faceup(6,10,face)) ? (
              <img id="t7ele" src={get_img_link(cards[6][10],faceup(6,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1twelfth" className={get_type(0,12)} style={{ left: "20px", top: "550px" }}>
              {get_img_link(cards[0][11],faceup(0,11,face)) ? (
              <img id="t1twe" src={get_img_link(cards[0][11],faceup(0,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2twelfth" className={get_type(1,12)} style={{ left: "160px", top: "550px" }}>
              {get_img_link(cards[1][11],faceup(1,11,face)) ? (
              <img id="t2twe" src={get_img_link(cards[1][11],faceup(1,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3twelfth" className={get_type(2,12)} style={{ left: "300px", top: "550px" }}>
              {get_img_link(cards[2][11],faceup(2,11,face)) ? (
              <img id="t3twe" src={get_img_link(cards[2][11],faceup(2,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4twelfth" className={get_type(3,12)} style={{ left: "440px", top: "550px" }}>
              {get_img_link(cards[3][11],faceup(3,11,face)) ? (
              <img id="t4twe" src={get_img_link(cards[3][11],faceup(3,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5twelfth" className={get_type(4,12)} style={{ left: "580px", top: "550px" }}>
              {get_img_link(cards[4][11],faceup(4,11,face)) ? (
              <img id="t5twe" src={get_img_link(cards[4][11],faceup(4,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6twelfth" className={get_type(5,12)} style={{ left: "720px", top: "550px" }}>
              {get_img_link(cards[5][11],faceup(5,11,face)) ? (
              <img id="t6twe" src={get_img_link(cards[5][11],faceup(5,11))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7twelfth" className={get_type(6,12)} style={{ left: "860px", top: "550px" }}>
              {get_img_link(cards[6][11],faceup(6,11,face)) ? (
              <img id="t7twe" src={get_img_link(cards[6][11],faceup(6,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1thirteenth" className={get_type(0,13)} style={{ left: "20px", top: "570px" }}>
              {get_img_link(cards[0][12],faceup(0,12,face)) ? (
              <img id="t1tht" src={get_img_link(cards[0][12],faceup(0,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2thirteenth" className={get_type(1,13)} style={{ left: "160px", top: "570px" }}>
              {get_img_link(cards[1][12],faceup(1,12,face)) ? (
              <img id="t2tht" src={get_img_link(cards[1][12],faceup(1,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3thirteenth" className={get_type(2,13)} style={{ left: "300px", top: "570px" }}>
              {get_img_link(cards[2][12],faceup(2,12,face)) ? (
              <img id="t3tht" src={get_img_link(cards[2][12],faceup(2,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4thirteenth" className={get_type(3,13)} style={{ left: "440px", top: "570px" }}>
              {get_img_link(cards[3][12],faceup(3,12,face)) ? (
              <img id="t4tht" src={get_img_link(cards[3][12],faceup(3,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5thirteenth" className={get_type(4,13)} style={{ left: "580px", top: "570px" }}>
              {get_img_link(cards[4][12],faceup(4,12,face)) ? (
              <img id="t5tht" src={get_img_link(cards[4][12],faceup(4,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6thirteenth" className={get_type(5,13)} style={{ left: "720px", top: "570px" }}>
              {get_img_link(cards[5][12],faceup(5,12,face)) ? (
              <img id="t6tht" src={get_img_link(cards[5][12],faceup(5,12))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7thirteenth" className={get_type(6,13)} style={{ left: "860px", top: "570px" }}>
              {get_img_link(cards[6][12],faceup(6,12,face)) ? (
              <img id="t7tht" src={get_img_link(cards[6][12],faceup(6,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
      </>
    );
}