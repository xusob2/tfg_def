module.exports = (sequelize, DataTypes) => {
    const Piso = sequelize.define('Piso', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      escalera:{
        type: DataTypes.STRING(10),
        allowNull: true
      },
      piso: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      letra: {
        type: DataTypes.STRING(3),
        allowNull: true
      },
      habitaciones: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      metros_cuadrados: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      obvservaciones: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    });
  
    return Piso;
  };
  