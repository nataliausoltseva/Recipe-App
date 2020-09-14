import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SharedPage from './Components/SharedPage';

const router = ()=> (
    <Router>
        <Switch>
            <Route path="/recipes/:id" component={(props:any)=><SharedPage {...props} />}/>
            <Route path="/" component={MainPage}/>
            
            
        </Switch>
    </Router>
    );

export default router;