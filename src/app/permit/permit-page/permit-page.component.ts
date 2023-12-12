import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomizationService, NotifyService, Solar } from '@websolar/ng-websolar';

@Component({
    selector: 'app-permit-page',
    templateUrl: './permit-page.component.html',
    styleUrls: ['./permit-page.component.scss']
})
export class PermitPageComponent implements OnInit {

    public isLoading = false;

    public project!: Solar.Project;

    public email = "";

    public id = "";

    public type: "share" | "demo" | "project" = "project";

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _notify: NotifyService,
        private _router: Router,
        private _customization: CustomizationService
    ) { }

    ngOnInit() {
        this.load();
    }

    private async load() {
        try {
            this.isLoading = true;
            this.id = this._activatedRoute.snapshot.params["id"];
            if (!this.id) {
                throw `id is empty`
            }

            const type = this._activatedRoute.snapshot.params["type"];
            if (type) {
                this.type = type;
            }

            try {
                const customization = await this._customization.find();
                this.email = customization.supportEmail;
            }
            catch (err) {
                console.error(err);
            }
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

    public print() {
        window.print();
    }

    public back() {
        if (this.project) {
            this._router.navigate([`/design/${this.project._id}`]);
        }
        else {
            this._router.navigate(["/project/list"]);
        }
    }
}
