using System;
using System.Collections.Generic;

namespace StraviaTECAPI.Models
{
    public partial class Actividad
    {
        public Actividad()
        {
            ActividadClasificaDeporte = new HashSet<ActividadClasificaDeporte>();
            ActividadPerteneceEvento = new HashSet<ActividadPerteneceEvento>();
        }

        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public DateTimeOffset? HoraInicial { get; set; }
        public string Recorrido { get; set; }
        public decimal? Kilometraje { get; set; }
        public int? Completitud { get; set; }

        public Usuario IdUsuarioNavigation { get; set; }
        public ICollection<ActividadClasificaDeporte> ActividadClasificaDeporte { get; set; }
        public ICollection<ActividadPerteneceEvento> ActividadPerteneceEvento { get; set; }
    }
}
