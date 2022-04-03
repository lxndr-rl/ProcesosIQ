## Endpoints

Por defecto DJango usa el puerto 8000 por lo que el URL base es `http://localhost:8000/`

### Listar Personas

    GET /api/personas/

    Retorna una lista de personas.

<details>
<summary> Respuestas: </summary>

Ok

```json
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "nombre": "Ariel",
      "apellido": "Aguayo",
      "telefono": "0958918063",
      "email": "alexanderaguayo43@gmail.com",
      "fNacimiento": "2001-02-15"
    },
    ...
  ]
}
```

Error

```json
{
  "status": "error",
  "message": "No se encontraron personas registradas"
}
```

</details>
### Listar Persona por ID

    GET /api/personas/<id>/

    Retorna una persona especificada por su id.

<details>
<summary> Respuestas: </summary>

Ok

```json
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "nombre": "Ariel",
      "apellido": "Aguayo",
      "telefono": "0958918063",
      "email": "alexanderaguayo43@gmail.com",
      "fNacimiento": "2001-02-15"
    }
  ]
}
```

Error

```json
{
  "status": "error",
  "message": "No se encontró la persona"
}
```

</details>
### Crear Persona

    POST /api/personas/

    Crea una nueva persona.

    Parámetros (json):
    - nombre (requerido)
    - apellido (requerido)
    - telefono (requerido)
    - email (opcional)
    - fNacimiento (opcional)

<details>
<summary> Respuestas: </summary>

Ok

```json
{
  "status": "ok",
  "message": "Persona creada correctamente"
}
```

Error

```json
{
  "status": "error",
  "message": "No se ingresó nombre, apellido o teléfono"
}
```

</details>
### Actualizar Persona

    PUT /api/personas/<id>/

    Actualiza una persona especificada por su id.

    Parámetros (json):
    - nombre (opcional - pero no puede estar vacío)
    - apellido (opcional - pero no puede estar vacío)
    - telefono (opcional - pero no puede estar vacío)
    - email (opcional)
    - fNacimiento (opcional)

<details>
<summary> Respuestas: </summary>
Ok

```json
{
  "status": "ok",
  "message": "<id>:<nombre> actualizado correctamente"
}
```

Error

```json
{
  "status": "error",
  "message": "No se encontró la persona"
}
```

</details>
### Eliminar Persona

    DELETE /api/personas/<id>/

    Elimina una persona especificada por su id.

<details>
<summary> Respuestas: </summary>
Ok

```json
{
  "status": "ok",
  "message": "<id> eliminado correctamente"
}
```

Error

```json
{
  "status": "error",
  "message": "No se encontró la persona"
}
```

</details>
