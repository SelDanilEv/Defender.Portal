﻿using System.Text;
using System.Text.Json.Serialization;
using Defender.Common.Enums;
using Defender.Common.Errors;
using Defender.Common.Exceptions;
using Defender.Common.Extension;
using Defender.Common.Helpers;
using Defender.Portal.Application.Configuration.Extension;
using Defender.Portal.WebUI.ErrorMapping;
using FluentValidation.AspNetCore;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ClaimTypes = Defender.Common.Consts.ClaimTypes;
using ProblemDetailsOptions = Hellang.Middleware.ProblemDetails.ProblemDetailsOptions;

namespace Defender.Portal.WebUI;

public static class ConfigureServices
{
    public static IServiceCollection AddWebUIServices(
        this IServiceCollection services,
        IWebHostEnvironment environment,
        IConfiguration configuration
    )
    {
        services.AddCommonServices(configuration);

        services.AddApplicationOptions(configuration);

        services.AddHttpContextAccessor();

        services.AddProblemDetails(options => ConfigureProblemDetails(options, environment));

        services.AddJwtAuthentication(configuration);

        services.AddSwagger();

        services.AddFluentValidationAutoValidation();

        services
            .AddControllers()
            .AddJsonOptions(x =>
            {
                x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                x.JsonSerializerOptions.DefaultIgnoreCondition =
                    JsonIgnoreCondition.WhenWritingNull;
            });

        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true
        );

        return services;
    }

    private static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services
            .AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    NameClaimType = ClaimTypes.NameIdentifier,
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidIssuer = configuration["JwtTokenIssuer"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(SecretsHelper.GetSecretSync(Secret.JwtSecret, true))
                    ),
                };
            });

        return services;
    }

    private static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.UseInlineDefinitionsForEnums();
            options.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Defender Portal",
                    Description = "UI for Defender ecosystem",
                }
            );

            options.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description =
                        "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter your token in the text input below.\r\n\r\nExample: \"1sample\"",
                }
            );

            options.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                        },
                        new string[] { }
                    },
                }
            );
        });

        return services;
    }

    private static void ConfigureProblemDetails(
        ProblemDetailsOptions options,
        IWebHostEnvironment environment
    )
    {
        options.IncludeExceptionDetails = (ctx, ex) => environment.IsLocalOrDevelopment();

        options.Map<ServiceException>(exception =>
        {
            var problemDetails = new ProblemDetails();
            problemDetails.Detail = ErrorMappingHelper.MapErrorCode(exception.Message);
            problemDetails.Status = StatusCodes.Status400BadRequest;
            return problemDetails;
        });

        options.Map<Exception>(exception =>
        {
            var problemDetails = new ProblemDetails();
            problemDetails.Detail = UIErrorCodes.UnhandledError.ToString();
            problemDetails.Status = StatusCodes.Status500InternalServerError;
            return problemDetails;
        });
    }
}
