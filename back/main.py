# flask
from flask import Flask, request, make_response, redirect, session

# blueprints
from blueprints import auth, ordenes, productos

app = Flask(__name__)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'ebarrotes@gmail.com'
app.config['MAIL_PASSWORD'] = 'ebarrotes@ingesoft'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['SECRET_KEY'] = 'SUPER SEGURO'
app.config['SECRET_KEY'] = 'SUPER SEGURO'

app.register_blueprint(auth.bp)
app.register_blueprint(ordenes.bp)
app.register_blueprint(productos.bp)

