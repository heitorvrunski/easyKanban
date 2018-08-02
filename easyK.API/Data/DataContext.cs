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
        public DbSet<Card> Cards {get;set;}
        public DbSet<ProjectxCard> Projects_x_Cards {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProjectxUser>()
                .HasKey(p => new {p.UserId, p.ProjectId });

            modelBuilder.Entity<ProjectxCard>()
                .HasKey(p => new {p.ProjectId, p.CardId });
                
        }
    }
    
}