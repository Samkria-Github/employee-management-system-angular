import { inject, Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService  {
  private ngxLoader = inject(NgxUiLoaderService);
  loading: string[] = [];
  loaderChannel = new Subject<string[]>();

  addToLoader(key: string): void {
    this.loading.push(key);
    this.loaderChannel.next(this.loading);
    this.ngxLoader.start();
  }
  removeFromLoader(key: string): void {
    this.loading = this.loading.filter(item => item !== key);
    this.loaderChannel.next(this.loading);
    this.ngxLoader.stop();
  }
}