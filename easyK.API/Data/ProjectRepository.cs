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
            await _dataContext.Projects.AddAsync(project);
            ProjectxUser pxU = new ProjectxUser();
            await _dataContext.SaveChangesAsync();
            pxU.ProjectId = project.ProjectId;
            pxU.UserId = userId;
            await _dataContext.Projects_x_Users.AddAsync(pxU);            
            return project;
        }

        public void DeleteProject(Project project)
        {
            _dataContext.Projects.Remove(project);
            _dataContext.Projects_x_Users.RemoveRange(_dataContext.Projects_x_Users.Where(x => x.ProjectId == project.ProjectId));
        }

        public async Task<IEnumerable<Project>> GetProjects(int userId)
        {
            
            var projects = await (from p in _dataContext.Projects
                join p_x_u in _dataContext.Projects_x_Users on p.ProjectId equals p_x_u.ProjectId into pp
                from p_x_u in pp.DefaultIfEmpty() 
                where p_x_u.UserId == userId || p.isPublic == true
                select p).ToListAsync();
            return projects;
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}