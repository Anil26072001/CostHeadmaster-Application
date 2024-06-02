using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CostHead_WebApi.Migrations
{
    /// <inheritdoc />
    public partial class costss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remark",
                table: "Costs");

            migrationBuilder.AlterColumn<string>(
                name: "CostHeadName",
                table: "Costs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "Costs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "Costs");

            migrationBuilder.AlterColumn<string>(
                name: "CostHeadName",
                table: "Costs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remark",
                table: "Costs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
