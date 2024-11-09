// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Space } from 'antd';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const { Header, Content } = Layout;

const LogoutButton = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <Button type="default" onClick={handleLogout}>
      Logout
    </Button>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      navigate('/profile'); // Redirect to profile if token is already present
    }
  }, [navigate]);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          {!token && (
            <>
              <Menu.Item key="1">
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/login">Login</Link>
              </Menu.Item>
            </>
          )}
          {token && (
            <>
              <Menu.Item key="3">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <LogoutButton setToken={setToken} />
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={token ? <Profile token={token} /> : <Login setToken={setToken} />} />
        </Routes>
      </Content>
    </Layout>
  );
};

// HomePage Component
const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the React & Django Authentication App</h1>
      <p>Click on the buttons below to navigate:</p>
      <Space>
        <Button type="primary">
          <Link to="/register">Register</Link>
        </Button>
        <Button type="default">
          <Link to="/login">Login</Link>
        </Button>
      </Space>
    </div>
  );
};

export default App;
