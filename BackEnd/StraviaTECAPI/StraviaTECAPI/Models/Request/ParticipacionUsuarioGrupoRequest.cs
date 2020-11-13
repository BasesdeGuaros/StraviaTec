using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class ParticipacionUsuarioGrupoRequest
    {
        public int IdGrupo { get; set; }
        public int IdUsuario { get; set; }
        public int Rol { get; set; }

        public Grupo IdGrupoNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
