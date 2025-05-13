const express = require('express');
const db = require('../models');
const routes = require('../routes/routes');

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);

db.sequelize.sync().then(() => {
  console.log('🗄️ Base de datos sincronizada');
  app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
  });
});
