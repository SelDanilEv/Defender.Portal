import { Dictionary } from "src/customTypes";
import { BudgetDiagramGroups } from "src/models/budgetTracker/BudgetDiagramGroups";
import {
  BudgetHistory,
  BudgetHistoryReview,
  BudgetHistoryReviewRecord,
} from "src/models/budgetTracker/BudgetHistory";
import { Currency } from "src/models/shared/Currency";

// Function to generate random number within a range
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate random records
const generateRecords = (
  previousRecords: BudgetHistoryReviewRecord[]
): BudgetHistoryReviewRecord[] => {
  const getPreviousAmount = (name: string, currency: Currency): number => {
    const record = previousRecords.find(
      (record) => record.name === name && record.currency === currency
    );

    return record ? record.amount : getRandomNumber(1000, 2000);
  };

  var records = [
    // {
    //   name: "Bank",
    //   tags: ["pln", "saving"],
    //   amount:
    //     getPreviousAmount("Bank", Currency.PLN) + getRandomNumber(-100, 150),
    //   currency: Currency.PLN,
    // },
    {
      name: "Bank 2",
      tags: ["pln", "test tag"],
      amount:
        getPreviousAmount("Bank 2", Currency.PLN) + getRandomNumber(-50, 80),
      currency: Currency.PLN,
    },
    // {
    //   name: "Wallet",
    //   tags: ["pln"],
    //   amount:
    //     getPreviousAmount("Wallet", Currency.PLN) + getRandomNumber(-100, 100),
    //   currency: Currency.PLN,
    // },
    // {
    //   name: "Cash",
    //   tags: ["eur", "saving"],
    //   amount:
    //     getPreviousAmount("Cash", Currency.EUR) + getRandomNumber(-100, 110),
    //   currency: Currency.EUR,
    // },
  ];

  if (getRandomNumber(0, 100) > 70) {
    records.push({
      name: "Bank 3",
      tags: ["usd", "saving"],
      amount:
        getPreviousAmount("Bank 3", Currency.USD) + getRandomNumber(-140, 140),
      currency: Currency.USD,
    });
  }

  return records;
};

// Function to generate random rates
const generateRates = (): Dictionary<Currency, number> => ({
  USD: getRandomNumber(100, 110) / 100,
  EUR: 1,
  PLN: getRandomNumber(400, 420) / 100,
  GEL: getRandomNumber(320, 340) / 100,
  RUB: getRandomNumber(80, 90),
  BYN: getRandomNumber(30, 35) / 100,
});

// Generate a large dataset
const generateLargeDataset = (numEntries: number): BudgetHistoryReview[] => {
  const dataset: BudgetHistoryReview[] = [];
  let currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - 7 * numEntries);

  let records = generateRecords([]);

  for (let i = 0; i < numEntries; i++) {
    dataset.push({
      date: new Date(currentDate), // Use the current date
      records: records,
      // balances: generateBalances(records),
      baseCurrency: Currency.EUR,
      rates: generateRates(),
    });

    records = generateRecords(records);

    // Increment the date by one day
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return dataset;
};

// Test dataset as BudgetHistory object
const testDataset: BudgetHistory = new BudgetHistory(generateLargeDataset(100));

export default testDataset;

export const groups: BudgetDiagramGroups = new BudgetDiagramGroups([
  {
    id: "group_1",
    name: "All",
    tags: [],
    color: "#008ae5",
    showTrendline: true,
    translineColor: "#ff8a13",
    isActive: true,
  },
  {
    id: "group_2",
    name: "Test",
    tags: ["test tag"],
    color: "#33cc00",
    showTrendline: true,
    translineColor: "#FF0000",
    isActive: true,
  },
]);
