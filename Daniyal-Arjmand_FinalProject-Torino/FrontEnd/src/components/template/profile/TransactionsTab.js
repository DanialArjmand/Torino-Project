"use client";

import useSWR from "swr";
import { getTransactions } from "@/app/api/config";
import {
  formatToShortJalaliDateTime,
  formatToPersianNumber,
} from "@/lib/formatters";

import styles from "./TransactionsTab.module.css";

const fetcher = () => getTransactions().then((res) => res.data);

const translateTransactionType = (type) => {
  if (type === "Purchase") {
    return "ثبت نام در تور گردشگری";
  }
  return type;
};

function TransactionsTab() {
  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR("/user/transactions", fetcher);

  if (isLoading) {
    return <p>در حال بارگذاری تراکنش‌ها...</p>;
  }
  if (error) {
    return <p>خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.</p>;
  }
  if (!transactions || transactions.length === 0) {
    return <p>هیچ تراکنشی برای نمایش وجود ندارد.</p>;
  }

  return (
    <div className={styles.mainItem}>
      <div className={styles.tableContainer}>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>نوع تراکنش</th>
              <th>مبلغ (تومان)</th>
              <th>تاریخ و ساعت</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td data-label="شماره سفارش">{tx.id}</td>
                <td data-label="نوع تراکنش">
                  {translateTransactionType(tx.type)}
                </td>
                <td data-label="مبلغ">{formatToPersianNumber(tx.amount)}</td>
                <td data-label="تاریخ و ساعت">
                  {formatToShortJalaliDateTime(tx.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTab;
