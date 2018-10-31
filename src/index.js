import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import * as serviceWorker from './config/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister(); // unregister() to register() en el deploy
