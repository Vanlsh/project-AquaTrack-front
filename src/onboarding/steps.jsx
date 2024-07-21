import React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const steps = [
  {
    content: (
      <div style={{ textAlign: 'center' }}>
        <h2>Welcome to AquaTrack!</h2>
        <p>We are glad to have you here!</p>
      </div>
    ),
    position: 'center'
  },
  {
    selector: '.first-step',
    content: 'This is your daily water intake target.',
  },
  {
    selector: '.second-step',
    content: 'This is your water progress bar.',
  },
  {
    selector: '.third-step',
    content: 'Click here to add more water to your daily intake.',
  },
  {
    selector: '.four-step',
    content: 'Here you can use your profile settings to fill in your personal details and record your daily water intake.',
  },
  {
    selector: '.five-step',
    content:'This section shows how much water you have drunk today, including the quantity and the times.',
  },
  {
    selector: '.six-step',
    content: 'Here you can view your monthly water intake statistics, where each individual day is taken into account.',
  },
  {
    content: (
      <div style={{ textAlign: 'center' }}>
        <h2>We hope you enjoy using AquaTrack!</h2>
      </div>
    ),
    position: 'center'
  },
];

export const styles = {
  maskWrapper: (base) => ({
    ...base,
    padding: '20px', 
  }),
  highlightedArea: (base, { x, y }) => ({
    ...base,
    x: x + 10,
    y: y + 10,
  }),
  badge: (base) => ({
    ...base,
    color: 'blue',
    display: 'none', 
  }),
  modal: (base) => ({
    ...base,
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    position: 'relative',
  }),
  close: (base) => ({
    ...base,
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
    color: 'red', 
  }),
};


export const disableBody = () => disableBodyScroll(document.body);
export const enableBody = () => enableBodyScroll(document.body);

