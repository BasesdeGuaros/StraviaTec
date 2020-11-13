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
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadPerteneceEventoController : ControllerBase
    {
        /**
      *  Protocolo get
      *  IActionResult es una inteface
      *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
      */

        [HttpGet]
        public IActionResult Get()
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.ActividadPerteneceEvento
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
        public IActionResult Post(ActividadPerteneceEventoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    ActividadPerteneceEvento actividadPerteneceEvento = new ActividadPerteneceEvento();

                    actividadPerteneceEvento.IdEvento = request.IdEvento;
                    actividadPerteneceEvento.IdActividad = request.IdActividad;

                    actividadPerteneceEvento.IdActividadNavigation = request.IdActividadNavigation;
                    actividadPerteneceEvento.IdEventoNavigation = request.IdEventoNavigation;

                    db.ActividadPerteneceEvento.Add(actividadPerteneceEvento);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Actividad Pertenece Agregado";
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
        public IActionResult Put(ActividadPerteneceEventoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    ActividadPerteneceEvento actividadPerteneceEvento = new ActividadPerteneceEvento();

                    actividadPerteneceEvento.IdEvento = request.IdEvento;
                    actividadPerteneceEvento.IdActividad = request.IdActividad;

                    actividadPerteneceEvento.IdActividadNavigation = request.IdActividadNavigation;
                    actividadPerteneceEvento.IdEventoNavigation = request.IdEventoNavigation;

                    db.Entry(actividadPerteneceEvento).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Actividad Pertenece Editado";
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
