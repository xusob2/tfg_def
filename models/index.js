const { Sequelize } = require('sequelize');

// Conexión a PostgreSQL
const sequelize = new Sequelize('gestion_pisos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.piso = require('./piso')(sequelize, Sequelize);
db.oficio = require('./oficio')(sequelize, Sequelize);
db.tarea = require('./tarea')(sequelize, Sequelize);

// Relaciones
db.piso.hasMany(db.tarea, { foreignKey: 'id_piso' });
db.tarea.belongsTo(db.piso, { foreignKey: 'id_piso' });

db.oficio.hasMany(db.tarea, { foreignKey: 'id_oficio' });
db.tarea.belongsTo(db.oficio, { foreignKey: 'id_oficio' });

module.exports = db;
