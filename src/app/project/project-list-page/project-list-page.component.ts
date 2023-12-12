import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Solar, ProjectService, NotifyService, AuthService } from '@websolar/ng-websolar';


@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss']
})
export class ProjectListPageComponent implements OnInit {

    @ViewChild("paginator") paginator!: MatPaginator;

    public searchText = "";

    public isLoading = true;

    public projects: Solar.Project[] = [];

    public noProjects = false;

    public displayedColumns = ['name', 'date', 'actions'];

    public pageOptions = [10, 30, 50, 100];

    public resultsLength = 0;

    private _timer: unknown;

    constructor(
        private _projectService: ProjectService,
        private _notify: NotifyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _auth: AuthService
    ) { }

    async ngOnInit() {


        const query = this._activatedRoute.snapshot.queryParams;
        if (query["token"]) {
            // set session token
            this._auth.setToken(query["token"]);
        }

        setTimeout(() => {
            this.reload();
        }, 500)
    }

    public onSearchChange() {
        if (this._timer) {
            clearTimeout(this._timer as number)
        }

        this._timer = setTimeout(() => {
            this.reload();
        }, 300);
    }

    public async loadPage() {
        try {
            this.isLoading = true;
            this.projects = [];

            const skip = this.paginator.pageIndex * this.paginator.pageSize;

            this.projects = await this._projectService.find({
                search: this.searchText,
                skip: skip,
                limit: this.paginator.pageSize
            });
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    private async reload() {
        try {
            this.isLoading = true;

            this.paginator.pageIndex = 0;
            this.resultsLength = await this._projectService.count({
                search: this.searchText
            })

            await this.loadPage();

            if (this.searchText) {
                this.noProjects = false;
            }
            else {
                this.noProjects = this.resultsLength == 0;
            }
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public async copyProject(project: Solar.Project, evt: MouseEvent) {
        try {
            evt.preventDefault();
            evt.stopPropagation();

            this.isLoading = true;

            const res = await this._projectService.clone({
                name: `${project.name} (COPY)`,
                id: project._id || ""
            });

            // navigate to new project
            this._router.navigate([`/design/${res.id}`]);
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public async deleteProject(project: Solar.Project, evt: MouseEvent) {
        try {
            evt.preventDefault();
            evt.stopPropagation();

            this.isLoading = true;

            await this._projectService.delete({
                id: project._id || ""
            });

            await this.reload();
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public navigateToProject(project: Solar.Project) {
        this._router.navigate([`/design/${project._id}`]);
    }

}
