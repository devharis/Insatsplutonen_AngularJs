using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Account;

namespace Insatsplutonen.Data.Service
{
    public class UserService : IUserService
    {
        private IRepository _repository;

        public UserService()
            : this(new InsatsRepository())
        {
            // Empty!
        }

        public UserService(IRepository repository)
        {
            this._repository = repository;
        }

        public List<UserProfile> GetUsers()
        {
            return this._repository.Query<UserProfile>().ToList();
        }

        public UserProfile GetUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}
