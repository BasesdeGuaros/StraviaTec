using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StraviaTECAPI.Models;
using StraviaTECAPI.Models.Reply;
using StraviaTECAPI.Models.Request;

namespace StraviaTECAPI.Controllers
{
    
    [ApiController]
    public class EventoTieneTipoController : ControllerBase
    {
        /**
      *  Protocolo get
      *  IActionResult es una inteface
      *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
      */
        [HttpGet]
        [Route("api/[controller]/{type}")]
        public IActionResult Get(string type)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.EventoTieneTipo
                        .Where(a => a.IdTipoEvento == int.Parse(type)) //carrera
                        .Include(a => a.IdEventoNavigation)
                        .ToList();
                    // .Where(a => a.Rol == "producer") para hacerlo dentro del query
                    // .Include(a => a.Producers)
                    reply.conexionSuccess = 1;
                    reply.data = list;
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply);
        }

        [HttpGet]
        [Route("api/[controller]/{cedula}/{type}")]
        public IActionResult Get(string cedula, string type)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    
                    var list = db.EventoTieneTipo
                        .Where(a => a.IdTipoEvento == int.Parse(type))
                        .Where(a => a.IdEventoNavigation.IdAdmin == int.Parse(cedula)) //carrera
                        .Include(a => a.IdEventoNavigation)
                        .ToList();
                    // .Where(a => a.Rol == "producer") para hacerlo dentro del query
                    // .Include(a => a.Producers)
                    reply.conexionSuccess = 1;
                    reply.data = list;
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply);
        }

        /**
         * Protocolo Post
         */
        [HttpPost]
        [Route("api/[controller]/{type}")]
        public IActionResult Post(int type, EventoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.Evento
                        .Count();

                    Evento evento = new Evento();
                    evento.Id = list+1;
                    evento.Nombre = request.Nombre;
                    evento.Fecha = request.Fecha;
                    evento.IdAdmin = request.IdAdmin;
                    evento.Recorrido = request.Recorrido;
                    evento.Cuenta = request.Cuenta;
                    evento.Categoria = request.Categoria;
                    evento.Costo = request.Costo;
                    evento.Privado = request.Privado;
                    evento.IdDeporte = request.IdDeporte;
                    evento.Kilometraje = request.Kilometraje;
                    evento.Elevación = request.Elevación;
                    evento.FechaInicial = request.FechaInicial;
                    evento.FechaFinal = request.FechaFinal;
                    evento.FondoAltitud = request.FondoAltitud;
                    evento.Foto = request.Foto;

                    db.Evento.Add(evento);

                    db.SaveChanges();


                    EventoTieneTipo eventoTieneTipo = new EventoTieneTipo();
                    eventoTieneTipo.IdEvento = evento.Id; ;
                    eventoTieneTipo.IdTipoEvento = type;


        db.EventoTieneTipo.Add(eventoTieneTipo);

        
        db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Evento Tiene Agregado";
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply);
        }

        /**
         * Protocolo Put
         */
        [HttpPut]
        [Route("api/[controller]")]
        public IActionResult Put(EventoTieneTipoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    EventoTieneTipo eventoTieneTipo = new EventoTieneTipo();

                    eventoTieneTipo.IdEvento = request.IdEvento;
                    eventoTieneTipo.IdTipoEvento = request.IdTipoEvento;

                    eventoTieneTipo.IdTipoEventoNavigation = request.IdTipoEventoNavigation;
                    eventoTieneTipo.IdEventoNavigation = request.IdEventoNavigation;

                    db.Update(eventoTieneTipo);
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Evento tiene Editado";
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply);
        }

        /**
         * Protocolo Delete
         */
        [HttpDelete]
        [Route("api/[controller]/{IdEvento}/{IdTipoEvento}")]
        public IActionResult Delete(int IdEvento, int IdTipoEvento)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {

                    EventoTieneTipo eventoTieneTipo = db.EventoTieneTipo.Find(IdEvento, IdTipoEvento);
                    db.Remove(eventoTieneTipo);

                    Evento evento = db.Evento.Find(IdEvento);
                    db.Remove(evento);

                    /*
                    EventoPatrocinadoPatrocinador eventoPatrocinado = db.EventoPatrocinadoPatrocinador.Find(IdEvento, 1); //arreglar el error del patrocinador
                    db.Remove(eventoPatrocinado);

                    Subscripciones subs = db.Subscripciones.Find(evento.IdAdmin, IdEvento);
                    db.Remove(subs);
                    */

                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Usuario Eliminado";
                }
            }
            catch (Exception ex)
            {
                reply.conexionSuccess = 0;
                reply.message = ex.Message;
            }
            return Ok(reply);
        }
    }
}
