export interface Agency{
    agencyName:string;
    vendor:string;
    state:string;
    region:string;
    depot:string;
    district:string;
}
export interface Agreement{
    startDate:Date;
    endDate:Date;
    billingCycle:string;
    vendorCode: number,
    address: string,
    city: string,
    pincode: number,
    vendorGSTNo: string,
    vendorPAN: string,
    storageLocationName: string,
    slocCode: string,
    totalPeriod: string
}
export interface CcnfCommision{
    commisionRangeFrom:number,
    commisionRangeTo:number,
    metroCityCommission: string,
    commissionValue: number,
    applyMinimumCommission: string,
    minimumCommissionSlab: number,
    guBtHandledByCCnF: string,
    guBtPlantCodeName: [],
    plant1Code: string,
    plant2Code: string,
    plant3Code: string,
    plant4Code: string,
    guBtPlantStandardCommission: number,
    interCompanySaleApplicable: string,
    Commission: number,
    interUnitSalesApplicable: string,
    interUnitSalesCommission: number,
    otherDepoCommissionDeductionApplicable: string,
    salestoOtherDepoCommission: number,
    SalesFromOtherDepoCommission: number,
}

export interface DoDSales {
    salesApplicable: string,
    SlabRangeFrom:number,
    slabRangeTo: number,
    reducedCommission: string,
    commission: number
  };

export interface Gkr {
    fixedRent: string,
    greaterThree:number,
    lesserThree: number
  };

  export interface OtherExpense {
    depot: string,
    district:[],
    office: string,
    expense:[]
  };