const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const viviendaController = require('../controllers/viviendas.controller');
const incidenciaController = require('../controllers/incidencias.controller');
const trabajadorController = require('../controllers/trabajadores.controller');
const empresaController = require('../controllers/empresas.controller');
const inquilinoController = require('../controllers/inquilinos.controller');

//
// --- INCIDENCIAS ---
//
router.post('/incidencias', incidenciaController.crearIncidencia);
router.get('/incidencias', incidenciaController.getIncidencias);
router.get('/incidencias/:trabajador', incidenciaController.getIncidencias);
router.patch('/incidencias/:id', incidenciaController.updateIncidencia);
router.delete('/incidencias/:id', incidenciaController.deleteIncidencia);

//
// --- VIVIENDAS ---
//
router.post('/viviendas', viviendaController.crearVivienda);
router.get('/viviendas', viviendaController.getViviendas);
router.get('/vivienda/:id', viviendaController.getViviendaById);
router.patch('/viviendas/:id', viviendaController.updateVivienda);
router.delete('/viviendas/:id', viviendaController.deleteVivienda);

//
// --- TRABAJADORES ---
//
router.post('/trabajadores', trabajadorController.crearTrabajador);
router.get('/trabajadores', trabajadorController.getTrabajadores);
router.patch('/trabajadores/:id', trabajadorController.updateTrabajador);
router.delete('/trabajadores/:id', trabajadorController.deleteTrabajador);

//
// --- EMPRESAS ---
//
router.post('/empresas', empresaController.createEmpresa);
router.get('/empresas', empresaController.getEmpresas);
router.patch('/empresas/:id', empresaController.updateEmpresa);
router.delete('/empresas/:id', empresaController.deleteEmpresa);

//
// --- INQUILINOS ---
//
router.post('/inquilinos', inquilinoController.crearInquilino);
router.get('/inquilinos', inquilinoController.getInquilinos);
router.get('/inquilinos/:id', inquilinoController.getInquilinoById);
router.patch('/inquilinos/:id', inquilinoController.updateInquilino);
module.exports = router;
