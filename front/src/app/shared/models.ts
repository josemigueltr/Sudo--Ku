export interface Producto {
  id_producto: number
  username: string
  nombre: string
  descripcion: string
  precio: number
  calificacion: number
  stock: number
  foto: string
}

export interface Vendedor {
  username: string
  correo: string
  telefono: string
}

export interface Orden {
  id_orden: number
  username: string
  id_datos_envio: number
  total: number
  compras_productos: CompraProducto[]
}

export interface Opinion {
  id_opinion: number
  username: string
  id_producto: number
  valoracion: number
  contenido: string
  fecha: string
}

export interface DatosDeEnvio {
  id_datos_envio: number
  estado: string
  cp: string
  direccion: string
  entre_calles: string
}

export interface Comprador {
  username: string
  correo: string
  telefono: string
}

export interface CompraProducto {
  id_orden: number
  id_producto: number
  cantidad: number
}

export interface ProductoOpinion {
  producto: Producto
  opiniones: Opinion[]
}

export interface Item {
  producto: Producto
  cantidad: number
}
