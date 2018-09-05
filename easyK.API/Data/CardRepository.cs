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

        public async Task<Card> AddCard(Card card, int userId, int projectId)
        {
            await _dataContext.AddAsync(card);
            CardxUser cxU = new CardxUser();
            await _dataContext.SaveChangesAsync();
            cxU.CardId = card.CardId;
            cxU.UserId = userId;
            await _dataContext.Cards_x_Users.AddAsync(cxU);
            await _dataContext.Projects_x_Cards.AddAsync(new ProjectxCard {CardId = card.CardId,ProjectId = projectId });     
            return card;

        }

        public void DeleteCard(Card card)
        {
            _dataContext.Remove(card);
            _dataContext.Cards_x_Users.RemoveRange(_dataContext.Cards_x_Users.Where(x => x.CardId == card.CardId));
            _dataContext.Projects_x_Cards.RemoveRange(_dataContext.Projects_x_Cards.Where(x => x.CardId == card.CardId));
        }

        public async Task<Card> EditCard(Card card)
        {
            Card c = await _dataContext.Cards.FindAsync(card.CardId);
            c.CardDescription = card.CardDescription;
            c.CardStatus = card.CardStatus;
            c.CardType = card.CardType;
            await _dataContext.SaveChangesAsync();
            return c;
        }

        public async Task<IEnumerable<CardInfo>> GetCards(int projectId, int userId)
        {

            var cards = await (from c in _dataContext.Cards
                join p_x_c in _dataContext.Projects_x_Cards on c.CardId equals p_x_c.CardId
                join p_x_u in _dataContext.Projects_x_Users on p_x_c.ProjectId equals p_x_u.ProjectId
                join p in _dataContext.Projects on p_x_c.ProjectId equals p.ProjectId
                join c_x_u in _dataContext.Cards_x_Users on c.CardId equals c_x_u.CardId
                join u in _dataContext.Users on c_x_u.UserId equals u.UserId into uu
                from u in uu.DefaultIfEmpty()
                where (p_x_c.ProjectId == projectId && p_x_u.UserId == userId && p.isPublic == false) || 
                (p.isPublic == true && p_x_c.ProjectId == projectId && p_x_u.UserId != userId)
                select new CardInfo {UserName = u.UserName,
                                     CardId = c.CardId,
                                     CardDescription = c.CardDescription,
                                     CardStatus = c.CardStatus,
                                     CardType = c.CardType,
                                     UserId = u.UserId }).ToListAsync();
            return cards;

        }
        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}