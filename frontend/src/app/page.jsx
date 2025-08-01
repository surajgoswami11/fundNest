import Campaign from "./campaign/page";
import MainDashboard from "./dashboard/page";
import DocumentUplaod from "./documents/upload-document/page";
import HomePage from "./Home/page";
import PaymentPage from "./payment/page";

export default function Home() {
  return (
    <>
      <HomePage />
      <MainDashboard />
      <Campaign />
      <PaymentPage />
      <DocumentUplaod />
    </>
  );
}
