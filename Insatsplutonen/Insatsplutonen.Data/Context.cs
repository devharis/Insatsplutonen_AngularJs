using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Data
{
  public class BlogContext : DbContext
  {
    public BlogContext()
      :base("name=DefaultConnection")
    {
      this.Configuration.ProxyCreationEnabled = false;
    }


    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
      modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
      modelBuilder.Entity<Article>().ToTable("news");
      modelBuilder.Entity<Image>().ToTable("picture");

    }
  }
}