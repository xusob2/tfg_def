module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_piso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pisos', 
          key: 'id'
        }
      },
      id_oficio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Oficios',
          key: 'id'
        }
      },
    descripcion_tarea: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    avisado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    arreglado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_aviso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_solucionado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    imagen_url: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    obvservaciones: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  });

  return Tarea;
};
