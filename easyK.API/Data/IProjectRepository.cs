using System.Collections.Generic;
using System.Threading.Tasks;
using easyK.API.Models;

namespace easyK.API.Data
{
    public interface IProjectRepository
    {
        Task<Project> AddProject(Project project,int userId);

        void DeleteProject(Project project);
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task<bool> SaveAll();
    }
}