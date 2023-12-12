import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService, ProjectService, ShareService, Solar } from '@websolar/ng-websolar';

@Component({
    selector: 'app-share-page',
    templateUrl: './share-page.component.html',
    styleUrls: ['./share-page.component.scss']
})
export class SharePageComponent implements OnInit {

    public isLoading = false;

    public project!: Solar.Project;

    public objects!: Solar.Object[];

    constructor(
        private _notify: NotifyService,
        private _activatedRoute: ActivatedRoute,
        private _shareService: ShareService,
        private _projectService: ProjectService
    ) { }

    ngOnInit(): void {
        this.load();
    }

    private async load() {
        try {
            this.isLoading = true;

            const id = this._activatedRoute.snapshot.params["id"];
            if (!id) {
                throw `id is empty`
            }

            const data = await this._shareService.getData(id);

            this._projectService.postInitalize(data.project, data.objects);

            this.project = data.project;
            this.objects = data.objects;
        }
        catch (err) {
            this._notify.error(err);
            this.isLoading = false;
        }
    }

}
