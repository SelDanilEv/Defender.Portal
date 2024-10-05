import { Currency } from "src/models/shared/Currency";

type mainCurrency = Currency | string;

export default interface MainDiagramSetup {
  lastMonths: number;
  mainCurrency: mainCurrency;

  startDate: Date;
  endDate: Date;

  isLoaded: boolean;
}
