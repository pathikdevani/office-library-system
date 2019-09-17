import React, { useState } from 'react';
import {
  Form, Input, Icon, Checkbox, Button, message,
} from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import media from '../../utils/media';
import globalActions from '../../actions/global.actions';
import authActions from '../../actions/auth.actions';
import userRequests from '../../requests/user.requests';


const Container = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 100px;

  ${media.ph`
    width: 100%;
    padding: 20px;
  `}
`;

function Login(props) {
  const { form, setGlobalLoading, setCurrentUser } = props;
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        setGlobalLoading(true);
        userRequests.signin({
          email: values.userName,
          password: values.password,
        }).then((user) => {
          setLoading(false);
          setGlobalLoading(false);
          setCurrentUser(user.data);
        }).catch(() => {
          message.error('User name or Password is wrong');
          setLoading(false);
          setGlobalLoading(false);
        });
      }
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            style={{
              width: '100%',
            }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Log in
          </Button>
          <Link to="/forgot"> Forgot password</Link>
          <span style={{ float: 'right' }}>
            Or
            {' '}
            <Link to="/forgot"> register now!</Link>
          </span>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default connect(null, {
  setGlobalLoading: globalActions.setGlobalLoading,
  setCurrentUser: authActions.setCurrentUser,
})(Form.create({ name: 'normal_login' })(Login));
