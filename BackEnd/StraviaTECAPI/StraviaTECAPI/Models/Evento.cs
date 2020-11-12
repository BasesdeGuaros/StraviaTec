using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Evento
    {
        public Evento()
        {
            ActividadPerteneceEvento = new HashSet<ActividadPerteneceEvento>();
            EventoPatrocinadoPatrocinador = new HashSet<EventoPatrocinadoPatrocinador>();
            EventoTieneTipo = new HashSet<EventoTieneTipo>();
            Subscripciones = new HashSet<Subscripciones>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public DateTime? Fecha { get; set; }
        public int IdAdmin { get; set; }
        public string Recorrido { get; set; }
        public string Cuenta { get; set; }
        public int Categoria { get; set; }
        public int? Costo { get; set; }
        public int? Privado { get; set; }
        public int IdDeporte { get; set; }
        public decimal? Kilometraje { get; set; }
        public int? Elevación { get; set; }
        public DateTime? FechaInicial { get; set; }
        public DateTime? FechaFinal { get; set; }
        public int? FondoAltitud { get; set; }
        public byte[] Foto { get; set; }

        public Categoria CategoriaNavigation { get; set; }
        public Usuario IdAdminNavigation { get; set; }
        public Deporte IdDeporteNavigation { get; set; }
        public ICollection<ActividadPerteneceEvento> ActividadPerteneceEvento { get; set; }
        public ICollection<EventoPatrocinadoPatrocinador> EventoPatrocinadoPatrocinador { get; set; }
        public ICollection<EventoTieneTipo> EventoTieneTipo { get; set; }
        public ICollection<Subscripciones> Subscripciones { get; set; }
    }
}
