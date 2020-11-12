using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class ActividadClasificaDeporte
    {
        public int IdActividad { get; set; }
        public int IdDeporte { get; set; }

        public Actividad IdActividadNavigation { get; set; }
        public Deporte IdDeporteNavigation { get; set; }
    }
}
