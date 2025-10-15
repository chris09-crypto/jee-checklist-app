import React, { useState, useEffect } from 'react';
import './App.css';

export default function JEEChecklistApp() {
  const subjectData = {
    Physics: [
      'Units and Dimensions', 'Kinematics', 'Laws of Motion', 'Work, Power and Energy',
      'Rotational Motion', 'Gravitation', 'Properties of Solids and Liquids', 'Thermodynamics',
      'Kinetic Theory of Gases', 'Oscillations and Waves', 'Electrostatics',
      'Current Electricity', 'Magnetic Effects of Current', 'Electromagnetic Induction',
      'Alternating Currents', 'Ray Optics and Wave Optics', 'Dual Nature of Matter',
      'Atoms and Nuclei', 'Semiconductor Electronics', 'Communication Systems'
    ],
    Chemistry: [
      'Some Basic Concepts of Chemistry', 'Atomic Structure', 'Chemical Bonding and Molecular Structure',
      'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen',
      'The s-Block Elements', 'The p-Block Elements', 'The d-Block and f-Block Elements',
      'Coordination Compounds', 'Organic Chemistry - Basic Principles', 'Hydrocarbons',
      'Haloalkanes and Haloarenes', 'Alcohols, Phenols, and Ethers',
      'Aldehydes, Ketones and Carboxylic Acids', 'Amines', 'Biomolecules',
      'Polymers', 'Chemistry in Everyday Life'
    ],
    Maths: [
      'Sets, Relations and Functions', 'Complex Numbers', 'Quadratic Equations',
      'Sequences and Series', 'Binomial Theorem', 'Permutations and Combinations',
      'Straight Lines and Pair of Lines', 'Circles and Parabola', 'Ellipse and Hyperbola',
      'Limits and Continuity', 'Differentiation', 'Applications of Derivatives',
      'Definite and Indefinite Integrals', 'Differential Equations', 'Vectors',
      'Three Dimensional Geometry', 'Probability', 'Statistics',
      'Mathematical Reasoning', 'Matrices and Determinants'
    ]
  };

  const [page, setPage] = useState('loading');
  const [activeTab, setActiveTab] = useState('Physics');
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('jeeTabs');
    return saved
      ? JSON.parse(saved)
      : Object.fromEntries(
          Object.entries(subjectData).map(([subject, list]) => [
            subject,
            list.map(ch => ({ text: ch, checked: false }))
          ])
        );
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('jeeTabs', JSON.stringify(items));
  }, [items]);

  // Loader for 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setPage('home'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems({
      ...items,
      [activeTab]: [...items[activeTab], { text: newItem.trim(), checked: false }]
    });
    setNewItem('');
  };

  const removeItem = (index) => {
    const updated = [...items[activeTab]];
    updated.splice(index, 1);
    setItems({ ...items, [activeTab]: updated });
  };

  const toggleCheck = (index) => {
    const updated = [...items[activeTab]];
    updated[index].checked = !updated[index].checked;
    setItems({ ...items, [activeTab]: updated });
  };

  const getProgress = (subject) => {
    const total = items[subject].length;
    const completed = items[subject].filter(i => i.checked).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  if (page === 'loading') {
    return (
      <div className="loader-container">
        <div className="loader-dot"></div>
      </div>
    );
  }

  if (page === 'home') {
    return (
      <div className="home-container">
        <h1 className="title">JEE 2026 Checklist</h1>
        <button className="button" onClick={() => setPage('checklist')}>
          Open Checklist
        </button>
      </div>
    );
  }

  const progress = getProgress(activeTab);

  return (
    <div className="app-container">
      <h1 className="title">📘 JEE 2026 Chapter Checklist</h1>

      {/* Tabs */}
      <div className="tabs">
        {Object.keys(subjectData).map(subject => (
          <button
            key={subject}
            className={`tab ${activeTab === subject ? 'active' : ''}`}
            onClick={() => setActiveTab(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progress}% Completed</p>
      </div>

      {/* Checklist items */}
      <div className="card">
        <h2 className="subject-title">{activeTab}</h2>

        <div className="input-container">
          <input
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${activeTab} topic...`}
          />
          <button className="button" onClick={addItem}>Add</button>
        </div>

        <div className="items-container">
          {items[activeTab].map((item, i) => (
            <div key={i} className={`item ${item.checked ? 'checked' : ''}`}>
              <div className="item-left">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(i)}
                />
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
