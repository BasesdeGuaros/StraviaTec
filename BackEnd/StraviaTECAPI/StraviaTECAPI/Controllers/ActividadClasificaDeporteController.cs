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
    public class ActividadClasificaDeporteController : ControllerBase
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
                    var list = db.ActividadClasificaDeporte
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
        public IActionResult Post(ActividadClasificaDeporteRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    ActividadClasificaDeporte actividadClasificaDeporte = new ActividadClasificaDeporte();

                    actividadClasificaDeporte.IdActividad = request.IdActividad;
                    actividadClasificaDeporte.IdDeporte = request.IdDeporte;

                    actividadClasificaDeporte.IdActividadNavigation = request.IdActividadNavigation;
                    actividadClasificaDeporte.IdDeporteNavigation = request.IdDeporteNavigation;

                    db.ActividadClasificaDeporte.Add(actividadClasificaDeporte);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Actividad Clasifica Agregado";
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
        public IActionResult Put(ActividadClasificaDeporteRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    ActividadClasificaDeporte actividadClasificaDeporte = new ActividadClasificaDeporte();

                    actividadClasificaDeporte.IdActividad = request.IdActividad;
                    actividadClasificaDeporte.IdDeporte = request.IdDeporte;

                    actividadClasificaDeporte.IdActividadNavigation = request.IdActividadNavigation;
                    actividadClasificaDeporte.IdDeporteNavigation = request.IdDeporteNavigation;

                    db.Entry(actividadClasificaDeporte).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Actividad Clasifica Editado";
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
