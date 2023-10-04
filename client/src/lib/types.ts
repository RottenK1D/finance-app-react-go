export type ExpensesByCategory = {
  salaries: number;
  supplies: number;
  services: number;
};

export type Month = {
  id: number;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
};

export type Day = {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
};
export type GetKpisResponse = {
  id: string;
  __v: number;
  totalProfit: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
};

export type GetProductsResponse = {
  id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
};

export type GetTransactionsResponse = {
  id: string;
  __v: number;
  buyer: string;
  amount: number;
  expense: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
};
