using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class SubscripcionesRequest
    {
        public int IdUsuario { get; set; }
        public int IdEvento { get; set; }
        public int Aceptado { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
