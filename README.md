# BackendClase22-Sin-Nrz

Consigna 1: Sobre el desafío entregable de la clase 16, crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto).

Consigna 2: Ahora, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes). El nuevo formato de mensaje será:

Aspectos a incluir en el entregable: Modificar la persistencia de los mensajes para que utilicen un contenedor que permita guardar objetos anidados (archivos, mongodb, firebase). El mensaje se envía del frontend hacia el backend, el cual lo almacenará en la base de datos elegida. Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista. El array que se devuelve debe estar normalizado con normalizr, conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo). Ejemplo: { id: ‘mensajes’, mensajes: [ ] } El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.

Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo: const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'}); En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. Más info en la web oficial.
Presentar en el frontend (a modo de test) el porcentaje de compresión de los mensajes recibidos. Puede ser en el título del centro de mensajes.

Nota: incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo: new normalizr.schema.Entity , normalizr.denormalize(...,...,...)
