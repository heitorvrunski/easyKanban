using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyK.API.Models;
using Microsoft.EntityFrameworkCore;

namespace easyK.API.Data
{
    public class CardRepository : ICardRepository
    {
        private readonly DataContext _dataContext;

        public CardRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Card>> GetCards(int projectId, int userId)
        {
            var cards = await (from c in _dataContext.Cards
                join p_x_c in _dataContext.Projects_x_Cards on c.CardId equals p_x_c.CardId
                join p_x_u in _dataContext.Projects_x_Users on p_x_c.ProjectId equals p_x_u.ProjectId
                where p_x_c.ProjectId == projectId && p_x_u.UserId == userId
                select c).ToListAsync();
            return cards;

        }
    }
}