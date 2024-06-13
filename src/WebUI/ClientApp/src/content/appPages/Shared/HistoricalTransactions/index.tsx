import { Card } from "@mui/material";
import HistoricalTransactionsTable from "./Table";
import TransactionHistoryResponse from "src/models/responses/banking/transactions/TransactionHistoryResponse";
import { useEffect, useState } from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import { GetHistoricalTransactionsRequest } from "src/models/requests/banking/GetHistoricalTransactionsRequest";
import Transaction from "src/models/banking/Transaction";

interface HistoricalTransactionsProps {
  targetWalletId?: string;
  targetWalletNumber?: number;
}

const HistoricalTransactions = (props: HistoricalTransactionsProps) => {
  const u = useUtils();

  const [transactions, setTransaction] = useState<Transaction[]>([]);

  const [paginationRequest, setPaginationRequest] =
    useState<GetHistoricalTransactionsRequest>({
      page: 0,
      pageSize: 5,
      walletId: props.targetWalletId,
    } as GetHistoricalTransactionsRequest);

  const applyPagination = (page: number, limit: number) => {
    if (paginationRequest.page === page && paginationRequest.pageSize === limit)
      return;
    setPaginationRequest({ ...paginationRequest, page, pageSize: limit });
  };

  const [pagination, setPagination] = useState<CurrentPagination>({
    totalItemsCount: 0,
    currentPage: 0,
    pageSize: 5,
    totalPagesCount: 1,
  } as CurrentPagination);

  useEffect(() => {
    reloadTransactionHistory();
  }, [paginationRequest]);

  const reloadTransactionHistory = () => {
    const url =
      `${apiUrls.banking.transactionHistory}` +
      `${RequestParamsBuilder.BuildQuery(paginationRequest)}`;

    APICallWrapper({
      url: url,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const transactionHistory: TransactionHistoryResponse =
          await response.json();

        setTransaction(transactionHistory.items);
        setPagination(transactionHistory);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  return (
    <Card>
      <HistoricalTransactionsTable
        transactions={transactions}
        applyPagination={applyPagination}
        pagination={pagination}
        refresh={reloadTransactionHistory}
        targetWalletNumber={props.targetWalletNumber}
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(HistoricalTransactions);
