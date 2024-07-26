export interface NuevoUsuarioDTO {
    name: String;
    lastName: String;
    userName: String;
    email: String;
    password: String;
    role: RoleName;
}

enum RoleName {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_DIRECTOR_CARRERA = 'ROLE_DIRECTOR_CARRERA',
    ROLE_BEDELIA = 'ROLE_BEDELIA'
  }
  