using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Subscripciones
    {
        public int IdUsuario { get; set; }
        public int IdEvento { get; set; }
        public int Aceptado { get; set; }

        public Evento IdEventoNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
