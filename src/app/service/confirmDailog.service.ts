import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private confirmationService = inject(ConfirmationService);

  showDeleteDialog(
    header: string,
    message: string,
    acceptLabel = 'Yes',
    rejectLabel = 'No'
  ): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.confirmationService.confirm({
        header,
        message,
        acceptLabel,
        rejectLabel,
        icon: 'pi pi-exclamation-circle',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-success',
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

}
