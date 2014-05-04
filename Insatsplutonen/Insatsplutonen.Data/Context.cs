using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext()
            : base("name=DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = true;
            this.Configuration.ProxyCreationEnabled = true;
            this.Database.CreateIfNotExists();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<BlogContext>());
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<PostMedia>().ToTable("PostMedia");
            modelBuilder.Entity<Media>().ToTable("Media");
            modelBuilder.Entity<MediaCategory>().ToTable("MediaCategory");

            modelBuilder.Entity<Media>().HasRequired(t => t.MediaCategory);
            modelBuilder.Entity<Post>().HasMany(t => t.MediaList);

        }

    }
}