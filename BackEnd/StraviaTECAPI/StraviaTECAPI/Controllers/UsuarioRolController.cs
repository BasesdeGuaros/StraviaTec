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
    public class UsuarioRolController : ControllerBase
    {
        /**
       *  Protocolo get
       *  IActionResult es una inteface
       *  Retorna una lista si la conexion fue extiosa, sino devuelve un mesanje de error
       */

        [HttpGet]
        [Route("api/[controller]/{username}")]
        //[Route("api/[controller]username")]

        public IActionResult Get(string username)
        {
            MyReply reply = new MyReply();
            try
            {
                //codigo que se ejecuta una vez
                using (StraviaContext db = new StraviaContext())
                {

                    var list = db.UsuarioRol
                        .Where(a => a.IdUsuarioNavigation.NombreUsuario == username)
                        .Include(a => a.IdUsuarioNavigation)
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
        public IActionResult Post(UsuarioRolRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    UsuarioRol usuariorol = new UsuarioRol();

                    usuariorol.IdUsuario = request.IdUsuario;
                    usuariorol.IdRol = request.IdRol;

                    usuariorol.IdUsuarioNavigation = request.IdUsuarioNavigation;

                    db.UsuarioRol.Add(usuariorol);
                    db.SaveChanges();
                    reply.conexionSuccess = 1;
                    reply.message = "Usuario Agregado";
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
        public IActionResult Put(UsuarioRolRequest request)
        {
            MyReply reply = new MyReply();

            try
            {
                using (StraviaContext db = new StraviaContext())
                {
                    UsuarioRol usuariorol = new UsuarioRol();

                    usuariorol.IdUsuario = request.IdUsuario;
                    usuariorol.IdRol = request.IdRol;

                    usuariorol.IdUsuarioNavigation = request.IdUsuarioNavigation;

                    db.Entry(usuariorol).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
                    db.SaveChanges();

                    reply.conexionSuccess = 1;
                    reply.message = "Usuario Editado";
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
                    UsuarioRol usuariorol = db.UsuarioRol.Find(cedula); //Eliminar el Usuario y no la tabla relacion
                    db.Remove(usuariorol);
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
