using System.Collections.Generic;
using System.Threading.Tasks;
using easyK.API.Models;

namespace easyK.API.Data
{
    public interface IGitRepository
    {
        void StartGITProcess();
        bool isGITProcessOn();

    }
}