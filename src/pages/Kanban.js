import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Avatar } from '@mui/material';
import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';

const initialColumns = {
  todo: [
    { id: '1', content: 'Design homepage' },
    { id: '2', content: 'Write documentation' },
  ],
  inprogress: [
    { id: '3', content: 'Develop login flow' },
  ],
  done: [
    { id: '4', content: 'Setup project repo' },
  ],
};

const columnColors = {
  todo: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  inprogress: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  done: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

function DraggableCard({ task, column }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id, data: { column } });
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{
      transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      opacity: isDragging ? 0.5 : 1,
      marginBottom: 8,
      cursor: 'grab',
    }}>
      <Card sx={{ mb: 1, boxShadow: 3, borderRadius: 2, transition: 'box-shadow 0.2s, transform 0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.03)' } }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 16 }}>{task.content[0]}</Avatar>
          <Box sx={{ ml: 1 }}>{task.content}</Box>
        </CardContent>
      </Card>
    </div>
  );
}

function DroppableColumn({ children, column }) {
  const { setNodeRef, isOver } = useDroppable({ id: column });
  return (
    <div ref={setNodeRef} style={{ minHeight: 120, background: isOver ? 'rgba(0,0,0,0.04)' : undefined, borderRadius: 8, padding: 4, transition: 'background 0.2s' }}>
      {children}
    </div>
  );
}

export default function Kanban() {
  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('todo');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    const fromCol = Object.keys(columns).find(col => columns[col].some(t => t.id === active.id));
    const toCol = over.id;
    if (fromCol && toCol && fromCol !== toCol) {
      const task = columns[fromCol].find(t => t.id === active.id);
      setColumns(prev => ({
        ...prev,
        [fromCol]: prev[fromCol].filter(t => t.id !== active.id),
        [toCol]: [...prev[toCol], task],
      }));
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setColumns(prev => ({
        ...prev,
        [targetColumn]: [...prev[targetColumn], { id: Date.now().toString(), content: newTask }],
      }));
      setNewTask('');
      setOpen(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Kanban Board</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Task
        </Button>
      </Stack>
      <Paper sx={{ p: 2, mt: 2, bgcolor: 'background.default', boxShadow: 3, borderRadius: 3 }}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Grid container spacing={3} alignItems="flex-start">
            {Object.entries(columns).map(([col, tasks]) => (
              <Grid item xs={12} md={4} key={col} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" align="center" gutterBottom sx={{ color: '#fff', background: columnColors[col], borderRadius: 2, py: 1, mb: 2, fontWeight: 700, letterSpacing: 1 }}>
                  {col.toUpperCase()}
                </Typography>
                <DroppableColumn column={col}>
                  {tasks.map((task) => (
                    <DraggableCard key={task.id} task={task} column={col} />
                  ))}
                </DroppableColumn>
              </Grid>
            ))}
          </Grid>
        </DndContext>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Description"
              fullWidth
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
            />
            <TextField
              select
              label="Column"
              value={targetColumn}
              onChange={e => setTargetColumn(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              SelectProps={{ native: true }}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
} 