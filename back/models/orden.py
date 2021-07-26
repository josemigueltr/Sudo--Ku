from sqlalchemy import Column, String,Integer,ForeignKey
from models.conexion_bd import Base
from sqlalchemy.orm import relationship

#Notas
# Falta Agregar relationship a modelo de datos de envio y
# modelo comprador
   

class Orden(Base):
    __tablename__ = 'orden'
    id_orden = Column(Integer,primary_key=True)
    username = Column(String, ForeignKey('comprador.username'))
    id_datos_envio = Column(Integer, ForeignKey('datos_de_envio.id_datos_envio'))
    total=Column(Integer)
    compras_productos = relationship("compra_producto", blackref='id_orden')

    
#orden(total,comprador=,direccion=)
    def __init__(self,total):
        self.total = total
    
