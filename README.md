
# ApiRest Blog

Esta es una ApiRest para un blog usando MongoDB



## Instalación

Levantar los contenedores de mongo con Docker-compose

```bash
  docker-compose up -d
```

Crear la imagen de docker referente a Node 22 necesaria para correr la Api, usando el dockerfile que esta en el directorio

```bash
  docker build -t Node22-home
```
Crear el contenedor para poder ejecutar el proyecto como un dev container

```bash
  docker run -it --network apirest-blog_mongo-api-blog --rm --name node-22 -p 3002:3000  -v .:/home/app/ node22-home /bin/sh
```

Ya dentro del contenedor, posicionarse dentro de la carpeta app

```bash
  cd app
```

corremos el proyecto 

```bash
  npm start
```