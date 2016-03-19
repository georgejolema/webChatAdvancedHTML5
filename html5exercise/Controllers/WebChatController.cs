#define TEST
using Fleck;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace html5exercise.Controllers
{
    [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
    public class WebChatController : Controller
    {
#if TEST
        private static List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();
        static WebChatController()
        {
            WebSocketServer server = new WebSocketServer("ws://127.0.0.1:8080");
            server.Start(socket =>
            {
                socket.OnOpen = () => { allSockets.Add(socket); };
                socket.OnClose = () => {
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message => { allSockets.ToList().ForEach(s => s.Send(message)); };
            });
        }
#endif
        // GET: WebChat
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Manifest()
        {
            return View();
        }

        [HttpPost]
        public JsonResult getAvailableRooms()
        {
            var rooms = new string[]
            {
                "room1", "room2", "koala", "cats"
            };

            return Json(rooms);
        }
    }
}