# flask
from .auth import login_required_comprador
from flask import Blueprint,jsonify,request,g

#models
from models.conexion_bd import Session
from models.comprador import Comprador
from models.compra_producto import Compra_producto
from models.datos_de_envio import Datos_de_envio 
from models.producto import Producto
from models.orden import Orden  

#utilities
from utilities.usuario_utils import envia_mail

bp = Blueprint('ordenes', __name__, url_prefix='/ordenes')

@bp.route('/', methods=['POST'])
@login_required_comprador
def comprar_producto():	
  session=Session()
  productos = request.json['productos']
  direccion = request.json['direccion_envio']
  cliente=g.user['username']
  
  try:
    direccion_envio=Datos_de_envio(direccion['estado'],direccion['cp'],direccion['direccion'],direccion['calles'])
    session.add(direccion_envio)
    session.commit()
    comprador=cliente
   
    ordenes=Orden(comprador,direccion_envio)	
    
    for prod in productos:
      producto=session.query(Producto).get(prod['id_producto'])
      
      if not producto:
        return jsonify("server: El producto no existe"),401

        #reviso que el stock sea suficiente
      elif producto.stock - prod['cantidad'] < 0:
        return jsonify("server: Stock insuficiente"),401

        #actualizo stock
      producto.stock-= int (prod['cantidad'])
      
      ordenes.total += float(producto.precio) * float(prod['cantidad']) 
      compra=Compra_producto(prod['cantidad'] , producto)
      ordenes.compras_prod.append(compra)
      
    
    session.add(ordenes)
    correo=g.user['correo']
    username=cliente
    total=ordenes.total
    envia_mail((correo,username,total),"compra")
    session.commit()
  
  except:
    session.rollback()
    return  jsonify("server: Ha ocurrido un error intenta mas tarde"), 401
  return jsonify("server: La compra se ha realizado correctamente")