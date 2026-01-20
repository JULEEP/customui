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
         <Route path="/visitingcards" element={<VisitingCardEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
