using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IRepository<T>
    {
        Task<List<T>> GetList();
        Task<T> GetItem(int id);
        Task DeleteItem(int id);
        void UpdateItem(T item);
        Task<T> Create(T item);

    }
}
