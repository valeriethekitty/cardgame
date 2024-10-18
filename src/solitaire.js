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
  const [start, setStart] = useState(true);
  const [drawpile, setDrawpile] = useState([]);
  const [discard, setDiscard] = useState([]);
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
  });
  const [firstClick, setFirstClick] = useState(null);
  var deck = new Deck;
    if (start) { // shuffle and deal
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

    function move(id) {
      console.log("test", id);
      if (firstClick == null) {
        console.log("test", id);
        setFirstClick(id);
        document.getElementById(id).setAttribute("className", "card3");
      }

    }
  
    return ( // return the board object
      <>
        <div className="center-screen">
          <div className="board-row">
            <button id="stockpile" className={cardClass['stockpile']} style={{ left: "20px", top: "140px" }} onClick={() => draw()}>
              {get_img_link(null, dp_is_empty(), true) ? (
              <img id="sp" src={get_img_link(null, dp_is_empty(), true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard3" className={cardClass['discard3']} style={{ left: "160px", top: "140px" }} onClick={() => move("discard3")}>
              {get_img_link(get_discard(3), true, true) ? (
              <img id="disc3" src={get_img_link(get_discard(3), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard2" className={cardClass['discard2']} style={{ left: "180px", top: "140px" }} onClick={() => move("discard2")}>
              {get_img_link(get_discard(2), true, false) ? (
              <img id="disc2" src={get_img_link(get_discard(2), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="discard1" className={cardClass['discard1']} style={{ left: "200px", top: "140px" }} onClick={() => move("discard1")}>
              {get_img_link(get_discard(1), true, false) ? (
              <img id="disc1" src={get_img_link(get_discard(1), true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation1" className={cardClass['foundation1']} style={{ left: "440px", top: "140px" }} onClick={() => move("foundation1")}>
              {get_img_link(piles[0][0],true, true) ? (
              <img id="found1" src={get_img_link(piles[0][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation2" className={cardClass['foundation2']} style={{ left: "580px", top: "140px" }} onClick={() => move("foundation2")}>
              {get_img_link(piles[1][0],true, true) ? (
              <img id="found2" src={get_img_link(piles[1][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation3" className={cardClass['foundation3']} style={{ left: "720px", top: "140px" }} onClick={() => move("foundation3")}>
              {get_img_link(piles[2][0],true, true) ? (
              <img id="found3" src={get_img_link(piles[2][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="foundation4" className={cardClass['foundation4']} style={{ left: "860px", top: "140px" }} onClick={() => move("foundation4")}>
              {get_img_link(piles[3][0],true, true) ? (
              <img id="found4" src={get_img_link(piles[3][0],true, true)} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1bottom" className={cardClass['tableau1bottom']} style={{ left: "20px", top: "330px" }} onClick={() => move("tableau1bottom")}>
              {get_img_link(cards[0][0],faceup(0,0,face)) ? (
              <img id="t1b" src={get_img_link(cards[0][0],faceup(0,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2bottom" className={cardClass['tableau2bottom']} style={{ left: "160px", top: "330px" }} onClick={() => move("tableau2bottom")}>
              {get_img_link(cards[1][0],faceup(1,0,face)) ? (
              <img id="t2b" src={get_img_link(cards[1][0],faceup(1,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3bottom" className={cardClass['tableau3bottom']} style={{ left: "300px", top: "330px" }} onClick={() => move("tableau3bottom")}>
              {get_img_link(cards[2][0],faceup(2,0,face)) ? (
              <img id="t3b" src={get_img_link(cards[2][0],faceup(2,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4bottom" className={cardClass['tableau4bottom']} style={{ left: "440px", top: "330px" }} onClick={() => move("tableau4bottom")}>
              {get_img_link(cards[3][0],faceup(3,0,face)) ? (
              <img id="t4b" src={get_img_link(cards[3][0],faceup(3,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5bottom" className={cardClass['tableau5bottom']} style={{ left: "580px", top: "330px" }} onClick={() => move("tableau5bottom")}>
              {get_img_link(cards[4][0],faceup(4,0,face)) ? (
              <img id="t5b" src={get_img_link(cards[4][0],faceup(4,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6bottom" className={cardClass['tableau6bottom']} style={{ left: "720px", top: "330px" }} onClick={() => move("tableau6bottom")}>
              {get_img_link(cards[5][0],faceup(5,0,face)) ? (
              <img id="t6b" src={get_img_link(cards[5][0],faceup(5,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7bottom" className={cardClass['tableau7bottom']} style={{ left: "860px", top: "330px" }} onClick={() => move("tableau7bottom")}>
              {get_img_link(cards[6][0],faceup(6,0,face)) ? (
              <img id="t7b" src={get_img_link(cards[6][0],faceup(6,0,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1second" className={cardClass['tableau1second']} style={{ left: "20px", top: "350px" }} hidden="hidden" onClick={() => move("tableau1second")}>
              {get_img_link(cards[0][1],faceup(0,1,face)) ? (
              <img id="t1sec" src={get_img_link(cards[0][1],faceup(0,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2second" className={cardClass['tableau2second']} style={{ left: "160px", top: "350px" }} onClick={() => move("tableau2second")}>
              {get_img_link(cards[1][1],faceup(1,1,face)) ? (
              <img id="t2sec" src={get_img_link(cards[1][1],faceup(1,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3second" className={cardClass['tableau3second']} style={{ left: "300px", top: "350px" }} onClick={() => move("tableau3second")}>
              {get_img_link(cards[2][1],faceup(2,1,face)) ? (
              <img id="t3sec" src={get_img_link(cards[2][1],faceup(2,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4second" className={cardClass['tableau4second']} style={{ left: "440px", top: "350px" }} onClick={() => move("tableau4second")}>
              {get_img_link(cards[3][1],faceup(3,1,face)) ? (
              <img id="t4sec" src={get_img_link(cards[3][1],faceup(3,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5second" className={cardClass['tableau5second']} style={{ left: "580px", top: "350px" }} onClick={() => move("tableau5second")}>
              {get_img_link(cards[4][1],faceup(4,1,face)) ? (
              <img id="t5sec" src={get_img_link(cards[4][1],faceup(4,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6second" className={cardClass['tableau6second']} style={{ left: "720px", top: "350px" }} onClick={() => move("tableau6second")}>
              {get_img_link(cards[5][1],faceup(5,1,face)) ? (
              <img id="t6sec" src={get_img_link(cards[5][1],faceup(5,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7second" className={cardClass['tableau7second']} style={{ left: "860px", top: "350px" }} onClick={() => move("tableau7second")}>
              {get_img_link(cards[6][1],faceup(6,1,face)) ? (
              <img id="t7sec" src={get_img_link(cards[6][1],faceup(6,1,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1third" className={cardClass['tableau1third']} style={{ left: "20px", top: "370px" }} hidden="hidden" onClick={() => move("tableau1third")}>
              {get_img_link(cards[0][2],faceup(0,2,face)) ? (
              <img id="t1thi" src={get_img_link(cards[0][2],faceup(0,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2third" className={cardClass['tableau2third']} style={{ left: "160px", top: "370px" }} hidden="hidden" onClick={() => move("tableau2third")}>
              {get_img_link(cards[1][2],faceup(1,2,face)) ? (
              <img id="t2thi" src={get_img_link(cards[1][2],faceup(1,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3third" className={cardClass['tableau3third']} style={{ left: "300px", top: "370px" }} onClick={() => move("tableau3third")}>
              {get_img_link(cards[2][2],faceup(2,2,face)) ? (
              <img id="t3thi" src={get_img_link(cards[2][2],faceup(2,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4third" className={cardClass['tableau4third']} style={{ left: "440px", top: "370px" }} onClick={() => move("tableau4third")}>
              {get_img_link(cards[3][2],faceup(3,2,face)) ? (
              <img id="t4thi" src={get_img_link(cards[3][2],faceup(3,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5third" className={cardClass['tableau5third']} style={{ left: "580px", top: "370px" }} onClick={() => move("tableau5third")}>
              {get_img_link(cards[4][2],faceup(4,2,face)) ? (
              <img id="t5thi" src={get_img_link(cards[4][2],faceup(4,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6third" className={cardClass['tableau6third']} style={{ left: "720px", top: "370px" }} onClick={() => move("tableau6third")}>
              {get_img_link(cards[5][2],faceup(5,2,face)) ? (
              <img id="t6thi" src={get_img_link(cards[5][2],faceup(5,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7third" className={cardClass['tableau7third']} style={{ left: "860px", top: "370px" }} onClick={() => move("tableau7third")}>
              {get_img_link(cards[6][2],faceup(6,2,face)) ? (
              <img id="t7thi" src={get_img_link(cards[6][2],faceup(6,2,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1fourth" className={cardClass['tableau1fourth']} style={{ left: "20px", top: "390px" }} hidden="hidden" onClick={() => move("tableau1fourth")}>
              {get_img_link(cards[0][3],faceup(0,3,face)) ? (
              <img id="t1fou" src={get_img_link(cards[0][3],faceup(0,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2fourth" className={cardClass['tableau2fourth']} style={{ left: "160px", top: "390px" }} hidden="hidden" onClick={() => move("tableau2fourth")}>
              {get_img_link(cards[1][3],faceup(1,3,face)) ? (
              <img id="t2fou" src={get_img_link(cards[1][3],faceup(1,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3fourth" className={cardClass['tableau3fourth']} style={{ left: "300px", top: "390px" }} hidden="hidden" onClick={() => move("tableau3fourth")}>
              {get_img_link(cards[2][3],faceup(2,3,face)) ? (
              <img id="t3fou" src={get_img_link(cards[2][3],faceup(2,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4fourth" className={cardClass['tableau4fourth']} style={{ left: "440px", top: "390px" }} onClick={() => move("tableau4fourth")}>
              {get_img_link(cards[3][3],faceup(3,3,face)) ? (
              <img id="t4fou" src={get_img_link(cards[3][3],faceup(3,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5fourth" className={cardClass['tableau5fourth']} style={{ left: "580px", top: "390px" }} onClick={() => move("tableau5fourth")}>
              {get_img_link(cards[4][3],faceup(4,3,face)) ? (
              <img id="t5fou" src={get_img_link(cards[4][3],faceup(4,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6fourth" className={cardClass['tableau6fourth']} style={{ left: "720px", top: "390px" }} onClick={() => move("tableau6fourth")}>
              {get_img_link(cards[5][3],faceup(5,3,face)) ? (
              <img id="t6fou" src={get_img_link(cards[5][3],faceup(5,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7fourth" className={cardClass['tableau7fourth']} style={{ left: "860px", top: "390px" }} onClick={() => move("tableau7fourth")}>
              {get_img_link(cards[6][3],faceup(6,3,face)) ? (
              <img id="t7fou" src={get_img_link(cards[6][3],faceup(6,3,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1fifth" className={cardClass['tableau1fifth']} style={{ left: "20px", top: "410px" }} hidden="hidden" onClick={() => move("tableau1fifth")}>
              {get_img_link(cards[0][4],faceup(0,4,face)) ? (
              <img id="t1fif" src={get_img_link(cards[0][4],faceup(0,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2fifth" className={cardClass['tableau2fifth']} style={{ left: "160px", top: "410px" }} hidden="hidden" onClick={() => move("tableau2fifth")}>
              {get_img_link(cards[1][4],faceup(1,4,face)) ? (
              <img id="t2fif" src={get_img_link(cards[1][4],faceup(1,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3fifth" className={cardClass['tableau3fifth']} style={{ left: "300px", top: "410px" }} hidden="hidden" onClick={() => move("tableau3fifth")}>
              {get_img_link(cards[2][4],faceup(2,4,face)) ? (
              <img id="t3fif" src={get_img_link(cards[2][4],faceup(2,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4fifth" className={cardClass['tableau4fifth']} style={{ left: "440px", top: "410px" }} hidden="hidden" onClick={() => move("tableau4fifth")}>
              {get_img_link(cards[3][4],faceup(3,4,face)) ? (
              <img id="t4fif" src={get_img_link(cards[3][4],faceup(3,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5fifth" className={cardClass['tableau5fifth']} style={{ left: "580px", top: "410px" }} onClick={() => move("tableau5fifth")}>
              {get_img_link(cards[4][4],faceup(4,4,face)) ? (
              <img id="t5fif" src={get_img_link(cards[4][4],faceup(4,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6fifth" className={cardClass['tableau6fifth']} style={{ left: "720px", top: "410px" }} onClick={() => move("tableau6fifth")}>
              {get_img_link(cards[5][4],faceup(5,4,face)) ? (
              <img id="t6fif" src={get_img_link(cards[5][4],faceup(5,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7fifth" className={cardClass['tableau7fifth']} style={{ left: "860px", top: "410px" }} onClick={() => move("tableau7fifth")}>
              {get_img_link(cards[6][4],faceup(6,4,face)) ? (
              <img id="t7fif" src={get_img_link(cards[6][4],faceup(6,4,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1sixth" className={cardClass['tableau1sixth']} style={{ left: "20px", top: "430px" }} hidden="hidden" onClick={() => move("tableau1sixth")}>
              {get_img_link(cards[0][5],faceup(0,5,face)) ? (
              <img id="t1six" src={get_img_link(cards[0][5],faceup(0,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2sixth" className={cardClass['tableau2sixth']} style={{ left: "160px", top: "430px" }} hidden="hidden" onClick={() => move("tableau2sixth")}>
              {get_img_link(cards[1][5],faceup(1,5,face)) ? (
              <img id="t2six" src={get_img_link(cards[1][5],faceup(1,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3sixth" className={cardClass['tableau3sixth']} style={{ left: "300px", top: "430px" }} hidden="hidden" onClick={() => move("tableau3sixth")}>
              {get_img_link(cards[2][5],faceup(2,5,face)) ? (
              <img id="t3six" src={get_img_link(cards[2][5],faceup(2,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4sixth" className={cardClass['tableau4sixth']} style={{ left: "440px", top: "430px" }} hidden="hidden" onClick={() => move("tableau4sixth")}>
              {get_img_link(cards[3][5],faceup(3,5,face)) ? (
              <img id="t4six" src={get_img_link(cards[3][5],faceup(3,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5sixth" className={cardClass['tableau5sixth']} style={{ left: "580px", top: "430px" }} hidden="hidden" onClick={() => move("tableau5sixth")}>
              {get_img_link(cards[4][5],faceup(4,5,face)) ? (
              <img id="t5six" src={get_img_link(cards[4][5],faceup(4,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6sixth" className={cardClass['tableau6sixth']} style={{ left: "720px", top: "430px" }} onClick={() => move("tableau6sixth")}>
              {get_img_link(cards[5][5],faceup(5,5,face)) ? (
              <img id="t6six" src={get_img_link(cards[5][5],faceup(5,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7sixth" className={cardClass['tableau7sixth']} style={{ left: "860px", top: "430px" }} onClick={() => move("tableau7sixth")}>
              {get_img_link(cards[6][5],faceup(6,5,face)) ? (
              <img id="t7six" src={get_img_link(cards[6][5],faceup(6,5,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1seventh" className={cardClass['tableau1seventh']} style={{ left: "20px", top: "450px" }} hidden="hidden" onClick={() => move("tableau1seventh")}>
              {get_img_link(cards[0][6],faceup(0,6,face)) ? (
              <img id="t1sev" src={get_img_link(cards[0][6],faceup(0,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2seventh" className={cardClass['tableau2seventh']} style={{ left: "160px", top: "450px" }} hidden="hidden" onClick={() => move("tableau2seventh")}>
              {get_img_link(cards[1][6],faceup(1,6,face)) ? (
              <img id="t2sev" src={get_img_link(cards[1][6],faceup(1,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3seventh" className={cardClass['tableau3seventh']} style={{ left: "300px", top: "450px" }} hidden="hidden" onClick={() => move("tableau3seventh")}>
              {get_img_link(cards[2][6],faceup(2,6,face)) ? (
              <img id="t3sev" src={get_img_link(cards[2][6],faceup(2,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4seventh" className={cardClass['tableau4seventh']} style={{ left: "440px", top: "450px" }} hidden="hidden" onClick={() => move("tableau4seventh")}>
              {get_img_link(cards[3][6],faceup(3,6,face)) ? (
              <img id="t4sev" src={get_img_link(cards[3][6],faceup(3,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5seventh" className={cardClass['tableau5seventh']} style={{ left: "580px", top: "450px" }} hidden="hidden" onClick={() => move("tableau5seventh")}>
              {get_img_link(cards[4][6],faceup(4,6,face)) ? (
              <img id="t5sev" src={get_img_link(cards[4][6],faceup(4,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6seventh" className={cardClass['tableau6seventh']} style={{ left: "720px", top: "450px" }} hidden="hidden" onClick={() => move("tableau6seventh")}>
              {get_img_link(cards[5][6],faceup(5,6,face)) ? (
              <img id="t6sev" src={get_img_link(cards[5][6],faceup(5,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7seventh" className={cardClass['tableau7seventh']} style={{ left: "860px", top: "450px" }} onClick={() => move("tableau7seventh")}>
              {get_img_link(cards[6][6],faceup(6,6,face)) ? (
              <img id="t7sev" src={get_img_link(cards[6][6],faceup(6,6,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1eighth" className={cardClass['tableau1eighth']} style={{ left: "20px", top: "470px" }} hidden="hidden" onClick={() => move("tableau1eighth")}>
              {get_img_link(cards[0][7],faceup(0,7,face)) ? (
              <img id="t1eig" src={get_img_link(cards[0][7],faceup(0,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2eighth" className={cardClass['tableau2eighth']} style={{ left: "160px", top: "470px" }} hidden="hidden" onClick={() => move("tableau2eighth")}>
              {get_img_link(cards[1][7],faceup(1,7,face)) ? (
              <img id="t2eig" src={get_img_link(cards[1][7],faceup(1,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3eighth" className={cardClass['tableau3eighth']} style={{ left: "300px", top: "470px" }} hidden="hidden" onClick={() => move("tableau3eighth")}>
              {get_img_link(cards[2][7],faceup(2,7,face)) ? (
              <img id="t3eig" src={get_img_link(cards[2][7],faceup(2,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4eighth" className={cardClass['tableau4eighth']} style={{ left: "440px", top: "470px" }} hidden="hidden" onClick={() => move("tableau4eighth")}>
              {get_img_link(cards[3][7],faceup(3,7,face)) ? (
              <img id="t4eig" src={get_img_link(cards[3][7],faceup(3,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5eighth" className={cardClass['tableau5eighth']} style={{ left: "580px", top: "470px" }} hidden="hidden" onClick={() => move("tableau5eighth")}>
              {get_img_link(cards[4][7],faceup(4,7,face)) ? (
              <img id="t5eig" src={get_img_link(cards[4][7],faceup(4,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6eighth" className={cardClass['tableau6eighth']} style={{ left: "720px", top: "470px" }} hidden="hidden" onClick={() => move("tableau6eighth")}>
              {get_img_link(cards[5][7],faceup(5,7,face)) ? (
              <img id="t6eig" src={get_img_link(cards[5][7],faceup(5,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7eighth" className={cardClass['tableau7eighth']} style={{ left: "860px", top: "470px" }} hidden="hidden" onClick={() => move("tableau7eighth")}>
              {get_img_link(cards[6][7],faceup(6,7,face)) ? (
              <img id="t7eig" src={get_img_link(cards[6][7],faceup(6,7,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1ninth" className={cardClass['tableau1ninth']} style={{ left: "20px", top: "490px" }} hidden="hidden" onClick={() => move("tableau1ninth")}>
              {get_img_link(cards[0][8],faceup(0,8,face)) ? (
              <img id="t1nin" src={get_img_link(cards[0][8],faceup(0,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2ninth" className={cardClass['tableau2ninth']} style={{ left: "160px", top: "490px" }} hidden="hidden" onClick={() => move("tableau2ninth")}>
              {get_img_link(cards[1][8],faceup(1,8,face)) ? (
              <img id="t2nin" src={get_img_link(cards[1][8],faceup(1,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3ninth" className={cardClass['tableau3ninth']} style={{ left: "300px", top: "490px" }} hidden="hidden" onClick={() => move("tableau3ninth")}>
              {get_img_link(cards[2][8],faceup(2,8,face)) ? (
              <img id="t3nin" src={get_img_link(cards[2][8],faceup(2,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4ninth" className={cardClass['tableau4ninth']} style={{ left: "440px", top: "490px" }} hidden="hidden" onClick={() => move("tableau4ninth")}>
              {get_img_link(cards[3][8],faceup(3,8,face)) ? (
              <img id="t4nin" src={get_img_link(cards[3][8],faceup(3,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5ninth" className={cardClass['tableau5ninth']} style={{ left: "580px", top: "490px" }} hidden="hidden" onClick={() => move("tableau5ninth")}>
              {get_img_link(cards[4][8],faceup(4,8,face)) ? (
              <img id="t5nin" src={get_img_link(cards[4][8],faceup(4,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6ninth" className={cardClass['tableau6ninth']} style={{ left: "720px", top: "490px" }} hidden="hidden" onClick={() => move("tableau6ninth")}>
              {get_img_link(cards[5][8],faceup(5,8,face)) ? (
              <img id="t6nin" src={get_img_link(cards[5][8],faceup(5,8))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7ninth" className={cardClass['tableau7ninth']} style={{ left: "860px", top: "490px" }} hidden="hidden" onClick={() => move("tableau7ninth")}>
              {get_img_link(cards[6][8],faceup(6,8,face)) ? (
              <img id="t7nin" src={get_img_link(cards[6][8],faceup(6,8,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1tenth" className={cardClass['tableau1tenth']} style={{ left: "20px", top: "510px" }} hidden="hidden" onClick={() => move("tableau1tenth")}>
              {get_img_link(cards[0][9],faceup(0,9,face)) ? (
              <img id="t1ten" src={get_img_link(cards[0][9],faceup(0,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2tenth" className={cardClass['tableau2tenth']} style={{ left: "160px", top: "510px" }} hidden="hidden" onClick={() => move("tableau2tenth")}>
              {get_img_link(cards[1][9],faceup(1,9,face)) ? (
              <img id="t2ten" src={get_img_link(cards[1][9],faceup(1,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3tenth" className={cardClass['tableau3tenth']} style={{ left: "300px", top: "510px" }} hidden="hidden" onClick={() => move("tableau3tenth")}>
              {get_img_link(cards[2][9],faceup(2,9,face)) ? (
              <img id="t3ten" src={get_img_link(cards[2][9],faceup(2,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4tenth" className={cardClass['tableau4tenth']} style={{ left: "440px", top: "510px" }} hidden="hidden" onClick={() => move("tableau4tenth")}>
              {get_img_link(cards[3][9],faceup(3,9,face)) ? (
              <img id="t4ten" src={get_img_link(cards[3][9],faceup(3,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5tenth" className={cardClass['tableau5tenth']} style={{ left: "580px", top: "510px" }} hidden="hidden" onClick={() => move("tableau5tenth")}>
              {get_img_link(cards[4][9],faceup(4,9,face)) ? (
              <img id="t5ten" src={get_img_link(cards[4][9],faceup(4,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6tenth" className={cardClass['tableau6tenth']} style={{ left: "720px", top: "510px" }} hidden="hidden" onClick={() => move("tableau6tenth")}>
              {get_img_link(cards[5][9],faceup(5,9,face)) ? (
              <img id="t6eig" src={get_img_link(cards[5][9],faceup(5,9))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7tenth" className={cardClass['tableau7tenth']} style={{ left: "860px", top: "510px" }} hidden="hidden" onClick={() => move("tableau7tenth")}>
              {get_img_link(cards[6][9],faceup(6,9,face)) ? (
              <img id="t7ten" src={get_img_link(cards[6][9],faceup(6,9,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1eleventh" className={cardClass['tableau1eleventh']} style={{ left: "20px", top: "530px" }} hidden="hidden" onClick={() => move("tableau1eleventh")}>
              {get_img_link(cards[0][10],faceup(0,10,face)) ? (
              <img id="t1ele" src={get_img_link(cards[0][10],faceup(0,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2eleventh" className={cardClass['tableau2eleventh']} style={{ left: "160px", top: "530px" }} hidden="hidden" onClick={() => move("tableau2eleventh")}>
              {get_img_link(cards[1][10],faceup(1,10,face)) ? (
              <img id="t2ele" src={get_img_link(cards[1][10],faceup(1,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3eleventh" className={cardClass['tableau3eleventh']} style={{ left: "300px", top: "530px" }} hidden="hidden" onClick={() => move("tableau3eleventh")}>
              {get_img_link(cards[2][10],faceup(2,10,face)) ? (
              <img id="t3ele" src={get_img_link(cards[2][10],faceup(2,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4eleventh" className={cardClass['tableau4eleventh']} style={{ left: "440px", top: "530px" }} hidden="hidden" onClick={() => move("tableau4eleventh")}>
              {get_img_link(cards[3][10],faceup(3,10,face)) ? (
              <img id="t4ele" src={get_img_link(cards[3][10],faceup(3,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5eleventh" className={cardClass['tableau5eleventh']} style={{ left: "580px", top: "530px" }} hidden="hidden" onClick={() => move("tableau5eleventh")}>
              {get_img_link(cards[4][10],faceup(4,10,face)) ? (
              <img id="t5ele" src={get_img_link(cards[4][10],faceup(4,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6eleventh" className={cardClass['tableau6eleventh']} style={{ left: "720px", top: "530px" }} hidden="hidden" onClick={() => move("tableau6eleventh")}>
              {get_img_link(cards[5][10],faceup(5,10,face)) ? (
              <img id="t6ele" src={get_img_link(cards[5][10],faceup(5,10))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7eleventh" className={cardClass['tableau7eleventh']}style={{ left: "860px", top: "530px" }} hidden="hidden" onClick={() => move("tableau7eleventh")}>
              {get_img_link(cards[6][10],faceup(6,10,face)) ? (
              <img id="t7ele" src={get_img_link(cards[6][10],faceup(6,10,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1twelfth" className={cardClass['tableau1twelfth']} style={{ left: "20px", top: "550px" }} hidden="hidden" onClick={() => move("tableau1twelfth")}>
              {get_img_link(cards[0][11],faceup(0,11,face)) ? (
              <img id="t1twe" src={get_img_link(cards[0][11],faceup(0,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2twelfth" className={cardClass['tableau2twelfth']} style={{ left: "160px", top: "550px" }} hidden="hidden" onClick={() => move("tableau2twelfth")}>
              {get_img_link(cards[1][11],faceup(1,11,face)) ? (
              <img id="t2twe" src={get_img_link(cards[1][11],faceup(1,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3twelfth" className={cardClass['tableau3twelfth']} style={{ left: "300px", top: "550px" }} hidden="hidden" onClick={() => move("tableau3twelfth")}>
              {get_img_link(cards[2][11],faceup(2,11,face)) ? (
              <img id="t3twe" src={get_img_link(cards[2][11],faceup(2,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4twelfth" className={cardClass['tableau4twelfth']} style={{ left: "440px", top: "550px" }} hidden="hidden" onClick={() => move("tableau4twelfth")}>
              {get_img_link(cards[3][11],faceup(3,11,face)) ? (
              <img id="t4twe" src={get_img_link(cards[3][11],faceup(3,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5twelfth" className={cardClass['tableau5twelfth']} style={{ left: "580px", top: "550px" }} hidden="hidden" onClick={() => move("tableau5twelfth")}>
              {get_img_link(cards[4][11],faceup(4,11,face)) ? (
              <img id="t5twe" src={get_img_link(cards[4][11],faceup(4,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6twelfth" className={cardClass['tableau6twelfth']} style={{ left: "720px", top: "550px" }} hidden="hidden" onClick={() => move("tableau6twelfth")}>
              {get_img_link(cards[5][11],faceup(5,11,face)) ? (
              <img id="t6twe" src={get_img_link(cards[5][11],faceup(5,11))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7twelfth" className={cardClass['tableau7twelfth']} style={{ left: "860px", top: "550px" }} hidden="hidden" onClick={() => move("tableau7twelfth")}>
              {get_img_link(cards[6][11],faceup(6,11,face)) ? (
              <img id="t7twe" src={get_img_link(cards[6][11],faceup(6,11,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
        <div className="center-screen">
          <div className="board-row">
            <button id="tableau1thirteenth" className={cardClass['tableau1thirteenth']} style={{ left: "20px", top: "570px" }} hidden="hidden" onClick={() => move("tableau1thirteenth")}>
              {get_img_link(cards[0][12],faceup(0,12,face)) ? (
              <img id="t1tht" src={get_img_link(cards[0][12],faceup(0,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau2thirteenth" className={cardClass['tableau2thirteenth']} style={{ left: "160px", top: "570px" }} hidden="hidden" onClick={() => move("tableau2thirteenth")}>
              {get_img_link(cards[1][12],faceup(1,12,face)) ? (
              <img id="t2tht" src={get_img_link(cards[1][12],faceup(1,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau3thirteenth" className={cardClass['tableau3thirteenth']} style={{ left: "300px", top: "570px" }} hidden="hidden" onClick={() => move("tableau3thirteenth")}>
              {get_img_link(cards[2][12],faceup(2,12,face)) ? (
              <img id="t3tht" src={get_img_link(cards[2][12],faceup(2,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau4thirteenth" className={cardClass['tableau4thirteenth']} style={{ left: "440px", top: "570px" }} hidden="hidden" onClick={() => move("tableau4thirteenth")}>
              {get_img_link(cards[3][12],faceup(3,12,face)) ? (
              <img id="t4tht" src={get_img_link(cards[3][12],faceup(3,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau5thirteenth" className={cardClass['tableau5thirteenth']} style={{ left: "580px", top: "570px" }} hidden="hidden" onClick={() => move("tableau5thirteenth")}>
              {get_img_link(cards[4][12],faceup(4,12,face)) ? (
              <img id="t5tht" src={get_img_link(cards[4][12],faceup(4,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau6thirteenth" className={cardClass['tableau6thirteenth']} style={{ left: "720px", top: "570px" }} hidden="hidden" onClick={() => move("tableau6thirteenth")}>
              {get_img_link(cards[5][12],faceup(5,12,face)) ? (
              <img id="t6tht" src={get_img_link(cards[5][12],faceup(5,12))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
            <button id="tableau7thirteenth" className={cardClass['tableau7thirteenth']} style={{ left: "860px", top: "570px" }} hidden="hidden" onClick={() => move("tableau7thirteenth")}>
              {get_img_link(cards[6][12],faceup(6,12,face)) ? (
              <img id="t7tht" src={get_img_link(cards[6][12],faceup(6,12,face))} alt="card" style={{ width: "120px", height: "168px" }} />
              ) : null }
            </button>
          </div>
        </div>
      </>
    );
}