using CostHead_WebApi.Models;
using CostHead_WebApi.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace CostHead_WebApi.Repositary
{
    public interface ICost
    {
        Task AddUsersAsync(Register user);
        Task<ActionResult<Cost>> GetDetailsbyId(int? id);
        Task <bool> AuthenticatedUser(string email, string password);
        Task<int> AddCost(Cost cost);
        Task<int> Delete(int id);
        Task<int> GetAllUpdate(int id, CostHeadDto cost);

    }
}
