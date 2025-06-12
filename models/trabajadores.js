module.exports = (sequelize, DataTypes) => {
  const trabajadores = sequelize.define('trabajadores', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    id_empresa: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profesion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'trabajadores',
    timestamps: false
  });

  trabajadores.associate = function(models) {
    trabajadores.belongsTo(models.empresas, {
      foreignKey: 'id_empresa',
      as: 'empresa'
    });
  };

  return trabajadores;
};
