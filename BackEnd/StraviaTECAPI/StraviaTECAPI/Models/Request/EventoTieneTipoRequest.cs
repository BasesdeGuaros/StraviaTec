using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class EventoTieneTipoRequest
    {
        public int IdEvento { get; set; }
        public int IdTipoEvento { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public TipoEvento IdTipoEventoNavigation { get; set; }
    }
}
