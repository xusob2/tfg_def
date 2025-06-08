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

  res.cookie('nombreUsuario', resultado.nombre, {
    secure: false, // puedes cambiar a true si usas HTTPS
    sameSite: 'Strict',
  });

  // Guardar en sesión y en lista
  req.session.usuario = resultado.nombre;
  listaUsuarios[resultado.nombre] = true;

  res.status(200).json({ message: "Inicio de sesión exitoso", usuario: resultado });
  
});