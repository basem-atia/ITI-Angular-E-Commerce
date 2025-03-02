import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CategoriesComponent } from '../../components/categories/categories/categories.component';
import { FlashSalesComponent } from '../../components/flash-sales/flash-sales.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [
    SideBarComponent,
    CategoriesComponent,
    FlashSalesComponent,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  time: number = 300050;
  productsFlash: any = [
    {
      img: 'https://s3-alpha-sig.figma.com/img/5d5c/2e52/50752d55f8b60f2aa2923183dadbc135?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Lue-WfNRxXsWTtiD1iUM~cfhT4rDJO8dbUzqCA1upxp3l8rtJUDNL90P801snSqj7s5rncO~VjwPhzFT4eGuLTBbmMln2mfFhBVM6hKxZzNxrgnyLGo5-bmuPhs~Ie4gIWspVKSbHFSDvi1ZURKt-RaOGvaipxRqawKg-3zKxIORIwPfHOiyE9WGwmhLRE9WAkVMTplY1NMumImMBEpcw3Gjg-IPXO~L9Gi90MBLUgc834o-ERLZrMxZM9kj7z97~cdYbU7N-N4NZE2teQC2MxoefxyozPBKZ0NIz-KKJ7~KgCeqKJW4h-rwfweCINWQ5UDpDyIBTZyOv4AY-PDj2Q__',
      name: 'HAVIT HV-G92 Gamepad',
      price: '140',
      oldPrice: '160',
      discount: '40',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/e59d/9f34/8cc24eeff489863523b63971c3ff8e4a?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kHQPPDT9nxG4WhMXw9pZmVZidfzui2rfmPIw4v~MvUlTJnCtCKrdoT26qcmKaofKEXMbSMeaNMpoaNEtzZPbcl1V0nSyVO08kZZOw4tG-dIFmS6NfgHttlGYUVog-oW~Yc2JbGEZlogMYl9buqSZeCSiK~nhcoc2HEjd8bz7AYRDFe74LfUqZGocYuCqZRJC8c23IkzhmgmxZWD0~U39ufrMWa4vgxcsJCkU~OVnQUfUbmO9K42rOXfrDEY8HolS0J4-kXw7ghy0Dk0O6zZwqpbVgVqRVecQ1iPvSXzae4CdsojA7bv1xQ4Uk8grAlLIvIRofCYpPHf02yW6qvV3ZA__',
      name: 'AK-900 Wired Keyboard',
      price: '960',
      oldPrice: '1160',
      discount: '35',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/5e63/4682/db5174aff99bb9337d2dc9598a0b44e4?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WXm37n0YIx7RI3E6hmPVbV8U9gcnURY2QCkIP1cKexHMSAfaeOl~o~n3K-bOJaf8ptjP6RbIuGT6T3zCmb824B8hQLSPpICb5tgit9zBlVz2JE97pVg7D0OxmDWR0u3bdefkSPyUPoVD884VzrcA-LtdZ7FjDZfwoYL-3Qi2xIDY05LLAjK4lqSiPrF2zNcM5aEQJo9kXRCqgUopysnpovtNM1ic3-Fj1MoAiEic43qBoZrV7cA0fR4SrYcThkmEq2Y~lsFXPYa3FvNidtCHdjAzsH9FBjOC2pshPc8offSjtKU16nrakqIORBSbvze3oQkv3EjU~-Kr7vwNQ8XHbA__',
      name: 'AK-900 Wired Keyboard',
      price: '960',
      oldPrice: '1160',
      discount: '35',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/288d/a330/273c46e1c3dc0a8915c4b031d0345347?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=idWrPL0zSGdMcLOhBIsQfJEoTdWlG~28LXLjZpKOTHeq7Ce9MD3VickibZRuKKOevRkqXRPR0O6BJCVyuEuP7zM7ohaAajOynYaCPiWNGCiftBWVcmQswYa~m8qjoXC5NIKVFT~xeVT0kKuPWHoW-fLahlCbPxeIr5ZdZP6w4A9OCe2vZwLLYH093lNo-4eSE1S-6wnH4SDCF7ysNBTehK3FfuJuy4BhWaYVLElFQxXUll~3XObQjEKlhsTFUVZZmsqjlDZ3Unc8jklLLUzJR4em5bet3Pb9czKUYIPNzehzlTt6Av6UDzU31c8bMupuCEGRWfaptPfbwp8jnu3AtA__',
      name: 'AK-900 Wired Keyboard',
      price: '960',
      oldPrice: '1160',
      discount: '35',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/ee9a/3800/1e9f94261b28e16ea21bacb4144473e8?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hvIVD7CaRpIkPhchqObndREwaqdYxAmnI0G-e1pjdKY7nyP7YMKNlRtZ1vcK7VoeB6c3LaHxNAYTkkrV4cCHwg-uoLSA-c8ACpwMlvKlqEPOGhqLcTwsE2-6sArFPMKDgeJNqBmVyNZWl6apzETMGk364JvES3OVRd2gks714UUfVWbu-vel35~hUmOSXPFk1tCfbd9yYsmrtNS2QiZ49i7sB42qzYHnBktr4sty5e3Ga7R7P3IhAsD2Fe-Z4m1do~BRwnoSxowKgYb4Df12UTXQ3yOOYbJEssM4b9ye83Oj~LR3LuYvhaHmBXHkEUGccCfU~Jp-pzFpS1vepwe2tQ__',
      name: 'HAVIT HV-G92 Gamepad',
      price: '140',
      oldPrice: '160',
      discount: '40',
    },
  ];
  products: any = [
    ...this.productsFlash,
    ...this.productsFlash,
    ...this.productsFlash,
    ...this.productsFlash,
    ...this.productsFlash,
    ...this.productsFlash,
  ];
}
