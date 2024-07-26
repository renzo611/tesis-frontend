export interface BuscarUsuarioResponseModel {
    id: number;
    name: string;
    lastName: string;
    userName: string;
    email: string;
    role: Role
  }

interface Role{
  id:number,
  roleName:string
}
