using CostHead_WebApi.Data;
using CostHead_WebApi.Models;
using CostHead_WebApi.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CostHead_WebApi.Repositary
{
    
    public class CostHead:ICost
    {
        
        private readonly ApplicationDBContext _context;
      
        public CostHead(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task AddUsersAsync(Register user)
        {
            try
            {
                if (user != null)
                {
                    _context.Registers.Add(user);
                    await _context.SaveChangesAsync();
                }
                return;
            }
            catch (Exception)
            {

                throw;
            }
            
        }




        public async Task<ActionResult<Cost>> GetDetailsbyId(int? id)
        {
            try
            {
                var result = await _context.Costs.FindAsync(id);
                return result;
            }
            catch
            {
                throw;
            }
        }





        public async Task< bool>AuthenticatedUser(string Email, string password)
        {

            try
            {
                var succeed = await _context.Registers.Where(a => a.Email == Email && a.Password == password).FirstOrDefaultAsync();
                if (succeed != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
           

        }



        public async Task<int> AddCost(Cost cost)
        {

            try
            {
                Cost obj = new Cost();
                //obj.CostId = cost.CostId;
                obj.CostHeadName = cost.CostHeadName;
                obj.Remarks = cost.Remarks;
                obj.IsActive = cost.IsActive;

                var res = _context.Costs.Add(cost);
                int i;
                if (res != null)
                {
                    i = await _context.SaveChangesAsync();
                    return i;

                }
                return 0;

            }
            catch (Exception)
            {

                throw;
            }
           
        }


        public async Task<int> Delete(int id)
        {

            try
            {
                int i = 0;
                var deleteid = _context.Costs.Find(id);

                if (deleteid != null)
                {
                    deleteid.IsDelete = false;
                    i = await _context.SaveChangesAsync();

                }
                return i;
            }
            catch (Exception)
            {

                throw;
            }
            
        }




        public async Task<int> GetAllUpdate(int id, CostHeadDto cost)
        {

            try
            {
                var update = _context.Costs.FirstOrDefault(u => u.CostId == id);
                if (update != null)
                {
                    update.CostHeadName = cost.CostHeadName;
                    update.Remarks = cost.Remarks;
                    update.IsActive = cost.IsActive;


                    int sucess = await _context.SaveChangesAsync();
                    return sucess;
                }
                return 0;
            }
            catch (Exception)
            {

                throw;
            }
           
        }



    }


}
