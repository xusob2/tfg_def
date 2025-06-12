const express = require('express');
const router = express.Router();
const db = require('../models');

// Obtener viviendas del inquilino logueado
router.get('/viviendas', async (req, res) => {
    const id_inquilino = req.session.usuario;
    if (!id_inquilino) return res.status(401).json({ error: 'No autenticado' });

    try {
        const viviendasAsociadas = await db.viviendas.findAll({
            include: {
                model: db.viviendas_inquilinos,
                where: { id_inquilino },
                attributes: []
            }
        });
        res.json(viviendasAsociadas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener viviendas' });
    }
});

// Obtener todos los trabajadores
router.get('/trabajadores', async (req, res) => {
    try {
        const lista = await db.trabajadores.findAll();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener trabajadores' });
    }
});

// Crear una incidencia
router.post('/nueva', async (req, res) => {
    const { id_vivienda, id_trabajador, fecha_visita, descripcion } = req.body;
    try {
        const incidencia = await db.incidencias.create({
            id_vivienda,
            id_trabajador,
            fecha_visita,
            descripcion,
            solucionada: false
        });
        res.json({ ok: true, incidencia });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear incidencia' });
    }
});

module.exports = router;
