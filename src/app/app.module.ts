import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  NgWebsolarModule } from '@websolar/ng-websolar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListPageComponent } from './project/project-list-page/project-list-page.component';
import { ProjectEditPageComponent } from './project/project-edit-page/project-edit-page.component';
import { DesignPageComponent } from './rooftop/design-page/design-page.component';
import { RooftopSidebarComponent } from './rooftop/rooftop-sidebar/rooftop-sidebar.component';
import { LocalCssComponent } from './components/local-css/local-css.component';
import { AuthGuard } from './guards/auth.guard';
import { HostPageComponent } from './host-page/host-page.component';
import { SplitStringPipe } from './pipes/split.string.pipe';
import { SharePageComponent } from './share/share-page/share-page.component';
import { PermitPageComponent } from './permit/permit-page/permit-page.component';

@NgModule({
    declarations: [
        AppComponent,
        ProjectListPageComponent,
        ProjectEditPageComponent,
        DesignPageComponent,
        RooftopSidebarComponent,
        LocalCssComponent,
        HostPageComponent,
        SplitStringPipe,
        SharePageComponent,
        PermitPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        AppMaterialModule,
        CommonModule,
        NgWebsolarModule
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
