using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class UsuarioSigueUsuario
    {
        public int IdSeguidor { get; set; }
        public int IdSeguido { get; set; }

        public Usuario IdSeguidoNavigation { get; set; }
        public Usuario IdSeguidorNavigation { get; set; }
    }
}
