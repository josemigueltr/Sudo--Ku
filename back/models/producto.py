from sqlalchemy import Column, Integer, String, Float
from .conexion_bd import Base

class Producto(Base):
    __tablename__ = 'producto'

    id_producto = String()
    username = Integer()
    nombre = String(20)
    descripcion = String()
    precio = Float()
    calificacion = Integer()
    stock = Integer()
    foto = String(100)