import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";
import { UsersComponent } from "./users.component";
import { UsersService } from "./users.service";

const routes: Routes = [
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        UsersComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        UsersService,
    ],
}) export class UsersModule { }