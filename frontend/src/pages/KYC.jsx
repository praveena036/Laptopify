import { Navigate } from "react-router-dom";

function KYC() {
  return <Navigate to="/sell-laptop?step=kyc" replace />;
}

export default KYC;
