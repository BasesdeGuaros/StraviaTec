﻿using System;
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
    public class UsuarioRolController : ControllerBase
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
                    var list = db.UsuarioRol
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
