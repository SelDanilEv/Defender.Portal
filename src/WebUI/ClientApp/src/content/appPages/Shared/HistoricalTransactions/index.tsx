import { Card } from "@mui/material";
import HistoricalTransactionsTable from "./Table";
import TransactionHistoryResponse, {
  Transaction,
} from "src/models/responses/banking/transactions/TransactionHistoryResponse";
import { useEffect, useState } from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestBuilder from "src/api/APIWrapper/RequestBuilder";
import { GetHistoricalTransactionsRequest } from "src/models/requests/banking/GetHistoricalTransactionsRequest";

interface HistoricalTransactionsProps {
  walletId?: string;
}

const HistoricalTransactions = (props: HistoricalTransactionsProps) => {
  const u = useUtils();

  const [transactions, setTransaction] = useState<Transaction[]>([]);

  const [paginationRequest, setPaginationRequest] =
    useState<GetHistoricalTransactionsRequest>({
      page: 0,
      pageSize: 5,
      walletId: props.walletId,
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
      `${RequestBuilder.BuildQuery(paginationRequest)}`;

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
