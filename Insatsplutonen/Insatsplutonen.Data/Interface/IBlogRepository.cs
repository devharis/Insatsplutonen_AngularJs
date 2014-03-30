using System;
using System.Collections.Generic;
using System.Linq;

namespace Insatsplutonen.Data.Interface
{
  public interface IBlogRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    T Find<T>(Func<T, bool> where) where T : class;
    IEnumerable<T> FindAll<T>() where T : class;
    IQueryable<T> Query<T>() where T : class;
    void Save();
    void Update<T>(T entity) where T : class;
  }
}