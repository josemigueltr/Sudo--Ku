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

    def __init__(self, username, nombre, descripcion, precio, calificacion, stock, foto):
        self.username = username
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.calificacion = calificacion
        self.stock = stock
        self.foto = foto

    def to_dict(self):
        '''
        regresa una representación del modelo en un diccionario
        '''
        return dict(
            username=self.username,
            nombre=self.nombre,
            descripcion=self.descripcion,
            precio=self.precio,
            calificacion=self.calificacion,
            stock=self.stock,
            foto=self.foto
        )