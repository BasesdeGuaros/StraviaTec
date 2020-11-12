using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StraviaTECAPI.Models.Reply
{

    /**
     * La clase sirve como contenedor de la respuesta a las solicitudes a la base de datos
     */
    public class MyReply
    {
        public int conexionSuccess { get; set; }
        public string message { get; set; }
        public Object data { get; set; }
    }
}
