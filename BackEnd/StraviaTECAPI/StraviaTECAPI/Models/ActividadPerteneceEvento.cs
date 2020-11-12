using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class ActividadPerteneceEvento
    {
        public int IdActividad { get; set; }
        public int IdEvento { get; set; }

        public Actividad IdActividadNavigation { get; set; }
        public Evento IdEventoNavigation { get; set; }
    }
}
