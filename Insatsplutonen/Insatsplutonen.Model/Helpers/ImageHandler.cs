using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Drawing;
using System.Web;

namespace Insatsplutonen.Model.Helpers
{
    public class ImageHandler
    {

        private static readonly Regex approvedExenstions;
        public static string PhysicalApplicationPath { get; set; }
        public static string PhysicalApplicationPath2 { get; set; }

        public ImageHandler()
        {
            var approvedExenstions = new Regex("^.*.(gif|jpg|png|jpeg|bmp|gif)", RegexOptions.IgnoreCase);
        }

        //HÄMTAR BILDER SOM REDAN FINNS I GALLERIET
        public static List<string> GetImageNames()
        {
            var path = PhysicalApplicationPath;
            var di = new DirectoryInfo(path);

            var files = di.GetFiles();

            return files.Select(t => t.Name).ToList();
        }

        //BILD REDAN FINNS
        public static bool ImageExists(string name)
        {
            return File.Exists(String.Format("{0}/{1}", PhysicalApplicationPath, name));
        }

        //BILDVALIDERING
        static bool IsValidImage(Image image)
        {
            bool validImage;
            if (image.RawFormat.Guid == ImageFormat.Jpeg.Guid || image.RawFormat.Guid == ImageFormat.Png.Guid || image.RawFormat.Guid == ImageFormat.Gif.Guid)
            {
                validImage = true;
            }
            else
            {
                validImage = false;
            }
            return validImage;
        }

        static Size GetThumbnailSize(Image original)
        {
            // Maximum size of any dimension.
            const int maxPixels = 600;

            // Width and height.
            int originalWidth = original.Width;
            int originalHeight = original.Height;

            // Compute best factor to scale entire image based on larger dimension.
            double factor;
            if (originalWidth > originalHeight)
            {
                factor = (double)maxPixels / originalWidth;
            }
            else
            {
                factor = (double)maxPixels / originalHeight;
            }

            // Return thumbnail size.
            return new Size((int)(originalWidth * factor), (int)(originalHeight * factor));
        }

        //SPARA BILD
        public string SaveImage(HttpPostedFileBase file, string fileName)
        {
                var image = Image.FromStream(file.InputStream);
                
                //Kontrollerar så att bilden är av korrekt typ
                if (!IsValidImage(image))
                {
                    throw new InvalidDataException("Bilden är av fel typ.");
                }

                //Kontrollerar om bilden redan finns, lägger till en siffra i slutet isf.
                while (ImageExists(fileName))
                {
                    var imageNameWithoutExtention = Path.GetFileNameWithoutExtension(String.Format("{0}/{1}", PhysicalApplicationPath, fileName));
                    var imageNameExtention = Path.GetExtension(String.Format("{0}/{1}", PhysicalApplicationPath, fileName));

                    fileName = String.Format("{0}{1}{2}", imageNameWithoutExtention, Guid.NewGuid(), imageNameExtention);
                }

                try
                {
                    //Spara ner bild och tumnagel i respektive mapp
                    if (file.ContentLength > 100)
                    {
                        var thumbnailSize = GetThumbnailSize(image);
                        var thumbnail = image.GetThumbnailImage(thumbnailSize.Width, thumbnailSize.Height, null, IntPtr.Zero);
                        thumbnail.Save(String.Format("{0}/thumbs/{1}", PhysicalApplicationPath, fileName));
                    }
                    else
                        image.Save(String.Format("{0}/thumbs/{1}", PhysicalApplicationPath, fileName));
                    image.Save(String.Format("{0}/{1}", PhysicalApplicationPath, fileName));
                }
                catch
                {
                    throw new ArgumentException("Fel inträffa, var god försök igen");
                }

            return fileName;
        }
    }
}
