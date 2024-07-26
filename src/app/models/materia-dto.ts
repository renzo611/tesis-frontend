import { DocenteDTO } from "./Docente-dto";
import { PlanDeEstudioDTO } from "./plan-de-estudio-dto";

export interface MateriaDTO{
    id:number,
    name:string
    numberRegistered:number,
    periodType:PeriodType;
    subjectYear:number,
    weeklyLoad:number,
    studyPlan: PlanDeEstudioDTO,
    overlappingMatters: MateriaDTO[],
    teachers: DocenteDTO[]
}

enum PeriodType{ 
    ANUAL,PRIMER_CUATRIMESTRE,SEGUNDO_CUATRIMESTRE
}