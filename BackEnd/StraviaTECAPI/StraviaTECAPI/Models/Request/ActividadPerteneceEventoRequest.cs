using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class ActividadPerteneceEventoRequest
    {
        public int IdActividad { get; set; }
        public int IdEvento { get; set; }

        public Actividad IdActividadNavigation { get; set; }
        public Evento IdEventoNavigation { get; set; }
    }
}
