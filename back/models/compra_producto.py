from sqlalchemy import Column,Integer,ForeignKey
from models.conexion_bd import Base


class Compra_producto(Base):
    __tablename__ = 'compra_producto'
    id_orden = Column(Integer, ForeignKey('orden.id_orden'),primary_key=True)
    #agregar relationship producto
    
    id_producto = Column(Integer, ForeignKey('producto.id_producto'),primary_key=True)
    cantidad=Column(Integer)

    def __init__(self, cantidad,producto):
        self.cantidad = cantidad
        self.id_producto = producto.id_producto
        