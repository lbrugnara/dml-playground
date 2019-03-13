using DmlLib.Semantic;
using System.Collections.Generic;

namespace DmlApi.Controllers.Parser.Dtos
{
    public class DocumentOutput
    {
        public string Output { get; set; }
        public List<Token> Tokens { get; set; }
    }
}
