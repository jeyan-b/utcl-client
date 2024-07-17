import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalSharedService } from '../../../core/services/global-shared.service';
import { AppSettings } from '../../../app-constants/appSettings';
import { MatDialog } from '@angular/material/dialog';
import { LoiDetailsComponent } from '../../../shared/components/loi-details/loi-details.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Agency, Agreement, CcnfCommision, DoDSales, Gkr, OtherExpense } from '../model/agency';
import { LoiService } from '../service/loi.service';

@Component({
  selector: 'app-ccnf-loi',
  templateUrl: './ccnf-loi.component.html',
  styleUrls: ['./ccnf-loi.component.css'],
})
export class CcnfLoiComponent implements OnInit {
  xpandStatus: boolean = true;
  successNotification: boolean = false;
  failureNotification: boolean = false;
  isNextClicked: boolean = false;
  agencyForm: FormGroup;
  agreementForm: FormGroup;
  ccnfCommisionForm: FormGroup;
  dodSalesForm: FormGroup;
  gkrForm: FormGroup;
  otherExpenseForm: FormGroup;
  selectedTab = new FormControl(0);
  isDataSaved: any = {}
  agreementDetails = {
    vendorCode: 562988698,
    address: 'Laxmi Traders, Sector-14, Gokhale Road, Pune',
    city: 'Pune',
    pincode: 411033,
    vendorGSTNo: '57320865',
    vendorPAN: 'ASD423KJJ',
    storageLocationName: 'Pune',
    slocCode: '123456',
    totalPeriod: '2 Years'
  }
  items: FormArray;
  expenseTableData = [{
    'expenseType': 'Electricity Charges',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Landline',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Mobile',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Office Connection',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Connection at Godown',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Connectivity Expense',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Internet',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Courier',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Printing & Stationary',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Computer Consumables',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  },
  {
    'expenseType': 'Photocopy Charges',
    'applicable': 'Yes',
    'maxValue': '',
    'sharingPercentage': ''
  }

  ]
  constructor(
    private titleSvc: Title,
    private globalSharedSrv: GlobalSharedService,
    private _dialog: MatDialog,
    private loiService: LoiService,
    private formBuilder: FormBuilder
  ) {
    this.titleSvc.setTitle(AppSettings.applicationName + '- CCNF-LOI');
    this.globalSharedSrv.pageTitle.next('CCNF LOI');
  }

  ngOnInit() {

    this.agencyForm = new FormGroup({
      agency_vendor: new FormControl('', Validators.required),
      agency_agencyName: new FormControl('', Validators.required),
      agency_state: new FormControl('', Validators.required),
      agency_region: new FormControl('', Validators.required),
      agency_depot: new FormControl('', Validators.required),
      agency_district: new FormControl('', Validators.required),
    });
    this.agreementForm = new FormGroup({
      agreement_startDate: new FormControl('', Validators.required),
      agreement_endDate: new FormControl('', Validators.required),
      agreement_billingCycle: new FormControl('', Validators.required),
    });
    this.ccnfCommisionForm = new FormGroup({
      ccnf_commisionRangeFrom: new FormControl('', Validators.required),
      ccnf_commisionRangeTo: new FormControl('', Validators.required),
      ccnf_metroCityCommission: new FormControl('Yes', Validators.required),
      ccnf_commissionValue: new FormControl('', Validators.required),
      ccnf_applyMinimumCommission: new FormControl('Yes', Validators.required),
      ccnf_minimumCommissionSlab: new FormControl('', Validators.required),
      ccnf_guBtHandledByCCnF: new FormControl('Yes', Validators.required),
      ccnf_guBtPlantCodeName: new FormControl([], Validators.required),
      ccnf_plant1Code: new FormControl('', Validators.required),
      ccnf_plant2Code: new FormControl('', Validators.required),
      ccnf_plant3Code: new FormControl('', Validators.required),
      ccnf_plant4Code: new FormControl('', Validators.required),
      ccnf_guBtPlantStandardCommission: new FormControl('', Validators.required),
      ccnf_interCompanySaleApplicable: new FormControl('Yes', Validators.required),
      ccnf_Commission: new FormControl('', Validators.required),
      ccnf_interUnitSalesApplicable: new FormControl('Yes', Validators.required),
      ccnf_interUnitSalesCommission: new FormControl('', Validators.required),
      ccnf_otherDepoCommissionDeductionApplicable: new FormControl('Yes', Validators.required),
      ccnf_salestoOtherDepoCommission: new FormControl('', Validators.required),
      ccnf_SalesFromOtherDepoCommission: new FormControl('', Validators.required),
    });

    this.dodSalesForm = new FormGroup({
      dod_salesApplicable: new FormControl('Yes', Validators.required),
      dod_SlabRangeFrom: new FormControl('', Validators.required),
      dod_slabRangeTo: new FormControl('', Validators.required),
      dod_reducedCommission: new FormControl('Yes', Validators.required),
      dod_commission: new FormControl('', Validators.required)
    });

    this.gkrForm = new FormGroup({
      gkr_fixedRent: new FormControl('Yes', Validators.required),
      gkr_greaterThree: new FormControl('', Validators.required),
      gkr_lesserThree: new FormControl('', Validators.required)

    });

    this.otherExpenseForm = new FormGroup({
      oe_depot: new FormControl('', Validators.required),
      oe_district: new FormControl('', Validators.required),
      oe_office: new FormControl('', Validators.required),
      items: new FormArray([])
    });

    this.expenseTableData.forEach(element => {
      this.addItem(element);
    });

    this.agencyForm.statusChanges.subscribe((result) => {
      console.log(result);
      this.isDataSaved.isAgencyDataSaved = false;
    });
    this.agreementForm.statusChanges.subscribe((result) => {
      console.log(result);
      this.isDataSaved.isAgreementDataSaved = false;
    });
    this.ccnfCommisionForm.statusChanges.subscribe((result) => {
      console.log(result);
      this.isDataSaved.isCCnFCommisionDataSaved = false;
    });
    this.dodSalesForm.statusChanges.subscribe((result) => {
      console.log(result);
      this.isDataSaved.isDodSalesDataSaved = false;
    });
    this.gkrForm.statusChanges.subscribe((result) => {
      console.log(result);
      this.isDataSaved.isGkrDataSaved = false;
    });
  }

  createItem(data): FormGroup {
    return this.formBuilder.group({
      oe_expenceType: new FormControl(data.expenseType, Validators.required),
      oe_isApplicable: new FormControl(data.applicable, Validators.required),
      oe_maxValue: new FormControl('', Validators.required),
      oe_sharingPercentage: new FormControl('', Validators.required),
    });
  }
  addItem(data): void {
    this.items = this.otherExpenseForm.get('items') as FormArray;
    this.items.push(this.createItem(data));
  }


  openLoiDetail() {
    this._dialog.open(LoiDetailsComponent);
  }

  goToNextTab() {
    this.selectedTab.setValue(this.selectedTab.value + 1);
    this.isNextClicked = false;
    console.log(this.selectedTab.value);
  }

  // moveToPrev() {
  //   this.selectedTab.setValue(this.selectedTab.value - 1);
  // }

  saveMoveToNext(tabName) {
    this.isNextClicked = true;
    switch (tabName) {
      case 'agency':
        this.saveAgency();
        break;
      case 'agreement':
        this.saveAgreement();
        break;
      case 'commision':
        this.saveCcnfCommision();
        break;
      case 'sales':
        this.saveDodSales();
        break;
      case 'gkr':
        this.saveGkr();
        break;
      case 'expense':
        this.saveOtherExpense();
        break;

      default:
        break;
    }

  }


  saveAgency() {
    this.agencyForm.markAllAsTouched();
    this.agencyForm.markAsDirty();
    if (this.agencyForm.valid) {
      let agency: Agency = {
        agencyName: this.agencyForm.value.agency_agencyName,
        depot: this.agencyForm.value.agency_depot,
        district: this.agencyForm.value.agency_district,
        region: this.agencyForm.value.agency_region,
        state: this.agencyForm.value.agency_state,
        vendor: this.agencyForm.value.agency_vendor,
      };
      this.loiService.postAgency(agency).subscribe({
        next: (response) => {
          this.isDataSaved.isAgencyDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }

  saveAgreement() {
    this.agreementForm.markAllAsTouched();
    this.agreementForm.markAsDirty();
    if (this.agreementForm.valid) {
      let agreement: Agreement = {
        startDate: this.agreementForm.value.agreement_startDate,
        endDate: this.agreementForm.value.agreement_endDate,
        billingCycle: this.agreementForm.value.agreement_billingCycle,
        vendorCode: this.agreementDetails.vendorCode,
        address: this.agreementDetails.address,
        city: this.agreementDetails.city,
        pincode: this.agreementDetails.pincode,
        vendorGSTNo: this.agreementDetails.vendorGSTNo,
        vendorPAN: this.agreementDetails.vendorPAN,
        storageLocationName: this.agreementDetails.storageLocationName,
        slocCode: this.agreementDetails.slocCode,
        totalPeriod: this.agreementDetails.totalPeriod
      };

      this.loiService.postAgreement(agreement).subscribe({
        next: (response) => {
          this.isDataSaved.isAgreementDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }

  saveCcnfCommision() {
    this.ccnfCommisionForm.markAllAsTouched();
    this.ccnfCommisionForm.markAsDirty();
    if (this.ccnfCommisionForm.valid) {
      let ccnfCommision: CcnfCommision = {
        commisionRangeFrom: this.ccnfCommisionForm.value.ccnf_commisionRangeFrom,
        commisionRangeTo: this.ccnfCommisionForm.value.ccnf_commisionRangeTo,
        metroCityCommission: this.ccnfCommisionForm.value.ccnf_metroCityCommission,
        commissionValue: this.ccnfCommisionForm.value.ccnf_commissionValue,
        applyMinimumCommission: this.ccnfCommisionForm.value.ccnf_applyMinimumCommission,
        minimumCommissionSlab: this.ccnfCommisionForm.value.ccnf_minimumCommissionSlab,
        guBtHandledByCCnF: this.ccnfCommisionForm.value.ccnf_guBtHandledByCCnF,
        guBtPlantCodeName: this.ccnfCommisionForm.value.ccnf_guBtPlantCodeName,
        plant1Code: this.ccnfCommisionForm.value.ccnf_plant1Code,
        plant2Code: this.ccnfCommisionForm.value.ccnf_plant2Code,
        plant3Code: this.ccnfCommisionForm.value.ccnf_plant3Code,
        plant4Code: this.ccnfCommisionForm.value.ccnf_plant4Code,
        guBtPlantStandardCommission: this.ccnfCommisionForm.value.ccnf_guBtPlantStandardCommission,
        interCompanySaleApplicable: this.ccnfCommisionForm.value.ccnf_interCompanySaleApplicable,
        Commission: this.ccnfCommisionForm.value.ccnf_Commission,
        interUnitSalesApplicable: this.ccnfCommisionForm.value.ccnf_interUnitSalesApplicable,
        interUnitSalesCommission: this.ccnfCommisionForm.value.ccnf_interUnitSalesCommission,
        otherDepoCommissionDeductionApplicable: this.ccnfCommisionForm.value.ccnf_otherDepoCommissionDeductionApplicable,
        salestoOtherDepoCommission: this.ccnfCommisionForm.value.ccnf_salestoOtherDepoCommission,
        SalesFromOtherDepoCommission: this.ccnfCommisionForm.value.ccnf_SalesFromOtherDepoCommission,
      };

      this.loiService.postCcnfCommision(ccnfCommision).subscribe({
        next: (response) => {
          this.isDataSaved.isCCnFCommisionDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }

  saveDodSales() {
    this.dodSalesForm.markAllAsTouched();
    this.dodSalesForm.markAsDirty();
    if (this.dodSalesForm.valid) {
      let dodSales: DoDSales = {
        salesApplicable: this.dodSalesForm.value.dod_salesApplicable,
        SlabRangeFrom: this.dodSalesForm.value.dod_SlabRangeFrom,
        slabRangeTo: this.dodSalesForm.value.dod_slabRangeTo,
        reducedCommission: this.dodSalesForm.value.dod_reducedCommission,
        commission: this.dodSalesForm.value.dod_commission
      };
      this.loiService.postDoDSales(dodSales).subscribe({
        next: (response) => {
          this.isDataSaved.isDodSalesDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }

  saveGkr() {
    this.gkrForm.markAllAsTouched();
    this.gkrForm.markAsDirty();
    if (this.gkrForm.valid) {
      let gkr: Gkr = {
        fixedRent: this.gkrForm.value.gkr_fixedRent,
        greaterThree: this.gkrForm.value.gkr_greaterThree,
        lesserThree: this.gkrForm.value.gkr_lesserThree
      };
      this.loiService.postGkr(gkr).subscribe({
        next: (response) => {
          this.isDataSaved.isGkrDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }
  saveOtherExpense() {
    this.otherExpenseForm.markAllAsTouched();
    this.otherExpenseForm.markAsDirty();
    if (this.otherExpenseForm.valid) {
      let otherExpense: OtherExpense = {
        depot: this.otherExpenseForm.value.oe_depot,
        district: this.otherExpenseForm.value.oe_district,
        office: this.otherExpenseForm.value.oe_office,
        expense: this.otherExpenseForm.value.items
      };
      this.loiService.postOtherExpense(otherExpense).subscribe({
        next: (response) => {
          this.isDataSaved.isGkrDataSaved = true;
          this.successNotification = true;
          setTimeout(() => {
            this.successNotification = false;
          }, 2000);
          if (this.isNextClicked) {
            this.goToNextTab();
          }
        },
        error: (error) => {
          this.failureNotification = true;
          setTimeout(() => {
            this.failureNotification = false;
          }, 3000);
        },
      })
    } else {
      this.isNextClicked = false;
    }
  }
}
