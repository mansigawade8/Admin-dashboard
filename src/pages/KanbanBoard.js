import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
} from '@mui/material';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const theme = useTheme();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTaskContent('');
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const newColumn = {
      ...data.columns['column-1'], // Default to 'To Do' column for new tasks
      taskIds: [...data.columns['column-1'].taskIds, newTaskId],
    };

    const newData = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newData);
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Grid item xs={12} md={4} key={column.id}>
                <Paper
                  style={{
                    padding: 16,
                    backgroundColor: theme.palette.background.default,
                    minHeight: 500,
                  }}
                >
                  <Typography variant="h6">{column.title}</Typography>
                  <Droppable droppableId={column.id} key={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          minHeight: 200,
                        }}
                      >
                        {tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  margin: '0 0 8px 0',
                                  padding: '8px',
                                  backgroundColor: snapshot.isDragging
                                    ? '#263B4A'
                                    : '#456C86',
                                  color: 'white',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {task.content}
                              </Paper>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Content"
            type="text"
            fullWidth
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default KanbanBoard;
