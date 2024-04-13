## Curso UTN Docker

Aplicacion con node js utilizando docker compose.

## Intrucciones para probarlo
Clonar el repo y correr el comando:

```bash
docker compose up -d
```
Ir a la siguiente url para ver localmente la app levantada: 

```bash
localhost:3000
```

## API Endpoint
| Metodo | Endpoint              | Descripcion   |
| ------ | --------------------- | ------------- |
| GET | /api/test | Devuelve la hora actual del servidor de la BD
| GET | /api/facts | Devuele una lista de facts
| POST | /api/facts | Se encarga de guardar un nuevo fact en la base de datos
| DELETE | /api/facts:id | Elimina un fact por su id

## App
![image](https://github.com/fernandezniko/cursoutn-docker/blob/main/src/static/assets/screen1.png)
![image](https://github.com/fernandezniko/cursoutn-docker/blob/main/src/static/assets/screen2.png)
