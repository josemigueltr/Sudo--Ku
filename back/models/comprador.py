from sqlalchemy import Column, String
from models.conexion_bd import Base
from sqlalchemy.orm import relationship

class Comprador(Base):

    __tablename__ = 'comprador'
    username = Column(String, primary_key = True)
    correo = Column(String)
    telefono = Column(String)
    contrasenia = Column(String)



    def __init__(self, username, correo, telefono, contrasenia):
        self.username = username
        self.correo = correo
        self.telefono = telefono
        self.contrasenia = contrasenia