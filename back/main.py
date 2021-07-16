# flask
from flask import Flask, request, make_response, redirect, session

# blueprints
from blueprints import auth, ordenes, productos

app = Flask(__name__)

app.config['SECRET_KEY'] = 'SUPER SEGURO'

app.register_blueprint(auth.bp)
app.register_blueprint(ordenes.bp)
app.register_blueprint(productos.bp)

