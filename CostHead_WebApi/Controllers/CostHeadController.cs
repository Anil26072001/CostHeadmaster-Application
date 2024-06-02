using CostHead_WebApi.Data;
using CostHead_WebApi.Migrations;
using CostHead_WebApi.Models;
using CostHead_WebApi.Models.Dtos;
using CostHead_WebApi.Repositary;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace CostHead_WebApi.Controllers
{
    public class CostHeadController : ODataController
    {
        private readonly ICost _cost;
        private readonly ApplicationDBContext _db;
        public CostHeadController(ICost costHead, ApplicationDBContext db) {

            _cost = costHead;

            _db = db;
        }




        [HttpGet, Route("api/CostHeadController/GetCostHead")]
        public IActionResult GetallDetails(ODataQueryOptions<Cost> options)
        {
            try
            {

                var query = _db.Costs.Where(tb => tb.IsActive == true).AsQueryable();
                var results = options.ApplyTo(query);
                return Ok(results);

            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost, Route("api/CostHeadController/PostCostHead")]
        public async Task<ActionResult<Cost>>CostPost(Cost cosy){

            if(_cost == null)
            {
                NotFound();
            }
            Cost obj = new Cost();

            obj.CostHeadName = cosy.CostHeadName;
            obj.Remarks = cosy.Remarks;
            obj.IsActive = cosy.IsActive;


            var results = await _cost.AddCost(obj);

            return Ok();
            
          
        }
        [HttpDelete,Route("api/CostHeadController/Delete")]
        public async Task<int> Delete(int id)
        {
            int delete = await _cost.Delete(id);
            if(delete == 0)
            {
                NotFound();
            }
            return 1;          

        }


        [HttpPatch]
        [Route("api/CostHeadController/UpdateCost/{id}")]
        public async Task<ActionResult<int>> UpdateCost(int id, CostHeadDto details)
        {
            try
            {
                var updatedetails = await _cost.GetAllUpdate(id, details);

                if (updatedetails != null)
                {
                    return Ok(updatedetails);
                }
                return Problem("Update Details is getting null");
            }
            catch (Exception)
            {
                throw;
            }

        }






    }
}           





	
	





