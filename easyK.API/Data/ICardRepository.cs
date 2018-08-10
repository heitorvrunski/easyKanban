using System.Collections.Generic;
using System.Threading.Tasks;
using easyK.API.Models;

namespace easyK.API.Data
{
    public interface ICardRepository
    {        
        Task<IEnumerable<CardInfo>> GetCards(int projectId,int userId);
        Task<Card> AddCard(Card card, int userId, int projectId);
        Task<bool> SaveAll();
        void DeleteCard(Card card);
        Task<Card> EditCard(Card card);
    }
}