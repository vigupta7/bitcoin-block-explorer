import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LatestTransactionsComponentModule } from '../../components/latest-transactions/latest-transactions.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HeadNavComponentModule,
    FooterComponentModule,
    LatestTransactionsComponentModule
  ],
  exports: [
  ]
})
export class HomePageModule {
  
}