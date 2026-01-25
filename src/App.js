import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DemoPage from "./Pages/DemoPage";
import HomePage from "./Pages/Homepage";
import PricingCart from "./Pages/Pricing";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermCondition from "./Pages/TermCondition";
import DemoTable from "./Pages/DemoTable";
import ShippingPolicy from './Pages/ShippingPolicy'
import CancellationAndRefundPolicy from "./Pages/CancellationAndRefundPolicy";
import KeyFeatures from "./Pages/KeyFeatures";
import WhyChooseAlludeAI from "./Pages/WhyUs";
import ContactUs from "./Pages/ContactUs";
import AboutAlludeAI from "./Pages/AboutUs";
import VisitingCardEditor from "./Pages/VisitingCardEditor";
import BillBooksGrid from "./Pages/BillBooksGrid";
import SingleBillBook from "./Pages/SingleBillBook";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import EmptyCartPage from "./Pages/EmptyCartPage";
import WishlistPage from "./Pages/WishlistPage";
import EnvelopeList from "./Pages/EnvelopeList";
import SingleEnvelope from "./Pages/SingleEnvelope";
import LetterheadList from "./Pages/LetterheadList";
import SingleLetterhead from "./Pages/SingleLetterhead";
import VisitingCardList from "./Pages/VisitingCardList";
import SingleVisitingCard from "./Pages/SingleVisitingCard";
import PrescriptionPadList from "./Pages/PrescriptionPadList";
import SinglePrescriptionPad from "./Pages/SinglePrescriptionPad";
import CashReceiptList from "./Pages/CashReceiptList";
import CashReceiptDesignPage from "./Pages/CashReceiptDesignPage";

function App() {
  return (
    <Router>
      {/* Google Translate Widget at the Top */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<KeyFeatures />} />
        <Route path="/whyus" element={<WhyChooseAlludeAI />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutAlludeAI />} />
        <Route path="/billbooks" element={<BillBooksGrid />} />
        <Route path="/bill-books/:id" element={<SingleBillBook />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<EmptyCartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/envelopes" element={<EnvelopeList />} />
        <Route path="/envelope/:id" element={<SingleEnvelope />} />
        <Route path="/letterheads" element={<LetterheadList />} />
        <Route path="/letterhead/:id" element={<SingleLetterhead />} />
        <Route path="/visitingcards" element={<VisitingCardList />} />
        <Route path="/visitingcard/:id" element={<SingleVisitingCard />} />
        <Route path="/prescriptionpads" element={<PrescriptionPadList />} />
        <Route path="/prescriptionpad/:id" element={<SinglePrescriptionPad />} />
        <Route path="/receipts" element={<CashReceiptList />} />
        <Route path="/receipt/:id" element={<CashReceiptDesignPage />} />
      </Routes>
    </Router>
  );
}

export default App;
