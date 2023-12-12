import { Component, OnInit } from '@angular/core';
import { CustomizationService, NotifyService } from '@websolar/ng-websolar';

@Component({
    selector: 'app-host-page',
    templateUrl: './host-page.component.html',
    styleUrls: ['./host-page.component.scss']
})
export class HostPageComponent implements OnInit {

    public isLoading = false;

    constructor(
        private _notify: NotifyService,
        private _customization: CustomizationService
    ) { }

    public async ngOnInit() {
        try {
            const customization = await this._customization.find();
            if (!customization || !customization.rootWebsite) {
                throw `The main website is not configured. Please contact to your admin`
            }
            document.location.href = customization.rootWebsite;
        }
        catch (err) {
            this._notify.error(err);
        }
    }

}
