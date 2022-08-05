import { Component, ViewChild, ElementRef, HostListener } from "@angular/core";
import {
  Platform,
  MenuController,
  Nav,
  ActionSheetController,
  PopoverController,
  ToastController,
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage, BroadcastTxPage, BlocksPage } from "../pages";
import { Http } from "@angular/http";
import { ApiProvider } from "../providers/api/api";
import { CurrencyProvider } from "../providers/currency/currency";
import { DenominationComponent } from "../components/denomination/denomination";

@Component({
  templateUrl: "./app.html",
})
export class InsightApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage: any;
  public pages: Array<{ title: string; component: any }>;

  @ViewChild("dropdown") public dropdown: ElementRef;
  public showDataMenu: boolean;
  public showConnectMenu: boolean;

  public showSearch: boolean = false;
  public loading: boolean;
  public q: string;
  public btcexplorerValue: string;
  public showMenu: boolean;
  public isSearchLoading: boolean;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public splash: SplashScreen,
    public status: StatusBar,

    private http: Http,
    private api: ApiProvider,
    public currency: CurrencyProvider,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController
  ) {
    this.menu = menu;
    this.platform = platform;
    this.splash = splash;
    this.status = status;

    this.rootPage = HomePage;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: "Blocks", component: HomePage },
      { title: "Transactions", component: BroadcastTxPage },
      // { title: 'Verify Signed Message', component: VerifyMessagePage },
      // { title: 'Node Status', component: NodeStatusPage }
    ];

    this.showDataMenu = false;
    this.showConnectMenu = false;
    this.showMenu = false;
    this.isSearchLoading = false;
    this.btcexplorerValue = location.href.split("#&")[1];
    if (this.btcexplorerValue !== undefined) {
      this.q = this.btcexplorerValue;
      this.search();
    }
  }

  @HostListener("document:click", ["$event"])
  andClickEvent(event: any) {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.showDataMenu = false;
      this.showConnectMenu = false;
    }
  }

  public showDataDD() {
    this.showDataMenu = !this.showDataMenu;
    this.showConnectMenu = false;
  }

  public showConnectDD() {
    this.showConnectMenu = !this.showConnectMenu;
    this.showDataMenu = false;
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.status.styleDefault();
      this.splash.hide();
    });
  }

  public openPage(page: any): void {
    // close the menu when clicking a link from the menu
    this.showDataMenu = false;
    this.showConnectMenu = false;
    this.showMenu = false;
    // navigate to the new page if it is not the current page
    this.rootPage = page.component;
    this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }

  public search(): void {
    this.showSearch = false;
    let apiPrefix: string = this.api.apiPrefix;
    this.isSearchLoading = true;
    this.http.get(apiPrefix + "block/" + this.q).subscribe(
      function (data: any): void {
        this.resetSearch();
        console.log("block", data);
        let parsedData: any = JSON.parse(data._body);
        this.nav.push("block-detail", {
          blockHash: parsedData.hash,
        });
      }.bind(this),
      () => {
        this.http.get(apiPrefix + "tx/" + this.q).subscribe(
          function (data: any): void {
            this.resetSearch();
            console.log("tx", data);
            let parsedData: any = JSON.parse(data._body);
            this.nav.push("transaction", {
              txId: parsedData.txid,
            });
          }.bind(this),
          () => {
            this.http.get(apiPrefix + "addr/" + this.q).subscribe(
              function (data: any): void {
                this.resetSearch();
                console.log("addr", data);
                let parsedData: any = JSON.parse(data._body);
                this.nav.push("address", {
                  addrStr: parsedData.addrStr,
                });
              }.bind(this),
              () => {
                this.http.get(apiPrefix + "block-index/" + this.q).subscribe(
                  function (data: any): void {
                    this.resetSearch();
                    let parsedData: any = JSON.parse(data._body);
                    this.nav.push("block-detail", {
                      blockHash: parsedData.blockHash,
                    });
                  }.bind(this),
                  function (): void {
                    this.reportBadQuery();
                  }.bind(this)
                );
              }
            );
          }
        );
      }
    );
  }

  /* tslint:disable:no-unused-variable */
  private reportBadQuery(): void {
    this.presentToast();
    this.isSearchLoading = false;
  }

  private presentToast(): void {
    const toast: any = this.toastCtrl.create({
      message: "No matching records found!",
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  private resetSearch(): void {
    this.q = "";
    this.loading = false;
    this.isSearchLoading = false;
  }
  /* tslint:enable:no-unused-variable */

  public changeCurrency(myEvent: any): void {
    let popover: any = this.popoverCtrl.create(DenominationComponent);
    popover.present({
      ev: myEvent,
    });
  }

  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  public showDDMenu() {
    this.showMenu = !this.showMenu;
  }
}
