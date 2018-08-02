using System.Collections.Generic;
using System.Threading.Tasks;
using easyK.API.Models;

namespace easyK.API.Data
{
    public interface ICardRepository
    {        
        Task<IEnumerable<Card>> GetCards(int projectId,int userId);
    }
}