import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
export class MissionService {
  missions = [
    {
      id: 0,
      name: 'Peking',
      deadline: '09-06-2023',
      status: 'in progress',
      budget: 100,
    },
    {
      id: 1,
      name: 'Dynamo',
      deadline: '24-12-2023',
      status: 'in progress',
      budget: 100,
    },
    {
      id: 2,
      name: 'Foo',
      deadline: '01-01-2024',
      status: 'in progress',
      budget: 50,
    },
    {
      id: 3,
      name: 'Traveler 001',
      deadline: '13-03-2023',
      status: 'completed',
      budget: 50,
    },
    {
      id: 4,
      name: 'Wielki grill',
      deadline: '09-10-2025',
      status: 'future',
      budget: 50,
    },
  ];
  isMissionEditing = false;
  editingMission = {};
  deadlineDate = {
    day: null,
    month: null,
    year: null,
  };
  constructor(private translate: TranslateService) {}
  editMission(mission) {
    this.isMissionEditing = true;
    this.editingMission = mission;
  }

  setDeadlineDate(deadlineToConvert) {
    const date = new Date(deadlineToConvert);
    this.deadlineDate.day =
      date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    this.deadlineDate.month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    this.deadlineDate.year = date.getFullYear().toString();
    const deadline = `${this.deadlineDate.day}-${this.deadlineDate.month}-${this.deadlineDate.year}`;
    return deadline;
  }

  onMissionAdd(newMission, missionForm) {
    Object.keys(newMission).forEach((key, i) => {
      if (i <= 2) {
        newMission[key] = missionForm[key];
      }
    });
    newMission.id = this.missions.length;
    newMission.deadline = this.setDeadlineDate(missionForm.deadline);
    this.missions.unshift(newMission);
  }

  OnMissionEdit(editingMission, missionForm) {
    const edittingMisionIndex = this.missions.findIndex(
      (mission) => mission.id === editingMission['id']
    );
    const edittingMission = this.missions[edittingMisionIndex];
    Object.keys(edittingMission).forEach((key, i) => {
      if (key != 'deadline') {
        edittingMission[key] = missionForm[key];
      }
    });
    if (editingMission.deadline === missionForm.deadline) {
      return;
    } else {
      editingMission.deadline = this.setDeadlineDate(missionForm.deadline);
    }
  }
  deleteMission(deletedMission) {
    const deletedMissionIndex = this.missions.findIndex(
      (address) => address.id === deletedMission.id
    );
    this.missions.splice(deletedMissionIndex, 1);
  }
}
