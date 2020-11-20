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
    public class ParticipacionUsuarioGrupoController : ControllerBase
    {
        /**
      *  Protocolo get
      *  IActionResult es una inteface
      *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
      */

        [HttpGet]
        [Route("api/[controller]/{cedula}")]
        public IActionResult Get(int cedula)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.ParticipacionUsuarioGrupo
                        .Where(a => a.Rol == 1)
                        .Where(a => a.IdUsuario == cedula)
                        .Include(a => a.IdGrupoNavigation)
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
        [Route("api/[controller]/{cedula}/{idGrupo}")]
        public IActionResult Get(int cedula, int idGrupo)
        {
            MyReply reply = new MyReply();
            try
            {

                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var list = db.ParticipacionUsuarioGrupo
                        .Where(a => a.IdGrupo == idGrupo)
                        .Count();

     
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
        [Route("api/[controller]/{rol}/{cedula}")]

        public IActionResult Post(int rol, int cedula, GrupoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    Grupo grupo = new Grupo();
                    grupo.Id = request.Id;
                    grupo.Nombre = request.Nombre;

                    db.Grupo.Add(grupo);
                    db.SaveChanges();


                    ParticipacionUsuarioGrupo participacionUsuarioGrupo = new ParticipacionUsuarioGrupo();
                    participacionUsuarioGrupo.IdGrupo = grupo.Id;
                    participacionUsuarioGrupo.IdUsuario = cedula;
                    participacionUsuarioGrupo.Rol = rol;

                    db.ParticipacionUsuarioGrupo.Add(participacionUsuarioGrupo);
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Participacion Usuario Agregado";
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

        public IActionResult Put(ParticipacionUsuarioGrupoRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    ParticipacionUsuarioGrupo participacionUsuarioGrupo = new ParticipacionUsuarioGrupo();

                    participacionUsuarioGrupo.IdGrupo = request.IdGrupo;
                    participacionUsuarioGrupo.IdUsuario = request.IdUsuario;
                    participacionUsuarioGrupo.Rol = request.Rol;

                    participacionUsuarioGrupo.IdGrupoNavigation = request.IdGrupoNavigation;
                    participacionUsuarioGrupo.IdUsuarioNavigation = request.IdUsuarioNavigation;

                    db.Update(participacionUsuarioGrupo);
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Participacion Pertenece Editado";
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
        [Route("api/[controller]/{idGrupo}/{idUsuario}")]

        public IActionResult Delete(int idGrupo, int idUsuario)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    Grupo grupo = db.Grupo.Find(idGrupo);
                    db.Remove(grupo);

                    ParticipacionUsuarioGrupo participacion = db.ParticipacionUsuarioGrupo.Find(idGrupo, idUsuario);
                    db.Remove(participacion);


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
