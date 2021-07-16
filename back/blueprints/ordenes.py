# flask
from flask import Blueprint

bp = Blueprint('ordenes', __name__, url_prefix='/ordenes')

@bp.route('/', methods=['POST'])
def create():
  # TODO controlador: comprar producto
  pass