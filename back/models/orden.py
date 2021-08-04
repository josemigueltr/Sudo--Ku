from sqlalchemy import Column, String,Integer,ForeignKey
from models.conexion_bd import Base
from sqlalchemy.orm import relationship

   
class Orden(Base):
    __tablename__ = 'orden'
    id_orden = Column(Integer,primary_key=True)
    username = Column(String, ForeignKey('comprador.username'))
    id_datos_envio = Column(Integer, ForeignKey('datos_de_envio.id_datos_envio'))
    total=Column(Integer)
    compras_prod = relationship('Compra_producto', backref='orden_id')


    def __init__(self,comprador,direccion):
        self.username=comprador.username
        self.id_datos_envio=direccion.id_datos_envio   
        self.total=0