import React, { useRef, useState } from 'react';
import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const initialEvents = [
  { id: '1', title: 'Team Meeting', date: new Date().toISOString().slice(0, 10) },
  { id: '2', title: 'Project Deadline', date: new Date(Date.now() + 86400000).toISOString().slice(0, 10) },
];

export default function Calendar() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: arg.dateStr }]);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Calendar</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height={500}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">{selectedEvent?.title}</Typography>
            <Typography variant="body2">{selectedEvent?.start?.toLocaleDateString()}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
} 