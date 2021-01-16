import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        UsersComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
    ],
}) export class UsersModule { }