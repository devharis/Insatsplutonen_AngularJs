using System;
using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.ViewModel
{
    public class PaginationResult
    {
        private int _mTotalpages;

        public List<Article> Articles { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get { return _mTotalpages; } set { _mTotalpages = value; SettingPagingsArray(); } }
        public List<int> Pagingarray { get; set; }

        public void SettingPagingsArray()
        {
            Pagingarray = new List<int>();
            for (var i = 1; i <= TotalPages; i++)
                Pagingarray.Add(i);
        }
    }
}