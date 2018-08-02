using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using easyK.API.Data;
using easyK.API.Dtos;
using easyK.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace easyK.API.Controllers
{
    [Route("api/[controller]")]
    public class CardController : Controller
    {
        private readonly ICardRepository _cardRepo;
        public CardController(ICardRepository cardRepo)
        {
            _cardRepo = cardRepo;

        }
        [HttpGet("getCards/{projectId}"),Authorize]
        public async Task<IActionResult> GetCards(int projectId)
        {
            var c = User.Identity.Name;
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = claims.FirstOrDefault();

            IEnumerable<Card> cardList = await _cardRepo.GetCards(projectId,Convert.ToInt32(userId.Value));
            return Ok(cardList);

        }
    }
}