import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home   from './views/home';
import ProjectList from '../project/views/projectList';
import Project from '../project/views/project';
import Board from '../task/views/board';
import Navbar from '../homePage/views/navbar';
import App from '../app';


const routes = (
	<Route path="/" component={App} >
	  <IndexRoute component={Home} />
	  <Route path="/projects" component={ProjectList} />
	  <Route path="/project/:projectId" component={Project} >
  		<Route path="taskboard" component={Board} >
  		</Route>
  	</Route>
	</Route>
);


export default routes;