using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using easyK.API.Data;
using easyK.API.Dtos;
using easyK.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace easyK.API.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _proRepo;
        public ProjectController(IProjectRepository proRepo)
        {
            _proRepo = proRepo;

        }
        [HttpGet("getProjects")]
        public async Task<IActionResult> GetProjects()
        {
            var c = User.Identity.Name;
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = claims.FirstOrDefault();

            IEnumerable<Project> proList = await _proRepo.GetProjects(Convert.ToInt32(userId.Value));
            return Ok(proList);

        }
        [HttpPost("addProject")]
        public async Task<IActionResult> AddProject([FromBody] Project project)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var c = User.Identity.Name;
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = claims.FirstOrDefault();

            await _proRepo.AddProject(project,Convert.ToInt32(userId.Value));
            if(await _proRepo.SaveAll())
                return NoContent();
        
            throw new Exception($"Fail to add project!");

        }

        [HttpPost("editProject")]
        public async Task<IActionResult> EditProject([FromBody] Project project)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var p = await _proRepo.EditProject(project);
            if(p != null)
                return NoContent();
        
            throw new Exception($"Fail to edit project!");

        }

        [HttpPost("deleteProject")]
        public async Task<IActionResult> DeleteProject([FromBody] Project project)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            _proRepo.DeleteProject(project);

            if(await _proRepo.SaveAll())
                return NoContent();
            
            throw new Exception($"Fail to remove project!");
        }
        [HttpGet("getUsersOfProject/{projectId}")]
        public async Task<IActionResult> GetUsersOfProject(int projectId)
        {
            IEnumerable<UserInfo> userList = await _proRepo.GetUsersOfProject(projectId);
            return Ok(userList);

        }
        [HttpPost("addUserToProject/{userName}")]
        public async Task<IActionResult> addUserToProject([FromBody] Project project,string userName)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var res = await _proRepo.AddUserToProject(project,userName);
            if(await _proRepo.SaveAll() && res != null)
                return NoContent();
        
            throw new Exception($"Fail to add user to project!");

        }
        [HttpPost("deleteUserToProject/{userName}")]
        public async Task<IActionResult> deleteUserToProject([FromBody] Project project,string userName)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var res = await _proRepo.DeleteUserToProject(project,userName);
            if(await _proRepo.SaveAll() && res != null)
                return NoContent();
        
            throw new Exception($"Fail to remove user of project!");

        }

    }
}