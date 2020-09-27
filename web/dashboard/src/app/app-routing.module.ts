import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StatsComponent } from './modules/stats/stats.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { ControlComponent } from './modules/control/control.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HelpComponent } from './modules/help/help.component';
import { SetupComponent } from './layouts/setup/setup.component';
import { LoginComponent } from './modules/login/login.component';
import { ConfigComponent } from './modules/config/config.component';
import { SelectPropertyComponent } from './modules/select-property/select-property.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'stats',
    component: StatsComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  }, {
    path: 'control',
    component: ControlComponent
  }, {
    path: 'contact',
    component: ContactComponent
  }, {
    path: 'help',
    component: HelpComponent
  }]
}, {
  path: 'setup',
  component: SetupComponent,
  children: [
    {
      path: '',
      component: LoginComponent
    }, {
      path: 'config',
      component: ConfigComponent
    }, {
      path: 'selectProperty',
      component: SelectPropertyComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
