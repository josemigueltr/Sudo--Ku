# flask
from flask import Blueprint,jsonify,request
from werkzeug.security import  generate_password_hash

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
    return jsonify(f"server: El {msg} ya se encuentra en uso"), 401
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
  # TODO: iniciar sesión
  pass

@bp.route('/logout', methods=['POST'])
def cerrar_sesion():
  # TODO: cerrar sesión
  pass