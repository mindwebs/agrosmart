import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ConfigComponent } from 'src/app/modules/config/config.component';
import { MatDividerModule, MatCardModule, MatSidenavModule, MatSlideToggleModule, MatSelectModule, MatButtonModule, MatInputModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { SelectPropertyComponent } from 'src/app/modules/select-property/select-property.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SetupComponent,
    LoginComponent,
    ConfigComponent,
    SelectPropertyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    Title,
    CookieService
  ]
})
export class SetupModule { }
