using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class ParticipacionUsuarioGrupo
    {
        public int IdGrupo { get; set; }
        public int IdUsuario { get; set; }
        public int Rol { get; set; }

        public Grupo IdGrupoNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
