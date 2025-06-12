module.exports = (sequelize, DataTypes) => {
  const Inquilino = sequelize.define('inquilinos', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    vivienda_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'viviendas',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'inquilinos',
    timestamps: false
  });

  return Inquilino;
};