const { Sequelize } = require('sequelize');

// Conexión a base de datos en supabase
const sequelize = new Sequelize('postgresql://postgres.ihacppolytchuoksdcyw:7cajasdevaleriana@aws-0-eu-west-3.pooler.supabase.com:5432/postgres', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: true,
  dialectOptions: {
    family: 4,
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
db.Usuario = require('./usuarios')(sequelize, Sequelize);

// Relaciones

// empresas - trabajadores
db.empresas.hasMany(db.trabajadores, { foreignKey: 'id_empresa', as: 'trabajadores', onUpdate: 'CASCADE', onDelete: 'CASCADE' , });
db.trabajadores.belongsTo(db.empresas, { foreignKey: 'id_empresa', as: 'empresa', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

// viviendas - incidencias
db.viviendas.hasMany(db.incidencias, { foreignKey: 'id_vivienda',as: 'incidencias'  });
db.incidencias.belongsTo(db.viviendas, { foreignKey: 'id_vivienda', as: 'vivienda' });

// trabajadores - incidencias
db.trabajadores.hasMany(db.incidencias, { foreignKey: 'id_trabajador', as: 'incidencias' });
db.incidencias.belongsTo(db.trabajadores, { foreignKey: 'id_trabajador', as: 'trabajador' });

// viviendas - inquilinos
db.viviendas.hasOne(db.inquilinos, { foreignKey: 'vivienda_id', as: 'inquilino' });
db.inquilinos.belongsTo(db.viviendas, { foreignKey: 'vivienda_id', as: 'vivienda' });

module.exports = db;