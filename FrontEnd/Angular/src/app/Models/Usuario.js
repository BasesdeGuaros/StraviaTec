export interface Usuario{
    cedula: Number;
    nombre: String;
    apellido: String;
    nombreUsuario: String;
    contrasena: String;
    nacionalidad: String;
    fechaNacimiento: String;
    Foto: ByteLengthChunk; //no se si esto esta bien
}