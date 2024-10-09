// api.js
const API_URL = 'http://localhost:5000';  // Adjust to your backend URL

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);  // Make a GET request to fetch all users
    
    const data = await response.json();  // Parse the response as JSON
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',  // Use POST method to create new data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),  // Send the user data in the body of the request
    });
    if (!response.ok) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',  // Use PUT method to update data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Error updating user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',  // Use DELETE method to remove data
    });
    if (!response.ok) {
      throw new Error(`Error deleting user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
