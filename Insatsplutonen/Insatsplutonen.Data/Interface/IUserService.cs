using System.Collections.Generic;
using Insatsplutonen.Model.Account;

namespace Insatsplutonen.Data.Interface
{
    public interface IUserService
    {
        List<UserProfile> GetUsers();
        UserProfile GetUser(int id);
    }
}
