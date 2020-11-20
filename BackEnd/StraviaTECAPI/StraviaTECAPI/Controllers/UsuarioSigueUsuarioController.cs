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
    public class UsuarioSigueUsuarioController : ControllerBase
    {
        /**
       *  Protocolo get
       *  IActionResult es una inteface
       *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
       */

        [HttpGet]
        [Route("api/[controller]/{username}")]
        public IActionResult Get(string username)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    
                    var list = db.UsuarioSigueUsuario
                        .Where(a => a.IdSeguidoNavigation.NombreUsuario == username)
                        .Include(a => a.IdSeguidorNavigation)
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

        [HttpGet]
        [Route("api/[controller]/{username}/{count}")]
        public IActionResult Get(string username,int count)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {
                    var num1 = db.UsuarioSigueUsuario
                        .Where(a => a.IdSeguidoNavigation.NombreUsuario == username)
                        .Count();

                    var num2 = db.UsuarioSigueUsuario
                        .Where(a => a.IdSeguidorNavigation.NombreUsuario == username)
                        .Count();

                    //preguntar
                    var num3 = db.Actividad
                        .Where(a => a.IdUsuario == count)
                        .Count();

                    List<int> list = new List<int>();
                    list.Add(num1);
                    list.Add(num2);
                    list.Add(num3);


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
        [Route("api/[controller]/{cedula}/{other}/{other2}")]
        public IActionResult Get(int cedula, string other, string other2)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {


                    /**var list = db.Actividad.Join(
                        db.Evento,
                        activitieID => activitieID.Id,
                        eventID => eventID.Id,
                        kilometro => kilometro.Kilometraje,
                        (activitieID, eventID,kilometro)=> new
                        {
                             = eventID.Id
                        })
                        .Where(a => a.IdUsuario == cedula).ToList();**/
                    var list = db.Actividad
                        .Where(a => a.IdUsuario == cedula)
                        .Include(a => a.ActividadPerteneceEvento)
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
        public IActionResult Post(UsuarioSigueUsuarioRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    UsuarioSigueUsuario usuariosigue = new UsuarioSigueUsuario();



                    usuariosigue.IdSeguido = request.IdSeguido;
                    usuariosigue.IdSeguidor = request.IdSeguidor;


                    usuariosigue.IdSeguidoNavigation = request.IdSeguidoNavigation;
                    usuariosigue.IdSeguidorNavigation = request.IdSeguidorNavigation;




                    db.UsuarioSigueUsuario.Add(usuariosigue);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Usuario Seguir Agregado";
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
        public IActionResult Put(UsuarioSigueUsuarioRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    UsuarioSigueUsuario usuariosigue = new UsuarioSigueUsuario();

                    usuariosigue.IdSeguido = request.IdSeguido;
                    usuariosigue.IdSeguidor = request.IdSeguidor;

                    usuariosigue.IdSeguidoNavigation = request.IdSeguidoNavigation;
                    usuariosigue.IdSeguidorNavigation = request.IdSeguidorNavigation;

                    db.Entry(usuariosigue).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
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
