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
  nombre: string;
  mail: string;
  tipo: TipoUsuario;
}
