using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class UsuarioRol
    {
        public int IdUsuario { get; set; }
        public int IdRol { get; set; }

        public Rol IdRolNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
