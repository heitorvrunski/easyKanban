import { Pipe, PipeTransform } from "../../../../node_modules/@angular/core";
import { Project } from "../../_models/project";

@Pipe({
    name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {
    transform(projects: Project[], filter: string) {
        return projects.filter((prj) => {
            if (prj.projectName.toLowerCase().includes(filter.toLowerCase()))
                return prj;
        })
    }
}