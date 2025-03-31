import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent implements AfterViewInit {
  dotLottie?: DotLottie;
  @ViewChild('dotlottieCanvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  ngAfterViewInit() {
    this.dotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: this.canvas.nativeElement,
      src: 'lottie/cart.json', // or .json file
    });
  }
}
