export interface AulaDTO{
    name:String,
    capacity:number,
    classroomType:ClasroomType
}

enum ClasroomType {
    AULA_COMUN = "AULA_COMUN",
    AUDITORIO = "AUDITORIO",
    LABORATORIO = "LABORATORIO"
  }
