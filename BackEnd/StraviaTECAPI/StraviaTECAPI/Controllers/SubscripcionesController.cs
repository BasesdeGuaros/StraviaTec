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
    public class SubscripcionesController : ControllerBase
    {
        /**
      *  Protocolo get
      *  IActionResult es una inteface
      *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
      */

        [HttpGet]
        [Route("api/[controller]/{cedula}/{idEvento}")]
        public IActionResult Get(string cedula,int idEvento)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.Subscripciones
                        .Where(a => a.IdUsuario == int.Parse(cedula))
                        .Where(a => a.IdEvento == idEvento)
                        .Include(a => a.IdEventoNavigation)
                        .Include(a => a.IdEventoNavigation.EventoTieneTipo)
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
     *  Protocolo get
     *  IActionResult es una inteface
     *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
     */

        [HttpGet]
        [Route("api/[controller]/{cedula}")]
        public IActionResult Get(string cedula)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.Subscripciones
                        .Where(a => a.IdUsuario == int.Parse(cedula))
                        .Include(a => a.IdEventoNavigation)
                        .Include(a => a.IdEventoNavigation.EventoTieneTipo)
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
        public IActionResult Post(SubscripcionesRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    Subscripciones subscripciones = new Subscripciones();

                    subscripciones.IdUsuario = request.IdUsuario;
                    subscripciones.IdEvento = request.IdEvento;
                    subscripciones.Aceptado = request.Aceptado;

                    subscripciones.IdUsuarioNavigation = request.IdUsuarioNavigation;
                    subscripciones.IdEventoNavigation = request.IdEventoNavigation;

                    db.Subscripciones.Add(subscripciones);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Subscripcion Agregada";
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
        public IActionResult Put(SubscripcionesRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    Subscripciones subscripciones = new Subscripciones();

                    subscripciones.IdUsuario = request.IdUsuario;
                    subscripciones.IdEvento = request.IdEvento;
                    subscripciones.Aceptado = request.Aceptado;

                    subscripciones.IdUsuarioNavigation = request.IdUsuarioNavigation;
                    subscripciones.IdEventoNavigation = request.IdEventoNavigation;

                    db.Entry(subscripciones).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Subscripcion Editada";
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
