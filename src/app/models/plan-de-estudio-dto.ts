import { CarreraDTO } from "./Carrera-dto";

export interface PlanDeEstudioDTO{
    id:number,
    name:String,
    career: CarreraDTO
}