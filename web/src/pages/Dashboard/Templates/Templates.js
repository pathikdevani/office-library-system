import React from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';

import Tabs from '../../../components/Tabs/Tabs';
import Table from '../../../components/Table/Table';
import Form from '../../../components/Form/Form';
import formSchema from './TemplateSchema';

function Templates() {
  const table = (
    <Table
      api="/templates/pagination"
      title={(<div>My New Table With App Stores - Templates</div>)}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 150,
          render: (text, item) => <Link to={`/templates/templates/${item._id}`}>{text}</Link>,
        },
        {
          title: 'Apps',
          dataIndex: 'apps',
          key: 'apps',
          width: 70,
          render: text => text,
        },
      ]}
    />
  );

  const addTemplateForm = (
    <div style={{
      width: '40%',
      margin: 'auto',
      marginTop: 30,
    }}
    >
      <Form
        api="/templates/create"
        onSuccess={() => { message.success('Store created'); }}
        onFail={() => { message.error('Failed to created store'); }}
        schema={formSchema}
      />
    </div>
  );

  return (
    <Tabs
      route="/templates"
      calc={() => '/templates'}
      defaultTab={() => '/templates/templates'}
      style={{ padding: 15 }}
      data={[
        {
          key: 'templates',
          title: 'Templates',
          component: table,
        },
        {
          key: 'addtemplate',
          title: '+Add Template',
          component: addTemplateForm,
        },
      ]}
    />
  );
}

export default Templates;
