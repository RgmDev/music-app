import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UserEditComponent } from './components/user-edit.component'
import { AppComponent } from './app.component'

const AppRoutes: Routes = [
  { path: '', component: UserEditComponent },
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: UserEditComponent}
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes)

