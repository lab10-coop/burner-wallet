import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

ReactDOM.render(<App />, document.getElementById('root'));
