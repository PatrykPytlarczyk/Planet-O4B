import { AfterContentChecked, Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterContentChecked {
  showModal: boolean;
  constructor(private modalService: ModalService) {}

  ngAfterContentChecked() {
    this.showModal = this.modalService.showModal;
  }
}
