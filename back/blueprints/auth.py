# flask
from flask import Blueprint, json,jsonify,request,g,current_app
from flask.wrappers import Response
from werkzeug.security import  generate_password_hash, check_password_hash

# JWT
import jwt

# functools
from functools import wraps

#models
from models.conexion_bd import Session
from models.comprador import Comprador
from models.vendedor import Vendedor

#utilities
from utilities.usuario_utils import generar_contrasenia, envia_mail


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signin', methods=['POST'])
def registrarse():
  session = Session()
  username = request.json['username']
  correo = request.json['correo']
  telefono =request.json['telefono']
  rol =request.json['rol']
  contrasenia= generar_contrasenia()
  if(rol=='comprador'):
    usuario=Comprador(username,correo,telefono,generate_password_hash(contrasenia))
  elif (rol == 'vendedor'):
    usuario =Vendedor(username,correo,telefono,generate_password_hash(contrasenia))
  else:
    return jsonify ("server: rol invalido"),401
  usr=session.query(usuario.__class__).get(username)
  corr= session.query(usuario.__class__).filter(usuario.__class__.correo ==correo).first()
  if usr or corr:
    msg="username" if usr else "correo" 
    return jsonify(f"server: El {msg} ya se encuentra en uso"), 400
  try:
    session.add(usuario)
    envia_mail((correo,username,rol,contrasenia),"registro")
    session.commit()
  except:
    session.rollback()
    return jsonify("server: Ha ocurrido un error intenta mas tarde"), 401
  return jsonify(f"server: Exito {rol} registrado.")

@bp.route('/login', methods=['POST'])
def iniciar_sesion():
  """Caso de uso para inicio de sesión.
  
  Maneja la autenticación de un usuario en el sistema."""
  session = Session()

  # Datos obtenidos del formulario.
  username = request.json['username']
  password = request.json['password']
  es_comprador = request.json['es_comprador']

  # Busca al usuario en la BBDD.
  user = None
  if es_comprador:
    user = session.query(Comprador).filter(username).first()
  else:
    user = session.query(Vendedor).filter(username).first()
  
  # Si el usuario está en la BBDD, verifica los hashes de las contraseñas.
  if user and check_password_hash(user.contrasenia, password):
    # Generación del token.
    token = jwt.encode({'sub': user.username}, 
                       current_app.config['SECRET_KEY'],
                       algorithm="RS256")  # RSA Signature con SHA-256
    return jsonify({'token' : token.decode('UTF-8'),
                    'es_comprador': request.json['es_comprador']})

  return jsonify(f"server: los datos son incorrectos"), 401  # 401: Unauthorized.

@bp.route('/logout', methods=['POST'])
def cerrar_sesion():
  # TODO: cerrar sesión
  pass

@bp.before_app_request
def load_user():
  '''
  Funcion que carga la informacion del usuario en la variable g.user
  si el request tiene el token como header. Tambien se agrega una bandera
  es_comprador a g.user que indica si el usuario que realiza la peticion
  es un comprador o un vendedor
  '''
  token = None
  if 'Authorization' in request.headers:
    # Authorization: Bearer ...
    token = request.headers['Authorization'][7:]
  if token is None:
    g.user = None
  else:
    data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
    session = Session()
    es_comprador = True
    user = session.query(Comprador).get(data['sub'])
    if user is None:
      es_comprador = False
      user = session.query(Vendedor).get(data['sub'])
    if user is None:
      g.user = None
    else:
      user_dict = dict(
        username=user.username,
        correo=user.correo,
        telefono=user.telefono,
        es_comprador=es_comprador
      )
      g.user = user_dict

def login_required_comprador(controlador):
  '''
  Decorador que devuelve un error 401 Unauthorized
  si es que no se pudo obtener la informacion del usuario
  en la variable g y si el usuario no es comprador. Se ejecuta antes del controlador con este decorador
  '''
  @wraps(controlador)
  def nuevo_controlador(**kwargs):
    if not (g.user and g.user['es_comprador']):
      return jsonify({'mensaje': 'usuario no autorizado'}), 401
    return controlador(**kwargs)
  return nuevo_controlador

def login_required_vendedor(controlador):
  '''
  Decorador que devuelve un error 401 Unauthorized
  si es que no se pudo obtener la informacion del usuario
  en la variable g y el usuario no es vendedor. Se ejecuta antes del controlador con este decorador
  '''
  @wraps(controlador)
  def nuevo_controlador(**kwargs):
    if not g.user or g.user['es_comprador']:

      return jsonify({'mensaje': 'usuario no autorizado'}), 401
    return controlador(**kwargs)
  return nuevo_controlador