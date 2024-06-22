import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const initialRows = [
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', age: 30, email: 'jane@example.com' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const Tables = () => {
  const [rows, setRows] = useState(initialRows);
  const [newEntry, setNewEntry] = useState({ id: '', name: '', age: '', email: '' });

  const handleAddEntry = () => {
    // Generate a new ID based on the last ID in the current rows
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;

    // Create a new entry object
    const entry = { id: newId, ...newEntry };

    // Add the new entry to the rows state
    setRows([...rows, entry]);

    // Clear the new entry state for the next input
    setNewEntry({ id: '', name: '', age: '', email: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tables
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Add New Entry
            </Typography>
            <TextField
              name="id"
              label="ID"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newEntry.id}
              onChange={handleInputChange}
            />
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newEntry.name}
              onChange={handleInputChange}
            />
            <TextField
              name="age"
              label="Age"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newEntry.age}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newEntry.email}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEntry}
              style={{ marginTop: 16 }}
            >
              Add Entry
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tables;
