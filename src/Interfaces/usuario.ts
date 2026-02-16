export type TipoUsuario = "tecnico" | "cliente" | "administrador";

// El mismo input se utiliza tanto para crear como para editar usuarios
export interface CrearUsuarioInput {
  nombre: string;
  apellido: string;
  cuil: string;
  telefono: string;
  direccion: string;
  mail: string;
  contraseña: string;
}

export interface LoginInput {
  mail: string;
  contraseña: string;
}

export interface DecodedToken {
  id: number;
  mail: string;
  tipo: TipoUsuario;
}
