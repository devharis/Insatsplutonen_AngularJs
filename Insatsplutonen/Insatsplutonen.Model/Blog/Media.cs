using System.ComponentModel.DataAnnotations;

namespace Insatsplutonen.Model.Blog
{
  public class Media
  {
    [Key]
    public int Id { get; set; }
    public int PostId { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
  }
}