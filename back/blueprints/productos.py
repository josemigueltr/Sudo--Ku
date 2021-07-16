# flask
from flask import Blueprint

bp = Blueprint('productos', __name__, url_prefix='/productos')

@bp.route('/mas-vendidos', methods=['GET'])
def mas_vendidos():
  # TODO controlador: consultar productos más vendidos
  pass

@bp.route('/', methods=['GET'])
def list():
  # TODO controlador: consultar lista de productos
  pass

@bp.route('/search/<query>', methods=['GET'])
def search():
  # TODO controlador: buscar producto
  pass

@bp.route('/<id>', methods=['GET'])
def retrieve(id):
  # TODO controlador: ver información de producto
  pass

@bp.route('/', methods=['POST'])
def update(id):
  # TODO controlador: agregar producto
  pass

@bp.route('/<id>', methods=['PUT'])
def update(id):
  # TODO controlador: editar producto
  pass

@bp.route('/<id>', methods=['DELETE'])
def destroy(id):
  # TODO controlador: eliminar producto
  pass

@bp.route('/<id>/calificaciones', methods=['POST'])
def calificar(id):
  # TODO controlador: calificar producto
  pass