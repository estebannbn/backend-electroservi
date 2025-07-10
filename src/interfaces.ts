export type TipoUsuario = "tecnico" | "cliente" | "administrador";

export interface CrearUsuarioInput {
  nombre: string;
  apellido: string;
  cuil: string;
  telefono: string;
  direccion: string;
  mail: string;
  contraseña: string;
}