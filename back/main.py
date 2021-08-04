# flask
from flask import Flask

# flask-cors
from flask_cors import CORS

# blueprints
from blueprints import auth, ordenes, productos

app = Flask(__name__)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'ebarrotes@gmail.com'
app.config['MAIL_PASSWORD'] = 'ebarrotes@ingesoft'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# configuring CORS
CORS(app)

app.config['SECRET_KEY'] = 'SUPER SEGURO'

app.register_blueprint(auth.bp)
app.register_blueprint(ordenes.bp)
app.register_blueprint(productos.bp)

