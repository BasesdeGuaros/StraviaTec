using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StraviaTECAPI.Models;
using StraviaTECAPI.Models.Reply;
using StraviaTECAPI.Models.Request;

namespace StraviaTECAPI.Controllers
{
    
    [ApiController]
    public class EventoPatrocinadoPatrocinadorController : ControllerBase
    {
        /**
      *  Protocolo get
      *  IActionResult es una inteface
      *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
      */

        [HttpGet]
        [Route("api/[controller]/{idEvento}")]  
        public IActionResult Get(int idEvento)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.EventoPatrocinadoPatrocinador
                        .Where(a => a.IdEvento == idEvento)
                        .ToList();
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
        [Route("api/[controller]")]
        public IActionResult Post(PatrocinadorRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    var countP = db.Patrocinador
                        .Count();
                    var coutE = db.Patrocinador
                        .Count();

                    Patrocinador patrocinador = new Patrocinador();
                    patrocinador.Id = countP + 1;
                    patrocinador.Nombre = request.Nombre;
                    patrocinador.Numero = request.Numero;
                    patrocinador.Logo = request.Logo;
                    patrocinador.Representante = request.Representante;
                    db.Patrocinador.Add(patrocinador);

                    EventoPatrocinadoPatrocinador eventoPatrocinadoPatrocinador = new EventoPatrocinadoPatrocinador();
                    eventoPatrocinadoPatrocinador.IdEvento = coutE;
                    eventoPatrocinadoPatrocinador.IdPatrocinador = patrocinador.Id;

                    db.EventoPatrocinadoPatrocinador.Add(eventoPatrocinadoPatrocinador);

                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Evento Patrocinado Agregado";
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
        public IActionResult Put(EventoPatrocinadoPatrocinadorRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {

                    EventoPatrocinadoPatrocinador eventoPatrocinadoPatrocinador = new EventoPatrocinadoPatrocinador();

                    eventoPatrocinadoPatrocinador.IdEvento = request.IdEvento;
                    eventoPatrocinadoPatrocinador.IdPatrocinador = request.IdPatrocinador;

                    eventoPatrocinadoPatrocinador.IdEventoNavigation = request.IdEventoNavigation;
                    eventoPatrocinadoPatrocinador.IdPatrocinadorNavigation = request.IdPatrocinadorNavigation;

                    db.Entry(eventoPatrocinadoPatrocinador).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Usuario Seguir Editado";
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
        [Route("api/[controller]")]
        public IActionResult Delete(int cedula)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    Usuario usuario = db.Usuario.Find(cedula); //Cambiar para borrar la condicion de seguidor
                    db.Remove(usuario);
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
