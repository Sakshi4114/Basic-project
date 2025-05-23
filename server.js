
const express = require('express');
const app = express();

app.use(express.json());


const tasks = [
    { id: 1, title: 'Example task', description: 'Do something' },
    { id: 2, title: 'Example task', description: 'Do something' }
];
let nextId = 3;

app.get('/tasks', (req, res) => {

    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = {
        id: nextId++,
        title,
        description
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});



app.put('/tasks/:id', (req, res) => {
     const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    task.title = title;
    task.description = description;

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: 'Task deleted', task: deletedTask[0] });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
