using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Actividad = new HashSet<Actividad>();
            Evento = new HashSet<Evento>();
            ParticipacionUsuarioGrupo = new HashSet<ParticipacionUsuarioGrupo>();
            Subscripciones = new HashSet<Subscripciones>();
            UsuarioRol = new HashSet<UsuarioRol>();
            UsuarioSigueUsuarioIdSeguidoNavigation = new HashSet<UsuarioSigueUsuario>();
            UsuarioSigueUsuarioIdSeguidorNavigation = new HashSet<UsuarioSigueUsuario>();
        }

        public int Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string NombreUsuario { get; set; }
        public string Contraseña { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public byte[] Foto { get; set; }

        public ICollection<Actividad> Actividad { get; set; }
        public ICollection<Evento> Evento { get; set; }
        public ICollection<ParticipacionUsuarioGrupo> ParticipacionUsuarioGrupo { get; set; }
        public ICollection<Subscripciones> Subscripciones { get; set; }
        public ICollection<UsuarioRol> UsuarioRol { get; set; }
        public ICollection<UsuarioSigueUsuario> UsuarioSigueUsuarioIdSeguidoNavigation { get; set; }
        public ICollection<UsuarioSigueUsuario> UsuarioSigueUsuarioIdSeguidorNavigation { get; set; }
    }
}
