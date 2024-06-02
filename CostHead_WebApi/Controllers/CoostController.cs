using CostHead_WebApi.Data;
using CostHead_WebApi.Models;
using CostHead_WebApi.Repositary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CostHead_WebApi.Controllers
{


    public class CoostController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ICost _login;
        public CoostController(ApplicationDBContext context, ICost login)
        {
            _context = context;
            _login = login;
        }


        [HttpPost("api/CoostController/Register")]
        public async Task<ActionResult> Register([FromBody] Register register)
        {
            try
            {
                if (register != null)
                {
                    await _login.AddUsersAsync(register);
                    return Ok("User registered successfully");
                }
                else
                {
                    return BadRequest("Invalid registration data");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



    
    



        [HttpPost("api/CoostController/Login")]
        public async Task<IActionResult> LoginPage(string Email, String password)
        {
            try
            {
                bool myuser = await _login.AuthenticatedUser(Email, password);


                if (myuser)
                {
                    return Ok();
                }
                else
                {
                    return Unauthorized("Invalid email or password.");
                }

                
                
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }

}