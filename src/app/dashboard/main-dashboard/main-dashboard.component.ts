import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/missions.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  activeMissions = 0;
  constructor(private missionService: MissionService) {}
  ngOnInit() {
    this.missionService.missions.forEach((mission) => {
      mission.status === 'in progress' ? this.activeMissions++ : '';
    });
  }
}
