import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstateCreateComponent } from './estate/estate-create/estate-create.component';
import { EstateDetailsComponent } from './estate/estate-details/estate-details.component';
import { EstateListComponent } from './estate/estate-list/estate-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
    {
        path: "",
        runGuardsAndResolvers: "always",
        // canActivate: [AuthGuard],
        children: [
            {path: "register", component: RegisterComponent},
            {path: "nieruchomosci", component: EstateListComponent},
            {path: "nieruchomosci/create", component: EstateCreateComponent },
            {path: "nieruchomosci/:id", component: EstateDetailsComponent}
        ]
    },
    {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
