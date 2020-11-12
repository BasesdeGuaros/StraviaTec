using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Deporte
    {
        public Deporte()
        {
            ActividadClasificaDeporte = new HashSet<ActividadClasificaDeporte>();
            Evento = new HashSet<Evento>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<ActividadClasificaDeporte> ActividadClasificaDeporte { get; set; }
        public ICollection<Evento> Evento { get; set; }
    }
}
