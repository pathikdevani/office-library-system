import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Tabs from './Templates';
import Template from '../Template/Template';

function StoreRoutes() {
  return (
    <Switch>
      <Route component={Tabs} path="/templates/:id" exact />
      <Route component={Tabs} path="/templates" exact />
      <Route component={Template} path="/templates/templates/:id" />
    </Switch>
  );
}

export default StoreRoutes;
