using CostHead_WebApi.Models;

using Microsoft.EntityFrameworkCore;

namespace CostHead_WebApi.Data
{
    public class ApplicationDBContext: DbContext
    {

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {


        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }


        public DbSet<Register> Registers { get; set; }
        public DbSet<Login> LoginPage { get; set; }
        public DbSet<Cost> Costs { get; set; }

    }
}
