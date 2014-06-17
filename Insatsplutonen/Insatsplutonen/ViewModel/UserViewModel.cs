using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Insatsplutonen.Model.Account;

namespace Insatsplutonen.ViewModel
{
    public class UserViewModel
    {
        public UserProfile UserProfile { get; set; }
        public RegisterModel RegisterModel { get; set; }
    }
}