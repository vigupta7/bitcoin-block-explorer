import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutpointPage } from './outpoint';
import { TransactionComponentModule } from '../../components/transaction/transaction.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    OutpointPage
  ],
  imports: [
    IonicPageModule.forChild(OutpointPage),
    TransactionComponentModule,
    HeadNavComponentModule,
    FooterComponentModule
  ],
  exports: [
    OutpointPage
  ]
})
export class OutpointPageModule {

}
