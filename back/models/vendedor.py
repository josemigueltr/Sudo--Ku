from sqlalchemy import Column, String


class Vendedor(Base):

    __tablename__ = 'vendedor'
    username = Column(String, primary_key = True)
    correo = Column(String)
    telefono = Column(String)
    contrasenia = Column(String)


    def __init__(self, username, correo, telefono, contrasenia):
        self.username = username
        self.correo = correo
        self.telefono = telefono
        self.contrasenia = contrasenia

