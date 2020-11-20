using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Request
{
    public class PatrocinadorRequest
    {
        public int Id { get; set; }
        public byte[] Logo { get; set; }
        public string Nombre { get; set; }
        public int Numero { get; set; }
        public string Representante { get; set; }

        public ICollection<EventoPatrocinadoPatrocinador> EventoPatrocinadoPatrocinador { get; set; }
    }
}
