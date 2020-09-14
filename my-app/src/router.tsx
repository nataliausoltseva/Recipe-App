import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SharedPage from './Components/SharedPage';

const router = ()=> (
    <Router>
        <Switch>
            <Route path="/" component={MainPage}/>
            <Route paht="/recipe/:id" component={(props:any)=><SharedPage {...props} />}/>
        </Switch>
    </Router>
    );

export default router;