import React, { useState } from 'react'
import './index.css'

export default function App() {

  const cards = [{
    url: 'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg', id: "Strength", interpretation: "FORTITUDE.—Power, energy, action, courage, magnanimity; also complete success and honours. Reversed: Despotism, abuse of power, weakness, discord, sometimes even disgrace.",
    source: "https://en.wikipedia.org/wiki/Strength_(Tarot_card)#:~:text=%E2%80%94Power%2C%20energy%2C%20action%2C,also%20complete%20success%20and%20honours."
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg', id: "Tower", interpretation: "THE TOWER.-- Misery, distress, indigence, adversity, calamity, disgrace, deception, ruin. It is a card in particular of unforeseen catastrophe. Reversed: Negligence, absence, distribution, carelessness, apathy, nullity, vanity.",
    source: "https://en.wikipedia.org/wiki/The_Tower_(Tarot_card)#:~:text=Garden%20of%20Eden.-,Symbolism,associated%20with%20the%20planet%20Mars."
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg', id: "Chariot", interpretation: "THE CHARIOT.—Succour, providence; also war, triumph, presumption, vengeance, trouble. Reversed: Riot, quarrel, dispute, litigation, defeat.",
    source: "https://en.wikipedia.org/wiki/The_Chariot_(Tarot_card)"
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg', id: "Lovers", interpretation: "THE LOVERS.—Attraction, love, beauty, trials overcome. Reversed: Failure, foolish designs. Another account speaks of marriage frustrated and contrarieties of all kinds.",
    source: "https://en.wikipedia.org/wiki/The_Lovers"
  },
  ].sort()

  const [draggable, setDraggable] = useState(cards)
  const [dropped, setDropped] = useState([])


  const handleDragStart = (e, name) => {
    e.dataTransfer.setData("id", name)
  }

  const handleOnDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    const elName = e.dataTransfer.getData('id')
    setDraggable(cards.filter(card => card.id !== elName).sort())
    setDropped(draggable.filter(card => card.id === elName)[0])
  }

  return (
    <>
      {draggable.map((card, i) => (
        <div key={i}>
          <div className="card" draggable onDragStart={e => handleDragStart(e, card.id)} style={{ backgroundImage: `url(${card.url})` }} />
        </div>))}
      <div onDragOver={e => handleOnDragOver(e)} onDrop={e => handleDrop(e)} style={{ backgroundImage: `url(${dropped.url})`, zIndex: 1 }} className="droppable">
        {dropped.length <= 0 && <h2 style={{ verticalAlign: "middle", textAlign: "center" }}>Drag a card onto me</h2>}
      </div>
      <div className="description">
        <h3> {dropped.interpretation} </h3>
        <a href={dropped.source}> View source </a>
      </div>
    </>
  )
}
