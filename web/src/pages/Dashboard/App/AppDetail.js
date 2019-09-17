import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import API from '../../../api';
import globalActions from '../../../actions/global.actions';
import Empty from '../../../components/Empty/Empty';
import Tabs from '../../../components/Tabs/Tabs';
import BuildsTable from './BuildsTable';

function App(props) {
  const { match, setGlobalLoading } = props;
  const { aid, id } = match.params;
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    setLoading(true);
    setGlobalLoading(true);
    Promise.all([
      API.post(`/apps/get/${aid}`),
      API.post(`/stores/get/${id}`),
    ])
      .then(([e]) => {
        setExist(true);
        setDoc(e.data.data);
      })
      .catch(() => {
        setExist(false);
      })
      .finally(() => {
        setLoading(false);
        setGlobalLoading(false);
      });
  }, [aid, id]);

  let render = null;
  if (!loading) {
    if (exist) {
      const baseRoute = `/stores/stores/${id}/apps/${aid}`;
      render = (
        <Tabs
          route={`${baseRoute}`}
          calc={() => `${baseRoute}`}
          style={{ padding: 15 }}
          defaultTab={() => `${baseRoute}/builds`}
          data={
            [
              {
                key: 'builds',
                title: 'Builds',
                component: <BuildsTable app={doc} />,
              },
            ]}
        />
      );
    } else {
      render = <Empty />;
    }
  }

  return (
    <div>{render}</div>
  );
}


export default connect(null, {
  setGlobalLoading: globalActions.setGlobalLoading,
})(withRouter(App));
