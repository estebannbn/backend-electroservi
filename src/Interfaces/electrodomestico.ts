export interface CrearElectrodomesticoInput {
    tipo: TipoElectrodomestico;
    modelo: string;
    marca: string;
    clienteId: number;
}

enum TipoElectrodomestico {
    AIRE_ACONDICIONADO = "AIRE_ACONDICIONADO",
    LAVARROPAS = "LAVARROPAS",
    HELADERA = "HELADERA"
}