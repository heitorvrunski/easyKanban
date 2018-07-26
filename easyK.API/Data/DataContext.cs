using Microsoft.EntityFrameworkCore;
using easyK.API.Models;

namespace easyK.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users {get;set;}
        public DbSet<Project> Projects {get;set;}
        public DbSet<ProjectxUser> Projects_x_Users {get;set;}
    }
}