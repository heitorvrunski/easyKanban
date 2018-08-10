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
        [HttpGet("getCards/{projectId}")]
        public async Task<IActionResult> GetCards(int projectId)
        {
            var c = User.Identity.Name;
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = claims.FirstOrDefault();

            IEnumerable<CardInfo> cardList = await _cardRepo.GetCards(projectId,Convert.ToInt32(userId.Value));
            return Ok(cardList);

        }

        [HttpPost("addCard/{projectId}")]
        public async Task<IActionResult> AddCard([FromBody] Card card,int projectId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var c = User.Identity.Name;
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = claims.FirstOrDefault();

            await _cardRepo.AddCard(card,Convert.ToInt32(userId.Value),projectId);
            if(await _cardRepo.SaveAll())
                return NoContent();
        
            throw new Exception($"Fail to add card!");

        }
        [HttpPost("deleteCard")]
        public async Task<IActionResult> DeleteCard([FromBody] Card card)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            _cardRepo.DeleteCard(card);

            if(await _cardRepo.SaveAll())
                return NoContent();
            
            throw new Exception($"Fail to remove card!");
        }

        [HttpPost("editCard")]
        public async Task<IActionResult> EditCard([FromBody] Card card)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var p = await _cardRepo.EditCard(card);
            if(p != null)
                return NoContent();
        
            throw new Exception($"Fail to edit card!");

        }
    }
}