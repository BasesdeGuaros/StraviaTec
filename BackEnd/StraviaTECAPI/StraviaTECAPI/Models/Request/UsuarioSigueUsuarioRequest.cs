using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class UsuarioSigueUsuarioRequest
    {
        public int IdSeguidor { get; set; }
        public int IdSeguido { get; set; }

        public Usuario IdSeguidoNavigation { get; set; }
        public Usuario IdSeguidorNavigation { get; set; }
    }
}
