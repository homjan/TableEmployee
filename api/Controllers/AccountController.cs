using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Simple_Test.Models; // класс Person

namespace Simple_Test.Controllers
{
    public class AccountController : Controller
    {
        // тестовые данные вместо использования базы данных
        private List<Person> people = new List<Person>
        {
            new Person {username="admin", password="admin" }
        };

    /*    [HttpPost("/login")]
        public async Task<ActionResult<Person>> PostPerson(string username, string password)
        {
            var identity = GetIdentity(username, password);

            string tete = username;
              if (identity == null)
               {
                     return BadRequest(new { errorText =tete });
            }
            else
            {
                return BadRequest(new { errorText = "Sucsess." });
            }


            return NoContent();
        }*/

           [HttpPost("/login")]
           public IActionResult Token(string username, string password)
           {           
               var identity = GetIdentity(username, password);
               if (identity == null)
               {
                   return BadRequest(new { errorText = "Invalid username or password." });
               }

               var now = DateTime.UtcNow;
               // создаем JWT-токен
               var jwt = new JwtSecurityToken(
                       issuer: AuthOptions.ISSUER,
                       audience: AuthOptions.AUDIENCE,
                       notBefore: now,
                       claims: identity.Claims,
                       expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                       signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
               var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

               var response = new
               {
                   accessToken = encodedJwt,
                   username = identity.Name
               };

               return Json(response);
           }

        public ClaimsIdentity GetIdentity(string username, string password)
        {
            Person person = people.FirstOrDefault(x => x.username == username && x.password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.username),
                   
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
