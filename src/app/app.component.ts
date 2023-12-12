import { Component, OnInit } from '@angular/core';
import { CustomizationService, NotifyService, SolarConfiguration } from '@websolar/ng-websolar';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private _notify: NotifyService,
        private _customization: CustomizationService
    ) { }

    async ngOnInit() {
        try {
            // setup SDK configuration
            //
            SolarConfiguration.service = environment.service;

            // Load google script
            await this.loadGoogleScript();
        }
        catch (err) {
            this._notify.error(err);
        }
    }


    private async loadGoogleScript() {
        // load script to DOM
        const script = document.createElement('script');
        script.src = `${environment.service}/google-script`;
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
}
