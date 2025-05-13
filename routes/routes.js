const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const db = require('../models');
const Tarea = db.Tarea;
const Piso = db.Piso;
const Oficio = db.Oficio;

//
// --- TAREAS ---
//
router.post('/tareas', upload.single('imagen'), async (req, res) => {
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
      avisado: avisado === 'true',
      arreglado: arreglado === 'true',
      fecha_aviso,
      fecha_solucionador,
      imagen_url,
      obvservaciones
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

router.get('/tareas', async (req, res) => {
  const tareas = await Tarea.findAll({ include: [Piso, Oficio] });
  res.json(tareas);
});

//
// --- PISOS ---
//
router.post('/pisos', async (req, res) => {
  try {
    const nuevoPiso = await Piso.create(req.body);
    res.status(201).json(nuevoPiso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear piso' });
  }
});

router.get('/pisos', async (req, res) => {
  const pisos = await Piso.findAll();
  res.json(pisos);
});

//
// --- OFICIOS ---
//
router.post('/oficios', async (req, res) => {
  try {
    const nuevoOficio = await Oficio.create(req.body);
    res.status(201).json(nuevoOficio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear oficio' });
  }
});

router.get('/oficios', async (req, res) => {
  const oficios = await Oficio.findAll();
  res.json(oficios);
});

module.exports = router;
