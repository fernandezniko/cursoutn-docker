Aplicacion con node js utilizando docker compose.

Pasos para probar, clonar el repo y correr el comando docker compose up -d

## API Endpoint
| Metodo | Endpoint              | Descripcion   |
| ------ | --------------------- | ------------- |
| GET | /test | Devuelve la hora actual del servidor de la BD
| GET | /facts | Devuele una lista de facts
| POST | /facts | Se encarga de guardar un nuevo fact en la base de datos
| DELETE | /facts:id | Elimina un fact por su id
