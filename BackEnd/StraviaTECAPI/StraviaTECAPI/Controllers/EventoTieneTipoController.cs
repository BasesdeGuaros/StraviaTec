﻿using System;
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
        /**
         * Protocolo Post
         */
        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post(EventoTieneTipoRequest request)
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

                    db.Entry(eventoTieneTipo).State = Microsoft.EntityFrameworkCore.EntityState.Modified; //le dice a la base de datos que se ha modificado  
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