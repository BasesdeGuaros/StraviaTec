using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class TipoEvento
    {
        public TipoEvento()
        {
            EventoTieneTipo = new HashSet<EventoTieneTipo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<EventoTieneTipo> EventoTieneTipo { get; set; }
    }
}
