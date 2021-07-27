from sqlalchemy import Column, Integer, String, Float
from .conexion_bd import Base

class Producto(Base):
    __tablename__ = 'producto'

    id_producto = Column(Integer, primary_key=True)
    username = Column(Integer)
    nombre = Column(String(20))
    descripcion = Column(String)
    precio = Column(Float)
    calificacion = Column(Integer)
    stock = Column(Integer)
    foto = Column(String(100))

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
            id_producto=self.id_producto,
            username=self.username,
            nombre=self.nombre,
            descripcion=self.descripcion,
            precio=self.precio,
            calificacion=self.calificacion,
            stock=self.stock,
            foto=self.foto
        )