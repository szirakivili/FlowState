const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth',   require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/todos',  require('./routes/todo.routes'));
app.use('/api/users',  require('./routes/user.routes'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);