# flask
from flask import Blueprint, jsonify, request

# models
from models.conexion_bd import Session
from models.producto import Producto

# aws
from boto3.exceptions import S3UploadFailedError

# utilities
from utilities.amazon import upload_file

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
def buscar_producto():
  # TODO controlador: buscar producto
  pass

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
  session = Session()
  producto = session.query(Producto).get(id)
  params = request.form
  
  producto.nombre = params['nombre'] if 'nombre' in params else producto.nombre
  producto.descripcion = params['descripcion'] if 'descripcion' in params else producto.descripcion
  producto.precio = params['precio'] if 'precio' in params else producto.precio
  producto.calificacion = params['calificacion'] if 'calificacion' in params else producto.calificacion
  producto.stock = params['stock'] if 'stock' in params else producto.stock

  if 'foto' in request.files:
    try:
      producto.foto = upload_file(request.files['foto'])
    except S3UploadFailedError as e:
      return jsonify(dict(
        message=str(e)
      )), 500

  session.commit()
  return jsonify(producto.to_dict()), 200

@bp.route('/<id>', methods=['DELETE'])
def eliminar_producto(id):
  # TODO controlador: eliminar producto
  pass

@bp.route('/<id>/calificaciones', methods=['POST'])
def calificar_producto(id):
  # TODO controlador: calificar producto
  pass