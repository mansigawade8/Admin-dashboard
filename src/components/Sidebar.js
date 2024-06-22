import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/calendar">
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/kanban">
          <ListItemText primary="Kanban Board" />
        </ListItem>
        <ListItem button component={Link} to="/tables">
          <ListItemText primary="Tables" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
