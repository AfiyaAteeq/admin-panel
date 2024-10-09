import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, deleteUser } from '../api'; // Ensure createUser is imported
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const navigate = useNavigate();

  // Fetch users from the backend when component loads
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle submitting the form to create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]); // Add new user to the list
      setNewUser({ name: '', email: '', password: '', isAdmin: false }); // Reset form fields
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* User creation form */}
      <form onSubmit={handleCreateUser}>
        <TextField
          label="Name"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          required
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add New User
        </Button>
      </form>

      {/* User list */}
      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/users/edit/${user._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserList;
