﻿using System.ComponentModel.DataAnnotations;

namespace CostHead_WebApi.Models
{
    public class Register
    {
        [Key]
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }

    }
}
