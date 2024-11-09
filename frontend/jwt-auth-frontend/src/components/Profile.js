// src/Profile.js
import React, { useEffect, useState } from 'react';
import { getProfile } from '../service/authService';
import { Descriptions, Spin, Alert } from 'antd';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!user) {
    return <Alert message="Error loading profile" type="error" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Profile;
