using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Rol
    {
        public Rol()
        {
            UsuarioRol = new HashSet<UsuarioRol>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<UsuarioRol> UsuarioRol { get; set; }
    }
}
