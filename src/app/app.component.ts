import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'employee-management-root',
  imports: [RouterOutlet, ConfirmDialogModule, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Employee-Management';
}
