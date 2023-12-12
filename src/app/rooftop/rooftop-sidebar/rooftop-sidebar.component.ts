import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SolarInstance, Solar, App } from '@websolar/ng-websolar';

@Component({
    selector: 'app-rooftop-sidebar',
    templateUrl: './rooftop-sidebar.component.html',
    styleUrls: ['./rooftop-sidebar.component.scss']
})
export class RooftopSidebarComponent {

    @ViewChild("secondPanel") _secondPanel!: ElementRef<HTMLElement>;

    @Input() hideBack = false;

    @Input() instance!: SolarInstance;

    @Input() project!: Solar.Project;

    @Input() mode: App.MenuMode = "Design";

    @Output() modeChange = new EventEmitter<App.MenuMode>();

    public largePanels = ["Reports", "Battery", "Consumption", "Electrical"] as App.MenuMode[];

    constructor(private _router: Router) {
    }

    /**
     * Handle menu change
     * @param mode 
     */
    public onMenuItemActivate(mode: App.MenuMode) {
        this.mode = mode;

        if (this.instance) {
            // send complete event if tool active
            this.instance.sendEscape();

            if (mode == "Simulation" || mode == "Reports") {
                this.instance.layers.irradiance = true;
            }
            else {
                this.instance.layers.irradiance = false;
            }

            if (mode == "Electrical") {
                this.instance.layers.electrical = true;
            }
            else {
                this.instance.layers.electrical = false;
            }

            this.updateEditingByMode();

            this.instance.layers.update();

            setTimeout(() => {
                this.instance.resize();
            }, 10);
        }

        try {
            if (this._secondPanel) {
                // scroll to top
                this._secondPanel.nativeElement.scrollTo({ top: 0 });
            }
        }
        catch (err) {
            console.error(err);
        }

        this.modeChange.emit(this.mode);
    }

    private updateEditingByMode() {
        if (this.isDesignMode()) {
            this.instance.enableDesignEditing();
        }
        else if (this.isElectricalMode()) {
            this.instance.disableEditing();
            // enable only object editing for inverters and meters
            // this.instance.objectEditor.enable(["inverter", "meter", "main_service_panel", "ac_disconnect"]);
        }
        else {
            this.instance.disableEditing();
        }
    }

    private isElectricalMode() {
        return (this.mode == "Electrical");
    }

    private isDesignMode() {
        return (this.mode == "Design" ||
            this.mode == "Obstacles" ||
            this.mode == "Trees" ||
            this.mode == "KeepoutLines" ||
            this.mode == "Meters" ||
            this.mode == "Inverters" ||
            this.mode == "MainServicePanel" ||
            this.mode == "ACDisconnect" ||
            this.mode == "CableTrays");
    }

    public onBack() {
        this._router.navigate(["/project/list"]);
    }

}
