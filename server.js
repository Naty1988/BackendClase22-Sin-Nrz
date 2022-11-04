const express = require('express');
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const productos = []

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// Para funcionamiento de Socket.io

app.use(express.static(__dirname, + '/public'))

const { faker } = require('@faker-js/faker')
faker.locale = 'es'

// Ruta test con producto fakers

app.get('/test', (req, res) => {
  console.log('ok desde test')
  let id = productos.length ? (productos.length + 1) : 1

  for (let i = 1; i <= 5; i++) {
    productos.push({
      id,
      nombre: faker.animal.type(),
      precio: faker.finance.account(2),
      imagen: faker.image.animals(),
    })
    id++
  }
  console.log('productos  faker a renderizar: ', productos)
  res.render('productos.ejs', { productos })
})

// Configuración firebase

let admin = require("firebase-admin");

let serviceAccount = require("./configFirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let mensajes = []
const db = admin.firestore();

const mensajesDB = db.collection("mensajes");

const traerMensajes = async () => {


  try {

    const userSnapshot = await mensajesDB.get()
    const mensajeDoc = userSnapshot.docs

    let response = mensajeDoc.map(mj => ({
      id: mj.id,
      author: mj.data().author,
      text: mj.data().text
    }))

    mensajes = response

    console.log("mensajes traidos de la base de datos", mensajes)

  } catch (err) {
    console.log(err);
  }
}

// const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// const mensajesDB = db.collection("mensajes");

const guardarMensaje = async (mensaje) => {

  try {
    const newMensaje = mensajesDB.doc();
    await newMensaje.create({ author: {alias: mensaje.author.alias, apellido: mensaje.author.apellido,  edad: mensaje.author.edad , id: mensaje.author.id,  avatar: mensaje.author.avatar, nombre: mensaje.author.nombre} , text: mensaje.text });

    console.log('mensaje guardado en Firebase')
  } catch (err) {
    console.log(err);
  }

}


// Socket.io

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('client:producto', producto => {
    console.log('producto recibido en el servidor: ', producto)
    productos.push(producto)
    console.log('producto pusheado: ', productos)
    io.emit('server:productos', productos)
  })

  socket.on('client:mensaje', mensaje => {

    console.log('mensaje recibido en el servidor: ', mensaje)

    mensajes.push(mensaje)
    console.log('mensaje pusheado: ', mensajes)

    guardarMensaje(mensaje)
   
    traerMensajes()
    
    io.emit('server: mensajes', mensajes)
  })

})

app.get('/', async (req, res) =>  {
 
  res.render('main.ejs')
})

server.listen(8000, () => {
  console.log('listening on: 8000');
});