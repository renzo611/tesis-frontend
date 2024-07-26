import { DocenteDTO } from "./Docente-dto";

export interface BuscarCarreraResponseModel{
    id: number;
    name: string;
    director: DocenteDTO
}