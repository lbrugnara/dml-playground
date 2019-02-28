using DmlLib.Core;
using System.Collections.Generic;

namespace DmlApi.Controllers
{
    public class DocumentOutput
    {
        public string Output { get; set; }
        public List<Token> Tokens { get; set; }
    }
}
