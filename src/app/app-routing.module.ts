import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ViewIdeaComponent} from "./components/idea/view/view-idea.component";
import {FormComponent} from "./components/form/form.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'idea/:ideaId',
    component: ViewIdeaComponent
  },
  {
    path: 'Form',
    component: FormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
