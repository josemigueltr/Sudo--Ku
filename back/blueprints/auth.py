# flask
from flask import Blueprint

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signin', methods=['POST'])
def signin():
  # TODO: registrarse
  pass

@bp.route('/login', methods=['POST'])
def login():
  # TODO: iniciar sesión
  pass

@bp.route('/logout', methods=['POST'])
def logout():
  # TODO: cerrar sesión
  pass