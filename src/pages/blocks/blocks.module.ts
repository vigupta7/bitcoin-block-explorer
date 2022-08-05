import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlocksPage } from './blocks';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LatestBlocksComponentModule } from '../../components/latest-blocks/latest-blocks.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    BlocksPage
  ],
  imports: [
    IonicPageModule.forChild(BlocksPage),
    HeadNavComponentModule,
    FooterComponentModule,
    LatestBlocksComponentModule
  ],
  exports: [
    BlocksPage
  ]
})
export class BlocksPageModule {}
