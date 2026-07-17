// Goal:
// Render the root React component into the browser page

import React from 'react';
import {createRoot} from 'react-dom/client'
import {App} from './App';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(<App/>)