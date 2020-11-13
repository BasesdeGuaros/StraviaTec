using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class ActividadClasificaDeporteRequest
    {
        public int IdActividad { get; set; }
        public int IdDeporte { get; set; }

        public Actividad IdActividadNavigation { get; set; }
        public Deporte IdDeporteNavigation { get; set; }
    }
}
