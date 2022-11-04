const socket = io();

let productosPool = document.querySelector('#productosPool')
const productsForm = document.querySelector('#productsForm')
const nombreInput = document.querySelector('#nombreInput')
const precioInput = document.querySelector('#precioInput')
const urlInput = document.querySelector('#urlInput')

// Productos

function sendProduct(producto) {
    socket.emit('client:producto', producto)
}

// let html

function renderProducto(productos) {
    console.log('productos a renderizar desde client: ', productos)


    // const response = await fetch('/views/productos.ejs')
    // const plantilla = await response.text()
    // productos.forEach(producto => {
    //     const html = ejs.render(plantilla, producto)
    //     document.querySelector('#productosPool').innerHTML += html
    // })


    html = productos.map(pr => {
        return (`<div>
                    <p>${pr.nombre}</p>
                    <p>${pr.precio}</p>
                    </div>`)
    }).join(" ");
    console.log('HTML desde renderProducto:', html)

    productosPool.innerHTML += html;
    console.log("producto renderizado desde cliente")

}

productsForm.addEventListener('submit', event => {
    event.preventDefault()

    const producto = { nombre: nombreInput.value, precio: precioInput.value, url: urlInput.value }
    console.log("producto a enviar desde client ", producto)
    sendProduct(producto)
})

socket.on('server:productos', productos => {


    if (productos.length > 0) {
        // let history = document.getElementById('history')
        let productosPool = document.querySelector('#productosPool')
        let html = `
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Thumbnail</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
        `
        productos.forEach(product => {
            html += `
            <tr>
                <td>${product.nombre}</td>
                <td>$ ${product.precio}</td>
                <td><img src="${product.url}" width="50"></td>
            </tr>
            `
        })
        html += `
        </tbody>
        </table>
        `
        productosPool.innerHTML = html
    }
    // renderProducto(productos)
})


// Servicio mensajería


const chatForm = document.querySelector('#chatForm')

const aliasInput = document.querySelector('#aliasInput')
const apellidoInput = document.querySelector('#apellidoInput')
const avatarInput = document.querySelector('#avatarInput')
const edadInput = document.querySelector('#edadInput')
const mailInput = document.querySelector('#mailInput')
const nombreMjInput = document.querySelector('#nombreMjInput')
const mensajeInput = document.querySelector('#mensajeInput')

function sendMensaje(mensaje) {
    socket.emit('client:mensaje', mensaje)
}


chatForm.addEventListener('submit', event => {
    event.preventDefault()
    const mensaje = { author: { alias: aliasInput.value, apellido: apellidoInput.value, edad: edadInput.value, id: mailInput.value, avatar: avatarInput.value, nombre: nombreMjInput.value }, text: mensajeInput.value };
       console.log("mensaje a enviar desde client ", mensaje)
    sendMensaje(mensaje)
})

socket.on('server: mensajes', mensajes => {
    console.log("recibiendo mensajes desde client", mensajes)


    let chatPool = document.querySelector('#chatPool');
  

    if (mensajes.length > 0) {
        let html = ''
        mensajes.forEach(message => {
            html += `
            <div>
                <span style="color: blue; font-weight: bold">${message.author.id}</span>
                <span style="color: red">[${message.author.nombre}]: </span>
                <span style="color: green">${message.text}</span>
            </div>
            `
        })
        chatPool.innerHTML = html
    }


})

