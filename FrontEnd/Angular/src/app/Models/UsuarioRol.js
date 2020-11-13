export interface UsuarioRol{
    
    IdUsuario: Number,
    IdRol: Number,
    IdRolNavigation: [
        Id: Number,
        Nombre: String
    ],
    IdUsuarioNavigation: [
        cedula: Number,
        nombre: String,
        apellido: String,
        nombreUsuario: String,
        contraseña: String,
        nacionalidad: String,
        fechaNacimiento: String,
        Foto: ByteLengthChunk //no se si esto esta bien
    ]
}
