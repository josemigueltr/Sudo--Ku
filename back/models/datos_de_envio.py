from sqlalchemy import Column, Integer, String
from models.conexion_bd import Base
from sqlalchemy.orm import relationship


class Datos_de_envio(Base):
    """Modelo para datos de envio."""
    __tablename__ = "datos_de_envio"
    id_datos_envio = Column(Integer, primary_key=True)
    estado = Column(String)
    cp = Column(String)
    direccion = Column(String)
    entre_calles = Column(String)
    
    def __init__(self, estado, cp, direccion, entre_calles):
        """Constructor de la clase."""
        self.estado = estado
        self.cp = cp
        self.direccion = direccion
        self.entre_calles = entre_calles
