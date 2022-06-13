using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Simple_Test.Models
{
    public class Employee
    {

        [Key]
        public int UserId { get; set; }
        [Required]//[Column(TypeName="nvarchar(100)")]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public int Salary { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

    }
}
