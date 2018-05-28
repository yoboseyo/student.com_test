import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './store/reducers/index';
import '../node_modules/normalize.css/normalize.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(logger));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path="/" component={App}></Route>
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('root'));
registerServiceWorker();
