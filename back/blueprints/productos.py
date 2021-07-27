# flask
from flask import Blueprint, jsonify

# models
from models.conexion_bd import Session
from models.producto import Producto

bp = Blueprint('productos', __name__, url_prefix='/productos')

@bp.route('/mas-vendidos', methods=['GET'])
def consultar_productos_mas_vendidos():
  # TODO controlador: consultar productos más vendidos
  pass

@bp.route('/', methods=['GET'])
def consultar_lista_productos():
  # TODO controlador: consultar lista de productos
  pass

@bp.route('/search/<query>', methods=['GET'])
def buscar_producto(query):
  session = Session()
  busqueda = session.query(Producto).filter(Producto.nombre.like('%{}%'.format(query)))
  return jsonify([p.to_dict() for p in busqueda])

@bp.route('/<id>', methods=['GET'])
def ver_informacion_producto(id):
  # TODO controlador: ver información de producto
  pass

@bp.route('/', methods=['POST'])
def agregar_producto(id):
  # TODO controlador: agregar producto
  pass

@bp.route('/<id>', methods=['PUT'])
def editar_producto(id):
  # TODO controlador: editar producto
  pass

@bp.route('/<id>', methods=['DELETE'])
def eliminar_producto(id):
  # TODO controlador: eliminar producto
  pass

@bp.route('/<id>/calificaciones', methods=['POST'])
def calificar_producto(id):
  # TODO controlador: calificar producto
  pass