using System.ComponentModel.DataAnnotations;

namespace Insatsplutonen.Model.Blog
{
  public class Image
  {
    [Key]
    public int PictureId { get; set; }
    public int NewsId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }
}