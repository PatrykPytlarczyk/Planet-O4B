import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/modal.service';
import { MissionService } from 'src/app/missions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions-modal',
  templateUrl: './missions-modal.component.html',
  styleUrls: ['./missions-modal.component.scss'],
})
export class MissionsModalComponent implements AfterContentInit {
  @ViewChild('form') missionForm;

  missionAdded = false;
  missionEdited = false;
  isMissionEditting = this.missionService.isMissionEditing;
  newMission;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private missionService: MissionService
  ) {}
  ngAfterContentInit(): void {
    if (this.isMissionEditting) {
      this.newMission = {
        name: '',
        budget: null,
        status: '',
        deadline: '',
        id: null,
      };
      Object.keys(this.newMission).forEach((key) => {
        this.newMission[key] = this.missionService.editingMission[key];
      });
    } else {
      this.newMission = {
        name: '',
        budget: null,
        status: '',
        deadline: '',
        id: null,
      };
    }
  }

  onClose() {
    this.modalService.showModal = false;
    this.missionService.isMissionEditing = false;
  }
  onBack() {
    this.router.navigate(['dashboard/main-dashboard']);
    this.modalService.showModal = false;
  }

  onSubmit() {
    if (!this.isMissionEditting) {
      this.missionService.onMissionAdd(
        this.newMission,
        this.missionForm.form.value
      );

      this.missionAdded = true;
    } else {
      this.missionService.OnMissionEdit(
        this.missionService.editingMission,
        this.missionForm.form.value
      );
      this.missionEdited = true;
      this.missionService.editingMission = false;
    }
  }
}
