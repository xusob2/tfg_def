const { Sequelize } = require('sequelize');

// Conexión a base de datos en supabase
const sequelize = new Sequelize('postgresql://postgres:7cajasdevaleriana@db.ihacppolytchuoksdcyw.supabase.co:5432/postgres', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Modelos

db.empresas = require('./empresas')(sequelize, Sequelize);
db.incidencias = require('./incidencias')(sequelize, Sequelize);
db.inquilinos = require('./inquilinos')(sequelize, Sequelize);
db.trabajadores = require('./trabajadores')(sequelize, Sequelize);
db.viviendas = require('./viviendas')(sequelize, Sequelize);
db.viviendas_inquilinos = require('./viviendas_inquilinos')(sequelize, Sequelize);
db.Usuario = require('./usuarios')(sequelize, Sequelize);

// Relaciones

// empresas - trabajadores
db.empresas.hasMany(db.trabajadores, { foreignKey: 'id_empresa', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
db.trabajadores.belongsTo(db.empresas, { foreignKey: 'id_empresa', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

// viviendas - incidencias
db.viviendas.hasMany(db.incidencias, { foreignKey: 'id_vivienda' });
db.incidencias.belongsTo(db.viviendas, { foreignKey: 'id_vivienda' });

// trabajadores - incidencias
db.trabajadores.hasMany(db.incidencias, { foreignKey: 'id_trabajador' });
db.incidencias.belongsTo(db.trabajadores, { foreignKey: 'id_trabajador' });

// viviendas - viviendas_inquilinos
db.viviendas.hasMany(db.viviendas_inquilinos, { foreignKey: 'id_vivienda' });
db.viviendas_inquilinos.belongsTo(db.viviendas, { foreignKey: 'id_vivienda' });

// inquilinos - viviendas_inquilinos
db.inquilinos.hasMany(db.viviendas_inquilinos, { foreignKey: 'id_inquilino', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
db.viviendas_inquilinos.belongsTo(db.inquilinos, { foreignKey: 'id_inquilino', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

module.exports = db;