using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Categoria
    {
        public Categoria()
        {
            Evento = new HashSet<Evento>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripción { get; set; }

        public ICollection<Evento> Evento { get; set; }
    }
}
