using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class EventoPatrocinadoPatrocinador
    {
        public int IdEvento { get; set; }
        public int IdPatrocinador { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public Patrocinador IdPatrocinadorNavigation { get; set; }
    }
}
