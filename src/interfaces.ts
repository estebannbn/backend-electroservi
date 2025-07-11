export type TipoUsuario = "tecnico" | "cliente" | "administrador" | null;



export interface CrearUsuarioInput {
  nombre: string;
  apellido: string;
  cuil: string;
  telefono: string;
  direccion: string;
  mail: string;
  contraseña: string;
  repetirContraseña: string;
}

export interface CrearServicioInput {
  fechaLlegadaEstimada: EpochTimeStamp;
  tipoElectrodomestico: {
    nombre: 'Heladera' | 'Aire Acondicionado' | 'Lavarropas'
    marca: 'Samsung'|'LG' |'Hitachi'
    modelo: 'XP1' | 'GHY23' |'LTYODF3'
  };


}