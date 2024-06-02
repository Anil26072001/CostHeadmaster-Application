using CostHead_WebApi.Data;
using CostHead_WebApi.Repositary;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle



builder.Services.AddDbContext<ApplicationDBContext>
(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection1")));

builder.Services.AddScoped<ICost, CostHead>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var MyAllowSpecificOrgins = "_myAllowSpecificOrgins";
builder.Services.AddCors(Options =>
{
    Options.AddPolicy(name: MyAllowSpecificOrgins,

    Policy =>
    {
        Policy.WithOrigins("https://localhost:7243")
      .AllowAnyHeader()
      .AllowAnyMethod();

    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseRouting();

app.MapControllers();

app.MapControllerRoute(
    name: " default",
    pattern: "{controller}/{action}/{id?}");
app.UseCors(MyAllowSpecificOrgins);

app.Run();
