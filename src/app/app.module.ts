import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; //
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { interceptorProvider, TokenInterceptor } from './interceptors/token-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './pages/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    interceptorProvider,
    AuthRedirectGuard,
    provideClientHydration(),
    provideAnimationsAsync(),
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
