const db = require('../models');
const incidencia = db.incidencias;
const vivienda = db.viviendas;
const trabajador = db.trabajadores;

exports.crearIncidencia = async (req, res) => {
  try {
    const {
      id_vivienda,
      id_trabajador,
      descripcion,
      fecha_visita,
      solucionada
    } = req.body;

    // Validación de campos obligatorios
    if (!id_vivienda || !descripcion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaIncidencia = await incidencia.create({
      id_vivienda,
      id_trabajador: id_trabajador || null,
      descripcion,
      fecha_visita: fecha_visita || null,
      solucionada: solucionada || false
    });

    res.status(201).json(nuevaIncidencia);
  } catch (error) {
    console.error('Error al crear la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getIncidencias = async (req, res) => {
  try {
    const { id_trabajador, id_vivienda } = req.query;

    const where = {};
    if (id_trabajador) {
      where.id_trabajador = id_trabajador;

      const incidencias = await incidencia.findAll({
        where,
        include: [
          {
            model: vivienda,
            as: 'vivienda'
          }
        ],
        order: [['fecha_visita', 'ASC']]
      });
      res.status(200).json(incidencias);
    } else if (id_vivienda) {
      where.id_vivienda = id_vivienda;
      const incidencias = await incidencia.findAll({
        where,
        include: [
          {
            model: trabajador,
            as: "trabajador"
          }
        ],
        order: [['created_at', 'ASC']]
      });
      res.status(200).json(incidencias);
    } else {
      const incidencias = await incidencia.findAll();
      res.status(200).json(incidencias);
    }
  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateIncidencia = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      descripcion,
      fecha_visita,
      solucionada,
      id_vivienda,
      id_trabajador
    } = req.body;

    const incidenciaExistente = await incidencia.findByPk(id);
    if (!incidenciaExistente) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    await incidencia.update(
        {
          descripcion,
          fecha_visita,
          solucionada,
          id_vivienda,
          id_trabajador
        },
        { where: { id } }
    );

    const incidenciaActualizada = await incidencia.findByPk(id);
    res.status(200).json(incidenciaActualizada);
  } catch (error) {
    console.error('Error al actualizar la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.deleteIncidencia = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await incidencia.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
