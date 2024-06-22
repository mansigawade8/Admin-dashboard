import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import { Button, Typography, TextField, Box, Grid } from '@mui/material';

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2023-06-01' },
    { title: 'Event 2', date: '2023-06-02' },
  ]);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalOpen(true);
  };

  const handleEventAdd = () => {
    const newEvent = { title: 'New Event', date: selectedDate };
    setEvents([...events, newEvent]);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        eventClick={(info) => console.log('Event clicked:', info.event)}
        dateClick={handleDateClick}
      />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Event
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date: {selectedDate}
          </Typography>
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={handleModalClose} variant="contained">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleEventAdd} variant="contained" color="primary">
                Add Event
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Calendar;
