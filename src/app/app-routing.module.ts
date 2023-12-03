import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignPageComponent } from './design-page/design-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';


const routes: Routes = [
    { path: 'sign-in', component: LoginPageComponent },
    { path: 'projects', component: ProjectListPageComponent },
    { path: 'project-edit', component: ProjectEditPageComponent },
    { path: 'design/:id', component: DesignPageComponent },
    { path: '**', redirectTo: "sign-in" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }