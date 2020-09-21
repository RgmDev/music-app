# music-app
App con MEAN Stack 

# NodeJS
https://nodejs.org/es/

```
node -v
npm -v 
``` 

# MongoDB 

https://www.mongodb.com/es

Crear el directorio C:/data/db para archivos de Mongo 
mongodbd.exe para levantar el servicio de mongo
mongodb.exe para abrir la consola de consultas 

```
# Mostrar bases de datos
show dbs

# Crear y usar una base de datos
use curso_node_angular

# Añadir un registro a un fichero de mongo 
db.bookmarks.save({id: 1, tittle: 'titulo', foo: 'bar'})

# Mostrar el contenido de un fichero de mongo
db.bookmarks.find()
```

# Instalar el proyecto 

```
# Iniciar el proyecto
npm init

# Instalar una dependencia
npm install express --save 

# Instalar una dependecia solo para el entorno de desarrollo 
npm install nodemon --save-dev 

# Desinstalar una dependencia 
npm uninstall express --save

# Instalar todas las dependencias
npm install 
``` 

# Crear la base de datos
Desde la consola de mongo.exe
```
# Crear la base de datos
use music_app

# Insertar un registro en la tabla de artistas
db.artists.save({ name: 'Delafuente', description: 'Musica urbana', imagen: null });

# Mostrar el contenido de la tabla de artistas
db.artists.find();

# Buscar un _id en la tabla de artistas
db.artists.find({"_id": ObjectId("5f3c492349033231787cc8bd")});

# Eliminar un objeto de una coleccion por su _id
db.artists.remove({"_id": ObjectId("5f691dd01f4c921430d386af")});
```


# Angular
```
# Instalar angular-cli
npm install -g @angular/cli

# Lista de comandos de angular 
ng help

# Crear un proyecto base y ponerlo a disposicion por el puerto 4200 
ng new my-fisrt-proyect 
cd my-fisrt-proyect 
ng serve // npm start 

# Generar componentes, servicios...
ng generate <type> 
``` 
