import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal.service';
import { MissionService } from 'src/app/missions.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  @HostBinding('class.showOptions') showOptions: boolean = false;

  loadMissions = false;
  isLoading = false;
  missions = [];
  constructor(
    private modalService: ModalService,
    private missionService: MissionService
  ) {}
  onShowOptions(options) {
    options.classList.toggle('showOptions');
  }
  onLoad() {
    this.isLoading = true;
    setTimeout(() => {
      this.missions = this.missionService.missions;
      this.loadMissions = true;
      this.isLoading = false;
    }, 800);
  }
  ngOnInit(): void {
    this.missions = this.missionService.missions;
  }
  getColor(status) {
    if (status == 'completed') {
      return '#555555';
    }
    if (status == 'future') {
      return '#1B67E0';
    }
  }
  onAdd() {
    this.modalService.showMissionsModal();
  }
  onEdit(mission) {
    this.modalService.showMissionsModal();
    this.missionService.editMission(mission);
  }
  onDelete(mission) {
    this.missionService.deleteMission(mission);
  }
}
