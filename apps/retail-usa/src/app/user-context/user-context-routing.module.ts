import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectContextComponent } from './select-context/select-context.component';

const routes: Routes = [
  {
    path: '',
    component: SelectContextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserContextRoutingModule {}
