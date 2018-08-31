using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using easyK.API.Models;
using Microsoft.EntityFrameworkCore;

namespace easyK.API.Data
{
    public class GitRepository : IGitRepository
    {
        public ProcessStartInfo SetGitInfo(ProcessStartInfo pS)
        {
            pS.CreateNoWindow = true;
            pS.RedirectStandardError = true;
            pS.RedirectStandardOutput = true;
            pS.FileName = @"C:\Program Files (x86)\Git\bin\git.exe";
            return pS;
        }
        public bool isGITProcessOn()
        {
            Process[] pName = Process.GetProcessesByName("git");
            if (pName.Length == 0)
                return false;
            else
                return true;
        }

        public void StartGITProcess()
        {
            if(isGITProcessOn())
                return;
            Process git = new Process();
            ProcessStartInfo pS = new ProcessStartInfo();
            git.StartInfo = SetGitInfo(pS);
            

        }
    }
}