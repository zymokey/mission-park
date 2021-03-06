import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router'

import rootStore from './rootStore';

import routes from '../features/homePage/routes';
import userAuthRoutes from '../features/userSign/routes';

render(
	(
		<Provider store={rootStore} >
			<Router history={browserHistory} >
				{routes}
				{userAuthRoutes}
			</Router>
		</Provider>
	), document.getElementById('app'));

