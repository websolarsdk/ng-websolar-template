import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solar, SolarInstance, App, ProjectService, NotifyService, AuthService, ObjectService } from '@websolar/ng-websolar';

@Component({
    selector: 'app-design-page',
    templateUrl: './design-page.component.html',
    styleUrls: ['./design-page.component.scss']
})
export class DesignPageComponent implements OnInit {

    public project!: Solar.Project;

    public objects!: Solar.Object[];

    public instance!: SolarInstance;

    public mode: App.MenuMode = "Design";

    public isLoading = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _notify: NotifyService,
        private _auth: AuthService,
        private _projectService: ProjectService,
        private _objService: ObjectService
    ) { }

    async ngOnInit() {
        try {
            this.isLoading = true;


            const query = this._activatedRoute.snapshot.queryParams;

            let id = this._activatedRoute.snapshot.params["id"];
            if (!id) {
                // try get from query
                id = query["id"] as string;
            }

            if (!id) {
                throw `project id is not passed`;
            }

            if (query["token"]) {
                // set session token
                this._auth.setToken(query["token"]);
            }

            // load objects first
            const objects = await this._objService.find({ projectId: id });

            // load project
            this.project = await this._projectService.findOne(id);

            this.objects = objects;

            this._projectService.postInitalize(this.project, this.objects);
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public onInstanceReady(inst: SolarInstance) {
        this.instance = inst;
    }
}
