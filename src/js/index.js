import '../scss/style.scss';
import React from 'react';
import { render } from 'react-dom';


import App from './components/App';

const wrapper = document.getElementById('root');
render(
   <App />,
   wrapper
);

//------------------------------------

if (module && module.hot) {
   module.hot.accept();
}


