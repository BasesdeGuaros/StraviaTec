using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class EventoTieneTipo
    {
        public int IdEvento { get; set; }
        public int IdTipoEvento { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public TipoEvento IdTipoEventoNavigation { get; set; }
    }
}
