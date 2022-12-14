import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockDetailPage } from './block-detail';
import { TransactionListComponentModule } from '../../components/transaction-list/transaction-list.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    BlockDetailPage
  ],
  imports: [
    IonicPageModule.forChild(BlockDetailPage),
    TransactionListComponentModule,
    HeadNavComponentModule,
    FooterComponentModule
  ],
  exports: [
    BlockDetailPage
  ]
})
export class BlockDetailPageModule {
  
}
