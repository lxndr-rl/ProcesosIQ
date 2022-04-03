# Prueba técnica. Parte 1 | ProcesosIQ

### Instrucciones

Desarrollar un sistema que permita el registro de contactos, se debe poder almacenar los siguientes campos nombre, apellido, número de teléfono, correo electrónico, fecha de nacimiento. Los campos obligatorios son nombre, apellido y teléfono.

## Ejecución

### Python

#### Instalar librerías de Python.

Dentro de la carpeta _backend_ ejecutar el siguiente comando:

```bash
python3 -m pip install -r requirements.txt
```

#### Configurar .env (Usado para la conexión a la base de datos)

La ruta el archivo `.env` es `/backend/ProcesosIQ/`
Dentro de esta hay un archivo llamado `.env.example` el cual se debe renombrar a `.env` para posteriormente configurar la conexión a la base de datos.

#### Django migrations

Dentro de la carpeta _backend_ ejecutar el siguiente comando:

```bash
python3 manage.py makemigrations
```

luego

```bash
python3 manage.py migrate
```

#### Django runserver

El servidor está listo para iniciarse.

```bash
python3 .\manage.py runserver
```

### [Endpoints](https://github.com/lxndr-rl/ProcesosIQ/blob/master/backend/README.md)

### React

#### Instalar librerías de ReactJS

Dentro de la carpeta _frontend_ ejecutar el siguiente comando:

```bash
yarn install
```

o usando npm

```bash
npm install
```

### Configurar URLs

Los urls del API están definidos en `/frontend/src/util/index.js`

### React Start

Para iniciar la ejecución de ReactJS se debe ejecutar el siguiente comando:

```bash
yarn start
```

o usando npm

```bash
npm start
```
