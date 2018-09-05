using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyK.API.Models;
using Microsoft.EntityFrameworkCore;

namespace easyK.API.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _dataContext;
        public ProjectRepository(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        public async Task<Project> AddProject(Project project, int userId)
        {
            project.Owner = userId;
            await _dataContext.Projects.AddAsync(project);
            ProjectxUser pxU = new ProjectxUser();
            await _dataContext.SaveChangesAsync();
            pxU.ProjectId = project.ProjectId;
            pxU.UserId = userId;
            await _dataContext.Projects_x_Users.AddAsync(pxU);            
            return project;
        }

        public async Task<UserInfo> AddUserToProject(Project project, string userName)
        {
            User user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());
            if (user != null)
            {
                ProjectxUser pxU = new ProjectxUser() {
                    UserId = user.UserId,
                    ProjectId = project.ProjectId
                };
                await _dataContext.Projects_x_Users.AddAsync(pxU);
                return new UserInfo {UserId = user.UserId, UserName = user.UserName };
            }
            return null;
        }

        public void DeleteProject(Project project)
        {
            _dataContext.Projects.Remove(project);
            _dataContext.Projects_x_Users.RemoveRange(_dataContext.Projects_x_Users.Where(x => x.ProjectId == project.ProjectId));
        }

        public async Task<UserInfo> DeleteUserToProject(Project project, string userName)
        {
            User user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());
            if (user != null)
            {
                ProjectxUser pxU = new ProjectxUser() {
                    UserId = user.UserId,
                    ProjectId = project.ProjectId
                };
                _dataContext.Projects_x_Users.Remove(pxU);
                return new UserInfo {UserId = user.UserId, UserName = user.UserName };
            }
            return null;
        }

        public async Task<Project> EditProject(Project project)
        {
            Project p = await _dataContext.Projects.FindAsync(project.ProjectId);
            p.ProjectName = project.ProjectName;
            p.isPublic = project.isPublic;
            p.Description = project.Description;
            await _dataContext.SaveChangesAsync();
            return p;
        }

        public async Task<IEnumerable<Project>> GetProjects(int userId)
        {
            
            var projects = await (from p in _dataContext.Projects
                join p_x_u in _dataContext.Projects_x_Users on p.ProjectId equals p_x_u.ProjectId into pp
                from p_x_u in pp.DefaultIfEmpty() 
                where (p_x_u.UserId == userId && p.isPublic == false) || (p.isPublic == true && p_x_u.UserId != userId)
                select p).ToListAsync();
            return projects;
        }

        public async Task<IEnumerable<UserInfo>> GetUsersOfProject(int projectId)
        {
            var users = await (from p_x_u in _dataContext.Projects_x_Users
                        join u in _dataContext.Users on p_x_u.UserId equals u.UserId
                        where p_x_u.ProjectId == projectId
                        select new UserInfo{ UserId = u.UserId, UserName = u.UserName } ).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}