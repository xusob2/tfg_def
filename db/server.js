const express = require('express');
const path = require("path");
const db = require('../models');
const { Usuario } = db;
const routes = require('../routes/routes');
const session = require('express-session');

const listaUsuarios = {};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);

app.use(session({
  secret: '7CajasDeValeriana',
  resave: false,
  saveUninitialized: false,
}));


db.sequelize.sync().then(() => {
  console.log('🗄️ Base de datos sincronizada');
  app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
  });
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/login", async (req, res) => {
  const { user, password } = req.body;
  console.log(user, password);

  const resultado = await Usuario.findOne({
    where: { nombre: user }
  });

  if (!resultado) {
    return res.status(401).json({ error: "Usuario inexistente" });
  }

  if (password !== resultado.contraseña) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  //Devolución de cookie con rol
  res.cookie('rolUsuario', resultado.rol, {
    secure: false, // puedes cambiar a true si usas HTTPS
    sameSite: 'Strict',
  });

  // Guardar en sesión y en lista
  req.session.usuario = resultado.id;
  listaUsuarios[resultado.id] = true;

  res.status(200).json({ message: "Inicio de sesión exitoso", usuario: resultado });

});

function verificarAutenticacion(req, res, next) {
  if (req.session.usuario) {
    next(); // El usuario está autenticado, continúa con la siguiente función
  } else {
    res.status(401).send('Acceso denegado. Por favor inicia sesión.');
  }
}

function verificarRol(rolRequerido) {
  return async (req, res, next) => {
    user = req.session.usuario;
    const resultado = await Usuario.findOne({
      where: { id: user }
    });
    if (!resultado) {
      return res.status(401).json({ error: "No autenticado" });
    }
    if (resultado.rol !== rolRequerido) {
      return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
    }
    next();
  };
}

app.get("/principal", verificarAutenticacion, async (req, res) => {
  console.log("LA SESION", req.session)
  user = req.session.usuario;
  const resultado = await Usuario.findOne({
    where: { id: user }
  });
  if (resultado.rol == 'admin') {
    res.sendFile(path.join(__dirname, "../public", "principal_admin.html"));
  } else if (resultado.rol == 'inquilino') {
    res.sendFile(path.join(__dirname, "../public", "principal_inquilino.html"));
  } else if (resultado.rol == 'trabajador') {
    res.sendFile(path.join(__dirname, "../public", "principal_trabajador.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  }
});