using Microsoft.AspNetCore.Components.Web;

namespace CostHead_WebApi.Models
{
    public class Cost
    {

        public int CostId { get; set; }

        public string? CostHeadName { get; set; }
            
        public string? Remarks { get; set; }


        public bool IsActive  { get; set; }

        public bool IsDelete { get; set; } = true;

    }
}
