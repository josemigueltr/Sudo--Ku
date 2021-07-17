# flask
from flask import Blueprint

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signin', methods=['POST'])
def registrarse():
  # TODO: registrarse
  pass

@bp.route('/login', methods=['POST'])
def iniciar_sesion():
  # TODO: iniciar sesión
  pass

@bp.route('/logout', methods=['POST'])
def cerrar_sesion():
  # TODO: cerrar sesión
  pass