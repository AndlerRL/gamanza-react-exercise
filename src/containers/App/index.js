import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/Layout';
import Homepage from 'components/Home';
import Episodes from 'components/Episodes';

const App = () => {
  const router = (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/episodes" component={Episodes} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <Layout>
      { router }
    </Layout>
  );
}

export default App;