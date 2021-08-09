# flask
from flask import Blueprint, jsonify, request
from sqlalchemy import func
from flask.wrappers import Response

# models
from models.conexion_bd import Session
from models.producto import Producto
from models.opinion import Opinion
from models.comprador import Comprador
from models.compra_producto import Compra_producto

# blueprints
from .auth import login_required

# aws
from boto3.exceptions import S3UploadFailedError

# utilities
from utilities.amazon import upload_file

bp = Blueprint('productos', __name__, url_prefix='/productos')

@bp.route('/mas-vendidos', methods=['GET'])
def consultar_productos_mas_vendidos():
  session = Session()
  query = session.query(Producto).join(Compra_producto, Producto.id_producto == Compra_producto.id_producto).group_by(Compra_producto.id_producto).order_by(func.sum(Compra_producto.cantidad).desc() )
  result = query.all()
  return jsonify([producto.to_dict() for  producto in result])


@bp.route('/', methods=['GET'])
def consultar_lista_productos():
  session = Session()
  productos = session.query(Producto).all()
  return jsonify([p.to_dict() for p in productos])

@bp.route('/search/<query>', methods=['GET'])
def buscar_producto(query):
  session = Session()
  busqueda = session.query(Producto).filter(Producto.nombre.like('%{}%'.format(query)))
  return jsonify([p.to_dict() for p in busqueda])

@bp.route('/<id>', methods=['GET'])
def ver_informacion_producto(id):
  session = Session()
  producto = session.query(Producto).get(id)
  respuesta = {}
  if(producto is not None):
    respuesta['producto'] = producto.to_dict()
    if(producto.opiniones is not None):
      opiniones = producto.opiniones
      respuesta['opiniones'] = [opinion.as_dict() for opinion in opiniones]

  return jsonify(respuesta)

@bp.route('/<username>', methods=['POST'])
def agregar_producto(username):
  session = Session()
  params = request.form

  nombre = params['nombre']
  descripcion = params['descripcion']
  precio =  params['precio']
  calificacion = params['calificacion']
  stock = params['stock']

  producto = Producto(username, nombre,descripcion, precio, calificacion, stock, '')
  if 'foto' in request.files:
    try:
      producto.foto = upload_file(request.files['foto'])
    except S3UploadFailedError as e:
      return jsonify(dict(
        message=str(e)
      )), 500

  session.add(producto)
  session.commit()
  return jsonify(producto.to_dict()), 200


@bp.route('/<id>', methods=['PUT'])
@login_required
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
