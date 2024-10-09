
// src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Button variant="contained" color="primary" component={Link} to="/users">
        Manage Users
      </Button>
    </Container>
  );
};

export default Dashboard;
