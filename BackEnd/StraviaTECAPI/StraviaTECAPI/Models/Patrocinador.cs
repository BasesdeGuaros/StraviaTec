using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Patrocinador
    {
        public Patrocinador()
        {
            EventoPatrocinadoPatrocinador = new HashSet<EventoPatrocinadoPatrocinador>();
        }

        public int Id { get; set; }
        public byte[] Logo { get; set; }
        public string Nombre { get; set; }
        public int Numero { get; set; }
        public string Representante { get; set; }

        public ICollection<EventoPatrocinadoPatrocinador> EventoPatrocinadoPatrocinador { get; set; }
    }
}
