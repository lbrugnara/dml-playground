using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DmlLib.Core;
using Microsoft.AspNetCore.Mvc;

namespace DmlApi.Controllers
{
    [Route("api/v1/parser")]
    [ApiController]
    [Produces("application/json")]
    public class ParserController : ControllerBase
    {
        [HttpGet("version")]
        public IActionResult Version()
        {
            var playgroundVersion = Assembly.GetAssembly(this.GetType()).GetName().Version;
            var dmlVersion = Assembly.GetAssembly(typeof(DmlLib.Core.Parser)).GetName().Version;
            return Ok(new {
                playground = $"v{playgroundVersion.Major}.{playgroundVersion.Minor}.{playgroundVersion.Build}",
                dml = $"v{dmlVersion.Major}.{dmlVersion.Minor}.{dmlVersion.Build}"
            });
        }

        // POST api/v1/parser/parse
        [HttpPost("parse")]
        public IActionResult Parse([FromBody] DocumentInput input)
        {
            if (input.Source == null)
                return Ok(new DocumentOutput());

            try
            {
                var lexer = new Lexer(input.Source);
                var tokens = lexer.Tokenize();
                var parser = new Parser();
                var doc = parser.Parse(tokens);
                return Ok(new DocumentOutput()
                {
                    Tokens = tokens,
                    Output = doc.OuterXml
                });
            }
            catch
            {
                return this.BadRequest();
            }
        }
    }
}
