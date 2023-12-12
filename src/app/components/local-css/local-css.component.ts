import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-local-css',
    templateUrl: './local-css.component.html',
    styleUrls: ['./local-css.component.scss']
})
export class LocalCssComponent implements OnInit {

    @Input() cssURL?: string;

    public safeHTML!: SafeHtml;

    constructor(private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        if (this.cssURL) {
            let string = '<link rel="stylesheet" type="text/css" href="' + this.cssURL + '">';
            this.safeHTML = this._sanitizer.bypassSecurityTrustHtml(string);
        }
    }

}
