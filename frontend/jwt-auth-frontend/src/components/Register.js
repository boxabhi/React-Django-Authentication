// src/Register.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { register } from  '../service/authService';  // Make sure this is the correct path
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleSubmit = async (values) => {
    try {
      await register(values.username, values.email, values.password, values.password2);
      message.success('User registered successfully!');
      navigate('/login');
    } catch (error) {
      message.error('Error registering user.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password2"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            value={formData.password2}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
