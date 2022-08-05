import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadcastTxPage } from './broadcast-tx';
import { LatestTransactionsComponentModule } from '../../components/latest-transactions/latest-transactions.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';

@NgModule({
  declarations: [
    BroadcastTxPage
  ],
  imports: [
    HeadNavComponentModule,
    FooterComponentModule,
    LatestTransactionsComponentModule,
    IonicPageModule.forChild(BroadcastTxPage)
  ],
  exports: [
    BroadcastTxPage
  ]
})
export class BroadcastTxPageModule {}
