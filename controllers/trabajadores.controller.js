const db = require('../models');
const sequelize = db.sequelize;
const Trabajador = db.trabajadores;
const Usuario = db.Usuario;

// Crear trabajador
exports.crearTrabajador = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // 1. Crear usuario
    const usuario = await Usuario.create({
      nombre_usuario: req.body.nombre_usuario,
      contraseña: req.body.contraseña,
      rol: 'trabajador'
    }, { transaction: t });

    // 2. Crear trabajador vinculado
    const trabajador = await Trabajador.create({
      id: usuario.id,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      profesion: req.body.profesion,
      id_empresa: req.body.id_empresa
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ usuario, trabajador });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear trabajador:', error);
    res.status(500).json({ error: 'Error al crear trabajador', detalles: error.message });
  }
};

// Obtener todos los trabajadores
exports.getTrabajadores = async (req, res) => {
  try {
    const { empresa } = req.query;

    const where = {};
    if (empresa) {
       where.id_empresa = parseInt(empresa);
    }

    const lista = await Trabajador.findAll({
      where,
      include: [{
        model: db.empresas,
        as: 'empresa',
        attributes: ['nombre']
      }]
    });

    res.json(lista);
  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
    res.status(500).json({ error: 'Error al obtener trabajadores', detalles: error.message });
  }
};


// Obtener por ID
exports.getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id, { include: ['empresa'] });
    if (!trabajador) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json(trabajador);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar trabajador', detalles: error.message });
  }
};

// Actualizar
exports.updateTrabajador = async (req, res) => {
  try {
    const [modificado] = await Trabajador.update(req.body, { where: { id: req.params.id } });
    if (!modificado) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json({ mensaje: 'Trabajador actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar', detalles: error.message });
  }
};

// Eliminar
exports.deleteTrabajador = async (req, res) => {
  try {
    const eliminado = await Trabajador.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Trabajador no encontrado' });
    res.json({ mensaje: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar trabajador', detalles: error.message });
  }
};
