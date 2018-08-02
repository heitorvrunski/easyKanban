using System.Collections.Generic;
using System.Threading.Tasks;
using easyK.API.Models;

namespace easyK.API.Data
{
    public interface IProjectRepository
    {
        Task<Project> AddProject(Project project,int userId);
        Task<Project> EditProject(Project project);
        void DeleteProject(Project project);
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task<bool> SaveAll();
        Task<IEnumerable<UserInfo>> GetUsersOfProject(int projectId);
        Task<UserInfo> AddUserToProject(Project project,string userName);
        Task<UserInfo> DeleteUserToProject(Project project,string userName);

    }
}