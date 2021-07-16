# eBarrotes
Sistema web de compra y venta de articulos electrónicos

## Requisitos
- Node >= 14.0.0
- Python >= 3.3

## Instalación

- Instala las dependencias del front-end del proyecto:
```
cd front
npm install
```
- Crea el entorno virtual e instala las dependencias para el back-end del proyecto:
```
cd back
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Ejecución
- Ejecuta el servidor del front-end del proyecto:
```
cd front
npm start
```
- Ejecuta el servidor del back-end del proyecto:
```
cd back
source venv/bin/activate
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```