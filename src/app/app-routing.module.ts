import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignPageComponent } from './rooftop/design-page/design-page.component';
import { ProjectEditPageComponent } from './project/project-edit-page/project-edit-page.component';
import { ProjectListPageComponent } from './project/project-list-page/project-list-page.component';
import { PermitPageComponent } from './permit/permit-page/permit-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HostPageComponent } from './host-page/host-page.component';
import { SharePageComponent } from './share/share-page/share-page.component';


const routes: Routes = [
    {
        path: 'project',
        children: [
            { path: "edit", component: ProjectEditPageComponent },
            { path: "list", component: ProjectListPageComponent },
            { path: '**', redirectTo: "list" }
        ],
        canActivate: [AuthGuard]
    },
    { path: 'permit/:id', component: PermitPageComponent, canActivate: [AuthGuard] },
    { path: 'design/:id', component: DesignPageComponent, canActivate: [AuthGuard] },
    { path: 'share/:id', component: SharePageComponent },
    { path: 'permit/:type/:id', component: PermitPageComponent },
    { path: 'host', component: HostPageComponent },
    { path: '**', redirectTo: "project" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }