const db = require('../models');
const { empresas, trabajadores } = db;

// Crear una empresa
exports.createEmpresa = async (req, res) => {
  try {
    const nuevaEmpresa = await empresas.create(req.body);
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la empresa', detalles: error.message });
  }
};

// Obtener todas las empresas (con trabajadores opcionalmente)
exports.getEmpresas = async (req, res) => {
  try {
    const empresasList = await empresas.findAll();
    res.json(empresasList);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
};

// Actualizar una empresa
exports.updateEmpresa = async (req, res) => {
  try {
    const id = req.params.id;  // Usar id de params según la ruta patch('/empresas/:id')
    const data = req.body;

    const [modificada] = await empresas.update(data, { where: { id } });
    if (!modificada) return res.status(404).json({ error: 'Empresa no encontrada' });

    const empresaActualizada = await empresas.findByPk(id);
    res.json(empresaActualizada);
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ error: 'Error al actualizar empresa', detalles: error.message });
  }
};

// Eliminar una empresa
exports.deleteEmpresa = async (req, res) => {
  try {
    const filasEliminadas = await empresas.destroy({
      where: { id: req.params.id }
    });
    if (filasEliminadas === 0) return res.status(404).json({ error: 'Empresa no encontrada' });
    res.json({ mensaje: 'Empresa eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empresa', detalles: error.message });
  }
};
