// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { createUser, fetchUserById, updateUser } from '../api';
import { Container, TextField, Button, Typography } from '@mui/material';
// In UserForm.js or any other file
//import { fetchUsers } from '../api';  // Remove or comment this if not needed

import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Load the user details for editing
      const loadUser = async () => {
        const user = await fetchUserById(id);
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      };
      loadUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, isAdmin };

    if (id) {
      await updateUser(id, userData);
    } else {
      await createUser(userData);
    }

    navigate('/users');
  };

  return (
    <Container>
      <Typography variant="h4">{id ? 'Edit User' : 'Add New User'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update User' : 'Create User'}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
