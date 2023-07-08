import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss'],
})
export class AdressesComponent implements OnInit {
  addresses = [
    {
      id: 0,
      type: 'Main address',
      name: 'Mój dom Lublin',
      street: 'Przyjazna',
      buildingNumber: 5,
      apartmentNumber: 10,
      postalCode: '00-200',
      town: 'Arrakis',
      planet: '',
    },
    {
      id: 1,
      type: 'Teleportation point address',
      name: 'Adres punktu teleportacji 2',
      street: 'Przyjazna',
      buildingNumber: 5,
      apartmentNumber: 10,
      postalCode: '12-300',
      town: 'Kaladan',
      planet: '',
    },
    {
      id: 2,
      type: 'Teleportation point address',
      name: 'Adres punktu teleportacji 1',
      street: 'Przyjazna',
      buildingNumber: 5,
      apartmentNumber: 10,
      postalCode: '34-100',
      town: 'Kaitain',
      planet: '',
    },
    {
      id: 3,
      type: 'Different address',
      name: 'Inny adres 1',
      street: 'Przyjazna',
      buildingNumber: 5,
      apartmentNumber: 10,
      postalCode: '60-001',
      town: 'Wallach',
      planet: '',
    },
    {
      id: 4,
      type: 'Main address',
      name: 'Siedziba',
      street: 'Graniczna',
      buildingNumber: 4,
      apartmentNumber: 9,
      postalCode: '20-010',
      town: 'Lublin',
      planet: 'O4B',
    },
  ];
  @ViewChild('addressForm') addressForm;
  formBarFillingWidth = '0%';
  showAddressModal = false;
  isAddressEditing = false;
  managedAddress;
  addressManaged = false;
  username;
  confirmationText;
  tiledLayout = false;
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.username = this.authService.loggedUser.login;
    this.managedAddress = {
      id: null,
      type: '',
      name: '',
      address: '',
      street: '',
      buildingNumber: null,
      apartmentNumber: null,
      postalCode: '',
      town: '',
      planet: '',
    };
  }

  progressionBarHandler() {
    const numberOfControls = 8;
    let numberOfValidControls = 0;
    Object.keys(this.addressForm.form.controls).forEach((key) => {
      if (this.addressForm.form.controls[key].valid) {
        numberOfValidControls++;
      }
    });
    this.formBarFillingWidth =
      (numberOfValidControls / numberOfControls) * 100 + '%';
  }

  onShowOptions(options) {
    options.classList.toggle('showOptions');
  }

  onClose() {
    if (this.addressForm) {
      if (this.addressForm.form.touched) {
        this.translate.get('CONFIRMATION-TEXT').subscribe((res: string) => {
          this.confirmationText = res;
        });
        if (confirm(this.confirmationText) == true) {
          this.showAddressModal = false;
          this.isAddressEditing = false;
          this.addressManaged = false;
        }
      } else {
        this.showAddressModal = false;
        this.isAddressEditing = false;
        this.addressManaged = false;
      }
    } else {
      this.showAddressModal = false;
      this.isAddressEditing = false;
      this.addressManaged = false;
    }
  }

  postalCodeHandler(postalCodeInput) {
    if (postalCodeInput.value.length == 2) {
      this.managedAddress.postalCode = `${postalCodeInput.value}-`;
    }
  }

  onAdd() {
    this.showAddressModal = true;
    this.managedAddress = {
      ...this.managedAddress,
      postalCode: '',
    };
    setTimeout(() => {
      this.progressionBarHandler();
    }, 1);
  }

  onEdit(editingAddress) {
    this.managedAddress = editingAddress;
    this.isAddressEditing = true;
    this.showAddressModal = true;
    setTimeout(() => {
      this.addressForm.form.patchValue({
        type: editingAddress.type,
        name: editingAddress.name,
        planet: editingAddress.planet,
        postalCode: editingAddress.postalCode,
        town: editingAddress.town,
        street: editingAddress.street,
        buildingNumber: editingAddress.buildingNumber,
        apartmentNumber: editingAddress.apartmentNumber,
      });
      this.progressionBarHandler();
    }, 1);
  }

  onDelete(deletedAddress) {
    const deletedAddressIndex = this.addresses.findIndex(
      (address) => address.id === deletedAddress.id
    );
    this.addresses.splice(deletedAddressIndex, 1);
  }

  onSubmit() {
    if (!this.isAddressEditing) {
      Object.keys(this.managedAddress).forEach((key) => {
        this.managedAddress[key] = this.addressForm.form.value[key];
      });
      this.managedAddress.id = this.addresses.length;
      this.addresses.unshift(this.managedAddress);
      this.addressManaged = true;
    } else {
      const editingAddressIndex = this.addresses.findIndex(
        (address) => address.id === this.managedAddress.id
      );
      const editingAddress = this.addresses[editingAddressIndex];
      Object.keys(editingAddress).forEach((key) => {
        editingAddress[key] = this.addressForm.form.value[key];
      });
      this.addressManaged = true;
    }
  }
}
