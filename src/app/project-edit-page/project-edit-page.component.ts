import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Solar, AuthService, ProjectService, NotifyService } from 'ng-websolar';

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.scss']
})
export class ProjectEditPageComponent  {

    public bannerText = "";

    public isLoading = false;

    public project = {} as Solar.Project;

    public projectSizes: { id: Solar.ProjectSize, name: string }[] = [
        { id: "", name: "Residential" },
        { id: "2x", name: "Commercial I" },
        { id: "3x", name: "Commercial II" }
    ]


    constructor(
        private _projectService: ProjectService,
        private _notify: NotifyService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        if (!this.project.location) {
            this.project.location = {
                name: "",
                lng: 0,
                lat: 0
            }
        }
        if (!this.project.measurement) {
            this.project.measurement = "imperial";
        }
        if (!this.project.projectSize) {
            this.project.projectSize = "";
        }
        if (!this.project.type) {
            this.project.type = "rooftop";
        }
        if (this.project.type == "ground") {
            // currently support only 3x
            this.project.projectSize = "3x";
        }
    }

    public async ngAfterViewInit() {
        try {
            const id = this._activatedRoute.snapshot.queryParams["id"]
            if (!id) {
                return;
            }

            this.project = await this._projectService.findOne(id)
        }
        catch (err) {
            this._notify.error(err);
        }
    }


    public onLocationChange(loc: Solar.GeoLocation) {
        console.log(`New location:`, loc);
        this.bannerText = `Update your location by moving the map`;
        this.project.location = loc;

        if (!this.project._id || !this.project.measurement) {
            // auto detect the measurement
            if (this.project.location.lng < 0 ||
                this.project.location.lat < 0) {
                this.project.measurement = "imperial";
            }
            else {
                this.project.measurement = "metric";
            }
        }
    }

    public onProjectTypeChange() {
        if (this.project.type == "ground") {
            this.project.projectSize = "3x";
        }
    }

    public async save() {
        try {
            this.isLoading = true;

            if (typeof this.project.location.lng != "number" ||
                !this.project.location.lng) {
                throw `invalid location`
            }
            if (typeof this.project.location.lat != "number" ||
                !this.project.location.lat) {
                throw `invalid location`
            }
            while (this.project.location.lng < -180) {
                this.project.location.lng += 360;
            }
            while (this.project.location.lng > 180) {
                this.project.location.lng -= 360;
            }



            // delete wheater and consumptions and DEM, because location changed
            this.project.weather = null as any;
            this.project.consumption = null as any;
            this.project.dem = null as any;
            this.project.demObj = null as any;

            if (this.project.type == "ground") {
                // set terrain as default
                this.project.mapType = "terrain";
                this.project.projectSize = "3x";
            }

            const res = await this._projectService.save({
                project: this.project
            });

            this._router.navigate([`/design/${res.id}`]);
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public isValid() {
        if (!this.project.name ||
            !this.project.location) {
            return false;
        }
        return true;
    }

    public onChangeMeasurement() {

    }

}
