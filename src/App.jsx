// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

export default function JEEChecklistApp() {
  const [page, setPage] = useState('home');
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('jeeItems');
    return saved ? JSON.parse(saved) : [
      { text: 'Physics - Kinematics', checked: false },
      { text: 'Physics - Laws of Motion', checked: false },
      { text: 'Chemistry - Atomic Structure', checked: false },
      { text: 'Chemistry - Thermodynamics', checked: false },
      { text: 'Maths - Quadratic Equations', checked: false },
      { text: 'Maths - Limits and Continuity', checked: false },
    ];
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('jeeItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, { text: newItem.trim(), checked: false }]);
    setNewItem('');
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const toggleCheck = (index) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  if (page === 'home') {
    return (
      <div className="container">
        <h1 className="title">JEE 2026 Checklist</h1>
        <button className="button" onClick={() => setPage('checklist')}>Open Checklist</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">📘 JEE 2026 Chapter Checklist</h1>

      <div className="card">
        <div className="input-container">
          <input
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new topic..."
          />
          <button className="button" onClick={addItem}>Add</button>
        </div>

        <div className="items-container">
          {items.map((item, i) => (
            <div key={i} className={`item ${item.checked ? 'checked' : ''}`}>
              <div className="item-left">
                <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(i)} />
                <span className="item-text">{item.text}</span>
              </div>
              <button className="remove-button" onClick={() => removeItem(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <button className="button" onClick={() => setPage('home')}>← Back</button>
    </div>
  );
}
