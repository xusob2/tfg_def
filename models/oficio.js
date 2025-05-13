module.exports = (sequelize, DataTypes) => {
    const oficio = sequelize.define("oficio", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_empresa: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipo_oficio: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      nombre_trabajador: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      obvservaciones: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    
  });
  return oficio;
}