using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class GrupoRequest
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<ParticipacionUsuarioGrupo> ParticipacionUsuarioGrupo { get; set; }
    }
}
