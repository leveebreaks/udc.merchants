using System.Text.Json;
using System.Text.Json.Serialization;
using FluentValidation;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using UDC.MerchantApi.Domain;
using UDC.MerchantApi.Features.Merchants;
using UDC.MerchantApi.Features.Merchants.CreateMerchant;
using UDC.MerchantApi.Features.Merchants.DeleteMerchant;
using UDC.MerchantApi.Features.Merchants.GetMerchants;
using UDC.MerchantApi.Features.Merchants.UpdateMerchant;
using UDC.MerchantApi.Infrastructure.Persistence;
using UDC.MerchantApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IMerchantRepository, MerchantRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

await app.Services.EnsureSeededAsync();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Servers = new List<ScalarServer>() { new ScalarServer("http://localhost:5297") };
    });
}

//app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlerMiddleware>();

var merchantsGroup = app.MapGroup("/api/merchants");
merchantsGroup
    .MapGetMerchants()
    .MapCreateMerchant()
    .MapUpdateMerchant()
    .MapDeleteMerchant();
    
app.Run();