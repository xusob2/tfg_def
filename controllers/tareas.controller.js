const db = require('../models');
const Tarea = db.Tarea;

exports.crearTarea = async (req, res) => {
  try {
    const {
      id_piso,
      id_oficio,
      descripcion_tarea,
      avisado,
      arreglado,
      fecha_aviso,
      fecha_solucionador,
      obvservaciones
    } = req.body;

    const imagen_url = req.file ? req.file.path : null;

    const nuevaTarea = await Tarea.create({
      id_piso,
      id_oficio,
      descripcion_tarea,
      avisado,
      arreglado,
      fecha_aviso,
      fecha_solucionador,
      imagen_url,
      obvservaciones
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
