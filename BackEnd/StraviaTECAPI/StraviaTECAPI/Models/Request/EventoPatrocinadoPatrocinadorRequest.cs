using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class EventoPatrocinadoPatrocinadorRequest
    {
        public int IdEvento { get; set; }
        public int IdPatrocinador { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public Patrocinador IdPatrocinadorNavigation { get; set; }
    }
}
