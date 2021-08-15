from sqlalchemy import Column, Integer, String, Date, ForeignKey
from models.conexion_bd import Base

class Opinion(Base):
    """Modelo para opinion."""
    __tablename__ = 'opinion'
    id_opinion = Column(Integer, primary_key = True) 
    username = Column(String(20), ForeignKey('comprador.username')) 
    id_producto = Column(Integer, ForeignKey('producto.id_producto'))
    valoracion = Column(Integer)
    contenido = Column(String)
    fecha = Column(Date) 

    """Redefinicion del metodo constructor predefinido por sqlalchemy"""
    def __init__(self, valoracion, contenido, fecha):
        self.valoracion = valoracion
        self.contenido = contenido
        self.fecha = fecha

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
