import { ProjectPageModule } from './project-page.module';

describe('BlankPageModule', () => {
    let projectPageModule: ProjectPageModule;

    beforeEach(() => {
        projectPageModule = new ProjectPageModule();
    });

    it('should create an instance', () => {
        expect(projectPageModule).toBeTruthy();
    });
});
