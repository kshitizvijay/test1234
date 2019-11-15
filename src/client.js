import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
const data = window.state;
hydrate(
  <BrowserRouter context={{kshitiz: 'kshitiz'}}>
    <App data={data}/>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
