// App.tsx
// React + TypeScript single-file demo finance app with:
// 🟢 Auth flow: login/logout
// 💳 Transaction flow (mock): initiate payment, confirm payment, success/failure
// 📊 Navigation flow: dashboard, account, transaction history
//
// Works in Vite React TS project.
// Replace your App.tsx with this.

import React, { useEffect, useMemo, useState } from "react";
import * as Sentry from "@sentry/react";



type Page =
  | "login"
  | "dashboard"
  | "account"
  | "history"
  | "payment"
  | "confirm"
  | "result";

type User = {
  name: string;
  email: string;
  balance: number;
};

type TxStatus = "success" | "failure";

type Transaction = {
  id: string;
  amount: number;
  recipient: string;
  date: string;
  status: TxStatus;
};

type PaymentDraft = {
  recipient: string;
  amount: number;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("login");

  const [user, setUser] = useState<User>({
    name: "Demo User",
    email: "demo@financeapp.com",
    balance: 5000,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN1001",
      amount: 250,
      recipient: "Electricity Board",
      date: new Date().toLocaleString(),
      status: "success",
    },
    {
      id: "TXN1002",
      amount: 1200,
      recipient: "Rent Payment",
      date: new Date().toLocaleString(),
      status: "success",
    },
  ]);

  const [paymentDraft, setPaymentDraft] = useState<PaymentDraft>({
    recipient: "",
    amount: 0,
  });

  const [lastResult, setLastResult] = useState<Transaction | null>(null);
  useEffect(()=>{
    Sentry.captureException(new Error("Payment API failed (test)"));

  },[])

  const recentTransactions = useMemo(
    () => transactions.slice().reverse(),
    [transactions]
  );

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
      setPage("dashboard");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPage("login");
  };

  const startPayment = (recipient: string, amount: number) => {
    setPaymentDraft({ recipient, amount });
    setPage("confirm");
  };

  const confirmPayment = () => {
    const success =
      paymentDraft.amount > 0 &&
      paymentDraft.amount <= user.balance &&
      Math.random() > 0.2; // 80% success rate

    const tx: Transaction = {
      id: `TXN${Date.now()}`,
      amount: paymentDraft.amount,
      recipient: paymentDraft.recipient,
      date: new Date().toLocaleString(),
      status: success ? "success" : "failure",
    };

    setTransactions((prev) => [...prev, tx]);
    setLastResult(tx);

    if (success) {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance - paymentDraft.amount,
      }));
    }

    setPage("result");
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div style={styles.app}>
      <Header
        user={user}
        onNavigate={setPage}
        onLogout={logout}
      />

      <main style={styles.main}>
        {page === "dashboard" && (
          <DashboardPage
            user={user}
            recentTransactions={recentTransactions}
            onNavigate={setPage}
          />
        )}

        {page === "account" && <AccountPage user={user} />}

        {page === "history" && (
          <TransactionHistoryPage transactions={recentTransactions} />
        )}

        {page === "payment" && (
          <PaymentPage onSubmit={startPayment} />
        )}

        {page === "confirm" && (
          <ConfirmPaymentPage
            draft={paymentDraft}
            onBack={() => setPage("payment")}
            onConfirm={confirmPayment}
          />
        )}

        {page === "result" && lastResult && (
          <PaymentResultPage
            result={lastResult}
            onDone={() => setPage("dashboard")}
          />
        )}
      </main>
    </div>
  );
}

/* ---------------- HEADER ---------------- */

function Header({
  user,
  onNavigate,
  onLogout,
}: {
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}) {
  return (
    <header style={styles.header}>
      <div>
        <strong>Finance Demo</strong>
      </div>

      <nav style={styles.nav}>
        <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button onClick={() => onNavigate("account")}>Account</button>
        <button onClick={() => onNavigate("history")}>
          Transactions
        </button>
        <button onClick={() => onNavigate("payment")}>
          Send Money
        </button>
      </nav>

      <div style={styles.row}>
        <span>{user.name}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

/* ---------------- LOGIN ---------------- */

function LoginPage({
  onLogin,
}: {
  onLogin: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("demo@financeapp.com");
  const [password, setPassword] = useState("password123");

  return (
    <div style={styles.centerCard}>
      <h2>Login</h2>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={styles.primaryBtn}
        onClick={() => onLogin(email, password)}
      >
        Login
      </button>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function DashboardPage({
  user,
  recentTransactions,
  onNavigate,
}: {
  user: User;
  recentTransactions: Transaction[];
  onNavigate: (page: Page) => void;
}) {
  return (
    <div>
      <h2>Dashboard</h2>

      <div style={styles.card}>
        <p>Available Balance</p>
        <h1>${user.balance.toFixed(2)}</h1>
        <button onClick={() => onNavigate("payment")}>
          Initiate Payment
        </button>
      </div>

      <div style={styles.card}>
        <h3>Recent Transactions</h3>
        {recentTransactions.slice(0, 3).map((tx) => (
          <div key={tx.id} style={styles.listRow}>
            <span>{tx.recipient}</span>
            <span>${tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ACCOUNT ---------------- */

function AccountPage({ user }: { user: User }) {
  return (
    <div>
      <h2>Account Page</h2>

      <div style={styles.card}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Balance: ${user.balance.toFixed(2)}</p>
        <p>Account Type: Premium Savings</p>
      </div>
    </div>
  );
}

/* ---------------- HISTORY ---------------- */

function TransactionHistoryPage({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div>
      <h2>Transaction History</h2>

      <div style={styles.card}>
        {transactions.map((tx) => (
          <div key={tx.id} style={styles.historyRow}>
            <div>
              <strong>{tx.recipient}</strong>
              <div>{tx.date}</div>
            </div>

            <div>
              ${tx.amount} |{" "}
              <span
                style={{
                  color:
                    tx.status === "success"
                      ? "green"
                      : "red",
                }}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PAYMENT ---------------- */

function PaymentPage({
  onSubmit,
}: {
  onSubmit: (recipient: string, amount: number) => void;
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <h2>Initiate Payment</h2>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          style={styles.primaryBtn}
          onClick={() =>
            onSubmit(recipient, Number(amount))
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* ---------------- CONFIRM ---------------- */

function ConfirmPaymentPage({
  draft,
  onBack,
  onConfirm,
}: {
  draft: PaymentDraft;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div>
      <h2>Confirm Payment</h2>

      <div style={styles.card}>
        <p>Recipient: {draft.recipient}</p>
        <p>Amount: ${draft.amount}</p>

        <div style={styles.row}>
          <button onClick={onBack}>Back</button>
          <button
            style={styles.primaryBtn}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RESULT ---------------- */

function PaymentResultPage({
  result,
  onDone,
}: {
  result: Transaction;
  onDone: () => void;
}) {
  const success = result.status === "success";

  return (
    <div>
      <h2>{success ? "Payment Success" : "Payment Failed"}</h2>

      <div style={styles.card}>
        <p>Transaction ID: {result.id}</p>
        <p>Recipient: {result.recipient}</p>
        <p>Amount: ${result.amount}</p>
        <p>Status: {result.status}</p>

        <button
          style={styles.primaryBtn}
          onClick={onDone}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    background: "#111827",
    color: "white",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  main: {
    padding: 20,
    maxWidth: 900,
    margin: "0 auto",
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  centerCard: {
    maxWidth: 400,
    margin: "80px auto",
    background: "white",
    padding: 24,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: 10,
  },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
  },
  row: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  listRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  historyRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
};