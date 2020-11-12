using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Grupo
    {
        public Grupo()
        {
            ParticipacionUsuarioGrupo = new HashSet<ParticipacionUsuarioGrupo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<ParticipacionUsuarioGrupo> ParticipacionUsuarioGrupo { get; set; }
    }
}
