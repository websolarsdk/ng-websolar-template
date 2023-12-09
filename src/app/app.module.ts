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
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';
import { DesignPageComponent } from './design-page/design-page.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        ProjectListPageComponent,
        ProjectEditPageComponent,
        DesignPageComponent
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
