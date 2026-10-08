import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import "./SellLaptop.css";

const steps = ["Laptop details", "KYC verification", "Inspection", "Valuation", "Purchase"];
const stepKeys = ["details", "kyc", "inspection", "valuation", "purchase"];
const componentChecks = [
  ["physical_condition", "Body and hinges"],
  ["screen_condition", "Display"],
  ["keyboard_condition", "Keyboard and trackpad"],
  ["battery_condition", "Battery"],
  ["charger_condition", "Charger"],
  ["camera_condition", "Camera"],
  ["speaker_condition", "Speakers"],
  ["ports_condition", "Ports and connectivity"],
];
const conditions = [
  ["excellent", "Excellent"],
  ["good", "Good"],
  ["average", "Fair / average"],
  ["needs_repair", "Needs repair"],
];
const inspectionConditions = ["excellent", "good", "fair", "poor"];
const conditionScores = { excellent: 4, good: 3, fair: 2, poor: 1 };

const freshLaptop = () => ({
  brand: "", model: "", processor: "", ram: "", storage: "",
  operatingSystem: "", purchaseYear: "", originalPrice: "",
  expectedPrice: "", condition: "", reason: "",
});
const freshInspection = () => ({
  physical_condition: "", screen_condition: "", keyboard_condition: "",
  battery_condition: "", charger_condition: "", camera_condition: "",
  speaker_condition: "", ports_condition: "", overall_condition: "",
  processor_verified: null, ram_verified: null, storage_verified: null, remarks: "",
});

function calculateOverallCondition(details) {
  const values = componentChecks.map(([field]) => details[field]);
  if (values.some((value) => !conditionScores[value])) return "";
  const score = values.reduce((sum, value) => sum + conditionScores[value], 0) / values.length;
  return score >= 3.6 ? "excellent" : score >= 2.7 ? "good" : score >= 1.8 ? "fair" : "poor";
}

function getErrorMessage(error) {
  const data = error.response?.data;
  if (data?.message || data?.detail) return data.message || data.detail;
  if (data && typeof data === "object") {
    return Object.entries(data)
      .map(([field, messages]) => `${field.replaceAll("_", " ")}: ${[].concat(messages).join(" ")}`)
      .join(" ");
  }
  return "We couldn't reach Laptopify right now. Please try again shortly.";
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function laptopFormFromRequest(item) {
  return {
    brand: item.brand || "", model: item.model || "", processor: item.processor || "",
    ram: item.ram || "", storage: item.storage || "", operatingSystem: item.operating_system || "",
    purchaseYear: item.purchase_year || "", originalPrice: item.original_purchase_price || "",
    expectedPrice: item.expected_price || "", condition: item.condition || "", reason: item.reason_for_selling || "",
  };
}

function sameLaptopDetails(saved, form) {
  const normalizedSaved = laptopFormFromRequest(saved);
  const numericFields = new Set(["purchaseYear", "originalPrice", "expectedPrice"]);
  return Object.keys(form).every((key) => numericFields.has(key)
    ? Number(normalizedSaved[key]) === Number(form[key])
    : String(normalizedSaved[key]).trim() === String(form[key]).trim());
}

function stepFromWorkflow(workflow) {
  if (workflow.purchase || (workflow.offer_decision && workflow.offer_decision !== "pending")) return 5;
  if (workflow.valuation) return 4;
  if (workflow.inspection) return 4;
  if (workflow.kyc?.status === "verified") return 3;
  if (workflow.laptop_request) return 2;
  return 1;
}

function maxReachableStep(workflow) {
  if (!workflow?.laptop_request) return 1;
  if (workflow.offer_decision && workflow.offer_decision !== "pending") return 5;
  if (workflow.valuation) return 5;
  if (workflow.inspection) return 4;
  if (workflow.kyc?.status === "verified") return 3;
  return 2;
}

function SellLaptop() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [laptop, setLaptop] = useState(freshLaptop);
  const [inspection, setInspection] = useState(freshInspection);
  const [workflow, setWorkflow] = useState(null);
  const [kyc, setKyc] = useState({ fullName: "", address: "", identity: null, addressProof: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const requestId = localStorage.getItem("laptop_request_id");
  const currentStatus = useMemo(() => workflow?.laptop_request?.status || "draft", [workflow]);
  const furthestStep = maxReachableStep(workflow);

  useEffect(() => {
    if (!requestId || !localStorage.getItem("access_token")) return;
    api.get(`/api/laptop-requests/${requestId}/workflow/`, { requiresAuth: true })
      .then(({ data }) => {
        setWorkflow(data);
        setLaptop(laptopFormFromRequest(data.laptop_request));
        if (data.kyc) {
          setKyc((previous) => ({ ...previous, fullName: data.kyc.full_name || "", address: data.kyc.address || "" }));
        }
        if (data.inspection) setInspection((previous) => ({ ...previous, ...data.inspection }));
        setStep(stepFromWorkflow(data));
        setSearchParams({ step: stepKeys[stepFromWorkflow(data) - 1] }, { replace: true });
      })
      .catch((requestError) => {
        if (requestError.response?.status === 404) {
          localStorage.removeItem("laptop_request_id");
        }
        setError(getErrorMessage(requestError));
      });
  // Load a seller's in-progress request once when the page opens.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [step]);

  const moveTo = (nextStep) => {
    if (nextStep < 1 || nextStep > 5) return;
    setError("");
    setNotice("");
    setStep(nextStep);
    setSearchParams({ step: stepKeys[nextStep - 1] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateLaptop = (event) => {
    setLaptop((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setError("");
  };

  const submitLaptop = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = {
        brand: laptop.brand,
        model: laptop.model,
        processor: laptop.processor,
        ram: laptop.ram,
        storage: laptop.storage,
        operating_system: laptop.operatingSystem,
        purchase_year: Number(laptop.purchaseYear),
        original_purchase_price: Number(laptop.originalPrice),
        expected_price: Number(laptop.expectedPrice),
        condition: laptop.condition,
        reason_for_selling: laptop.reason,
      };
      const existingRequest = workflow?.laptop_request;
      const changedDetails = existingRequest && !sameLaptopDetails(existingRequest, laptop);
      const { data } = existingRequest
        ? await api.patch(`/api/laptop-requests/${existingRequest.id}/`, payload, { requiresAuth: true })
        : await api.post("/api/laptop-requests/", payload, { requiresAuth: true });
      localStorage.setItem("laptop_request_id", data.id);
      const nextWorkflow = {
        ...(workflow || {}),
        laptop_request: data,
        kyc: workflow?.kyc || null,
        inspection: changedDetails ? null : workflow?.inspection || null,
        valuation: changedDetails ? null : workflow?.valuation || null,
      };
      setWorkflow(nextWorkflow);
      moveTo(2);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const submitKyc = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("laptop_request_id")) {
      setError("Save your laptop details before completing KYC.");
      return;
    }
    if (!kyc.identity || !kyc.addressProof) {
      setError("Upload both your identity and address proof to continue.");
      return;
    }
    setLoading(true);
    setError("");
    const payload = new FormData();
    payload.append("laptop_request_id", localStorage.getItem("laptop_request_id"));
    payload.append("full_name", kyc.fullName.trim());
    payload.append("address", kyc.address.trim());
    payload.append("identity_proof", kyc.identity);
    payload.append("address_proof", kyc.addressProof);
    try {
      const { data } = await api.post("/api/kyc/submit/", payload, {
        requiresAuth: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setWorkflow((previous) => ({
        ...previous,
        kyc: { status: data.status, full_name: kyc.fullName.trim(), address: kyc.address.trim() },
        laptop_request: { ...previous.laptop_request, status: data.request_status },
      }));
      setNotice("Your identity documents are securely submitted. Laptopify will review them before inspection.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const checkKycStatus = async () => {
    const id = localStorage.getItem("laptop_request_id");
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/api/laptop-requests/${id}/workflow/`, { requiresAuth: true });
      setWorkflow(data);
      if (data.kyc?.status === "verified") {
        setNotice("Your KYC is verified. You can continue to the inspection checklist.");
        moveTo(3);
      } else {
        setNotice("Your KYC is still under review. You can continue once Laptopify verifies your documents.");
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const submitInspection = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(
        `/api/inspections/${localStorage.getItem("laptop_request_id")}/`,
        { ...inspection, overall_condition: calculateOverallCondition(inspection) },
        { requiresAuth: true },
      );
      setWorkflow((previous) => ({
        ...previous,
        inspection: { status: data.inspection.inspection_status, overall_condition: data.inspection.overall_condition },
        valuation: data.valuation,
        laptop_request: { ...previous.laptop_request, status: data.request_status },
      }));
      moveTo(4);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const acceptOffer = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(
        `/api/purchases/${localStorage.getItem("laptop_request_id")}/accept/`,
        {},
        { requiresAuth: true },
      );
      setWorkflow((previous) => ({
        ...previous,
        purchase: data,
        offer_decision: "accepted",
        laptop_request: { ...previous.laptop_request, status: data.status },
      }));
      moveTo(5);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const rejectOffer = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(
        `/api/purchases/${localStorage.getItem("laptop_request_id")}/reject/`,
        {},
        { requiresAuth: true },
      );
      setWorkflow((previous) => ({
        ...previous,
        offer_decision: data.decision,
        laptop_request: { ...previous.laptop_request, status: data.status },
      }));
      setNotice(data.message);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const updateInspection = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked
      : name.endsWith("_verified") ? (value === "" ? null : value === "true")
        : value;
    setInspection((previous) => {
      const next = { ...previous, [name]: nextValue };
      next.overall_condition = calculateOverallCondition(next);
      return next;
    });
  };

  const estimate = workflow?.valuation?.estimated_value;
  const offerAmount = workflow?.purchase?.amount || estimate;

  return (
    <main className="sell-page">
      <section className="sell-intro">
        <div className="sell-intro-content">
          <div className="sell-label"><span /> LAPTOPIFY BUYBACK</div>
          <h1>Sell your laptop.<br /><strong>Know every next step.</strong></h1>
          <p>Share your device details, verify your identity, complete a guided condition check, review a provisional estimate and accept a buyback request with Laptopify.</p>
        </div>
        <div className="sell-trust-points" aria-label="Laptopify process benefits">
          <span>Secure KYC</span><span>Clear condition review</span><span>No-obligation estimate</span>
        </div>
      </section>

      <section className="sell-progress" aria-label="Laptopify buyback steps">
        {steps.map((label, index) => {
          const itemStep = index + 1;
          const isComplete = itemStep < step;
          const isActive = itemStep === step;
          return (
            <button type="button" className={`progress-item ${isActive ? "active" : ""} ${isComplete ? "complete" : ""}`} key={label} aria-current={isActive ? "step" : undefined} disabled={itemStep > furthestStep || loading} onClick={() => moveTo(itemStep)}>
              <span>{String(itemStep).padStart(2, "0")}</span>
              <div><strong>{label}</strong><small>{["Device information", "Identity and address", "Condition checklist", "Estimated buyback", "Offer acceptance"][index]}</small></div>
            </button>
          );
        })}
      </section>

      <div className="sell-container">
        <section className="workflow-panel" key={step} data-reveal>
          <div className="workflow-panel-head">
            <div>
              <span className="workflow-eyebrow">SELL YOUR LAPTOP · STEP {String(step).padStart(2, "0")}</span>
              <h2>{[
                "Tell us about your laptop",
                "Verify your seller details",
                "Check your laptop condition",
                "Review your buyback estimate",
                "Your Laptopify buyback request",
              ][step - 1]}</h2>
              <p>{[
                "Accurate specifications help Laptopify assess your device fairly.",
                "We use your documents to connect this laptop request to the right seller.",
                "Your answers create a provisional estimate for Laptopify review.",
                "This estimate is based on the device details and condition you submitted.",
                "Your offer acceptance is recorded and the Laptopify team will coordinate next steps.",
              ][step - 1]}</p>
            </div>
            <div className="workflow-step-badge">{String(step).padStart(2, "0")}<small>OF 05</small></div>
          </div>

          {error && <div className="workflow-alert error" role="alert">{error}</div>}
          {notice && <div className="workflow-alert success" role="status">{notice}</div>}

          {step === 1 && (
            <form className="workflow-form" onSubmit={submitLaptop}>
              <div className="workflow-section-title"><span>01</span><div><h3>Device specifications</h3><p>Enter the details shown in your system settings or purchase documents.</p></div></div>
              <div className="workflow-grid">
                <label>Brand<select name="brand" value={laptop.brand} onChange={updateLaptop} required><option value="">Select brand</option>{["Acer", "Apple", "ASUS", "Dell", "HP", "Huawei", "Lenovo", "LG", "Microsoft", "MSI", "Samsung", "Xiaomi", "Other"].map((brand) => <option key={brand}>{brand}</option>)}</select></label>
                <label>Model<input name="model" value={laptop.model} onChange={updateLaptop} placeholder="For example, ThinkPad T14" maxLength={100} required /></label>
                <label>Processor<input name="processor" value={laptop.processor} onChange={updateLaptop} placeholder="Intel Core i5 / AMD Ryzen 5" maxLength={150} required /></label>
                <label>Memory (RAM)<select name="ram" value={laptop.ram} onChange={updateLaptop} required><option value="">Select memory</option>{["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"].map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Storage<select name="storage" value={laptop.storage} onChange={updateLaptop} required><option value="">Select storage</option>{["256 GB SSD", "512 GB SSD", "1 TB SSD", "1 TB HDD", "2 TB HDD"].map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Operating system<select name="operatingSystem" value={laptop.operatingSystem} onChange={updateLaptop} required><option value="">Select operating system</option>{["Windows 11", "Windows 10", "macOS", "Linux", "ChromeOS", "Other"].map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Purchase year<input type="number" name="purchaseYear" min="2000" max={new Date().getFullYear()} value={laptop.purchaseYear} onChange={updateLaptop} required /></label>
                <label>Original purchase price (₹)<input type="number" name="originalPrice" min="1" step="1" value={laptop.originalPrice} onChange={updateLaptop} placeholder="65000" required /></label>
                <label>Expected price (₹)<input type="number" name="expectedPrice" min="1" step="1" value={laptop.expectedPrice} onChange={updateLaptop} placeholder="30000" required /></label>
                <label>Overall condition<select name="condition" value={laptop.condition} onChange={updateLaptop} required><option value="">Choose condition</option>{conditions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              </div>
              <label className="workflow-full">Why are you selling this laptop?<textarea name="reason" value={laptop.reason} onChange={updateLaptop} maxLength={2000} rows="3" placeholder="Tell us what you are upgrading to or anything else we should know." required /></label>
              <WorkflowActions loading={loading} label="Save details and continue" />
            </form>
          )}

          {step === 2 && (workflow?.kyc && workflow.kyc.status !== "rejected" ? (
            <div className="workflow-form">
              <div className="workflow-section-title"><span>02</span><div><h3>KYC documents received</h3><p>Your identity and address documents are with Laptopify for review.</p></div></div>
              <div className="workflow-alert success" role="status">Verification status: {(workflow.kyc.status || "under_verification").replaceAll("_", " ")}</div>
              <div className="purchase-summary"><div><span>Seller name</span><strong>{workflow.kyc.full_name || kyc.fullName}</strong></div><div><span>Address</span><strong>{workflow.kyc.address || kyc.address}</strong></div></div>
              <WorkflowActions loading={loading} label={workflow.kyc.status === "verified" ? "Continue to inspection" : "Check verification status"} onNext={checkKycStatus} back={() => moveTo(1)} />
            </div>
          ) : (
            <form className="workflow-form" onSubmit={submitKyc}>
              <div className="workflow-section-title"><span>02</span><div><h3>Seller information</h3><p>These details are used only to review this Laptopify buyback request.</p></div></div>
              {workflow?.kyc?.status === "rejected" && <div className="workflow-alert error" role="alert">Your previous KYC submission needs an update. {workflow.kyc.admin_remarks || "Please review your details and upload clear identity and address documents again."}</div>}
              <div className="workflow-grid">
                <label className="workflow-full">Full legal name<input value={kyc.fullName} onChange={(event) => setKyc({ ...kyc, fullName: event.target.value })} autoComplete="name" maxLength={150} required /></label>
                <label className="workflow-full">Current address<textarea value={kyc.address} onChange={(event) => setKyc({ ...kyc, address: event.target.value })} autoComplete="street-address" rows="3" maxLength={2000} required /></label>
                <label>Identity proof<div className="file-field"><input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(event) => setKyc({ ...kyc, identity: event.target.files?.[0] || null })} required /><small>{kyc.identity?.name || "Aadhaar, PAN or driving licence · PDF/JPG/PNG"}</small></div></label>
                <label>Address proof<div className="file-field"><input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(event) => setKyc({ ...kyc, addressProof: event.target.files?.[0] || null })} required /><small>{kyc.addressProof?.name || "Address document · PDF/JPG/PNG"}</small></div></label>
              </div>
              <div className="privacy-note"><span>🔒</span><p>Identity documents are sent directly to Laptopify for verification. Your identity and address documents are not included in the public workflow status.</p></div>
              <WorkflowActions loading={loading} label="Submit KYC and continue" back={() => moveTo(1)} />
            </form>
          ))}

          {step === 3 && (
            <form className="workflow-form" onSubmit={submitInspection}>
              <div className="workflow-section-title"><span>03</span><div><h3>Device condition checklist</h3><p>Choose the condition that best describes each part. Laptopify will confirm it during the physical inspection.</p></div></div>
              <div className="inspection-grid">
                {componentChecks.map(([name, label]) => (
                  <label key={name}>{label}<select name={name} value={inspection[name]} onChange={updateInspection} required><option value="">Choose condition</option>{inspectionConditions.map((value) => <option key={value} value={value}>{value[0].toUpperCase() + value.slice(1)}</option>)}</select></label>
                ))}
              </div>
              <div className="inspection-condition-summary" role="status"><span>Calculated overall condition</span><strong>{inspection.overall_condition ? inspection.overall_condition[0].toUpperCase() + inspection.overall_condition.slice(1) : "Complete all condition checks"}</strong></div>
              <fieldset className="verification-checks"><legend>Confirm the specifications match your laptop</legend>
                {[["processor_verified", "Processor"], ["ram_verified", "RAM"], ["storage_verified", "Storage"]].map(([name, label]) => <label key={name}>{label} matches the details I entered<select name={name} value={inspection[name] === null ? "" : String(inspection[name])} onChange={updateInspection} required><option value="">Choose one</option><option value="true">Yes, it matches</option><option value="false">No / not confirmed</option></select></label>)}
              </fieldset>
              <label className="workflow-full">Notes for the Laptopify inspector<textarea name="remarks" value={inspection.remarks} onChange={updateInspection} maxLength={2000} rows="3" placeholder="Mention visible damage, battery issues or included accessories." /></label>
              <WorkflowActions loading={loading} label="Submit condition and calculate estimate" back={() => moveTo(2)} />
            </form>
          )}

          {step === 4 && (
            <div className="valuation-panel">
              <div className="valuation-result">
                <span>PROVISIONAL BUYBACK ESTIMATE</span>
                <strong>{estimate ? formatMoney(estimate) : "Pending"}</strong>
                <p>Estimated from purchase age, original price, configuration and the condition checklist you submitted.</p>
              </div>
              <div className="valuation-breakdown">
                <h3>Estimate summary</h3>
                <div><span>Device</span><strong>{workflow?.laptop_request?.brand} {workflow?.laptop_request?.model}</strong></div>
                <div><span>Purchase year</span><strong>{workflow?.laptop_request?.purchase_year}</strong></div>
                <div><span>Your condition report</span><strong>{workflow?.inspection?.overall_condition || "Submitted"}</strong></div>
                <div><span>Review status</span><strong className="status-pill">{workflow?.valuation?.status === "approved" ? "Laptopify approved" : "Awaiting Laptopify inspection"}</strong></div>
              </div>
              <div className="valuation-disclaimer">This is a provisional estimate based on the details you supplied. Laptopify confirms the final offer after physical inspection.</div>
              <WorkflowActions loading={loading} label="Continue to purchase offer" onNext={() => moveTo(5)} back={() => moveTo(3)} />
            </div>
          )}

          {step === 5 && workflow?.offer_decision === "accepted" && workflow?.purchase && (
            <div className="purchase-confirmation">
              <div className="confirmation-mark">✓</div>
              <span className="workflow-eyebrow">BUYBACK REQUEST RECEIVED</span>
              <h3>Thanks for accepting the Laptopify offer.</h3>
              <p>Your acceptance is recorded. Our team will contact you to arrange device collection, complete the physical inspection and confirm payment details.</p>
              <div className="purchase-summary">
                <div><span>Request reference</span><strong>LP-{String(workflow?.laptop_request?.id || localStorage.getItem("laptop_request_id")).padStart(6, "0")}</strong></div>
                <div><span>Provisional estimate</span><strong>{formatMoney(offerAmount)}</strong></div>
                <div><span>Buyback status</span><strong className="status-pill">{(workflow?.purchase?.status || currentStatus).replaceAll("_", " ")}</strong></div>
                <div><span>Payment status</span><strong>Pending physical inspection</strong></div>
              </div>
              <div className="workflow-alert success">No payment details are collected on this page. Laptopify will confirm the final amount and payment method with you directly.</div>
              <div className="workflow-actions"><Link to="/contact" className="workflow-button secondary">Contact Laptopify</Link><Link to="/" className="workflow-button">Back to Laptopify home <span>↗</span></Link></div>
            </div>
          )}

          {step === 5 && workflow?.offer_decision === "rejected" && (
            <div className="purchase-confirmation">
              <span className="workflow-eyebrow">OFFER DECLINED</span>
              <h3>You declined this buyback offer.</h3>
              <p>Request LP-{String(workflow?.laptop_request?.id).padStart(6, "0")} is marked as declined. No purchase or payment was created.</p>
              <div className="purchase-summary"><div><span>Device</span><strong>{workflow?.laptop_request?.brand} {workflow?.laptop_request?.model}</strong></div><div><span>Offer reviewed</span><strong>{formatMoney(estimate)}</strong></div><div><span>Status</span><strong className="status-pill">Declined</strong></div></div>
              <div className="workflow-actions"><Link to="/contact" className="workflow-button secondary">Contact Laptopify</Link><Link to="/" className="workflow-button">Back to Laptopify home <span>↗</span></Link></div>
            </div>
          )}

          {step === 5 && (!workflow?.offer_decision || workflow.offer_decision === "pending") && (
            <div className="purchase-confirmation offer-review">
              <span className="workflow-eyebrow">LAPTOPIFY BUYBACK OFFER</span>
              <h3>Review your offer</h3>
              <p>Review the details below, then choose whether to accept or decline this provisional offer.</p>
              <div className="valuation-result"><span>PROVISIONAL OFFER</span><strong>{formatMoney(offerAmount)}</strong><p>Final value is confirmed after Laptopify inspects the physical device.</p></div>
              <div className="purchase-summary">
                <div><span>Request reference</span><strong>LP-{String(workflow?.laptop_request?.id).padStart(6, "0")}</strong></div>
                <div><span>Device</span><strong>{workflow?.laptop_request?.brand} {workflow?.laptop_request?.model}</strong></div>
                <div><span>Reported condition</span><strong>{workflow?.inspection?.overall_condition || workflow?.laptop_request?.condition}</strong></div>
                <div><span>Offer status</span><strong className="status-pill">Awaiting your decision</strong></div>
              </div>
              <div className="workflow-actions">
                <button type="button" className="workflow-button secondary" onClick={() => moveTo(4)} disabled={loading}>Back to valuation</button>
                <button type="button" className="workflow-button secondary" onClick={rejectOffer} disabled={loading}>{loading ? "Saving..." : "Decline offer"}</button>
                <button type="button" className="workflow-button" onClick={acceptOffer} disabled={loading}>{loading ? "Saving..." : "Accept offer"}<span aria-hidden="true">→</span></button>
              </div>
            </div>
          )}
        </section>

        {step < 5 && (
          <aside className="sell-sidecard" data-reveal>
            <div className="sidecard-orbit" aria-hidden="true">L</div>
            <span className="workflow-eyebrow">YOUR BUYBACK REQUEST</span>
            <h3>{workflow?.laptop_request ? `${workflow.laptop_request.brand} ${workflow.laptop_request.model}` : "A clear path to a fair offer"}</h3>
            <p>{workflow?.laptop_request ? "Your progress is saved to your account. You can return to this request and continue the next step." : "Laptopify keeps every part of your laptop sale in one guided process."}</p>
            <div className="request-status"><small>CURRENT STATUS</small><strong>{currentStatus.replaceAll("_", " ")}</strong></div>
            <ul><li>Secure seller verification</li><li>Guided laptop condition report</li><li>Transparent provisional estimate</li><li>Team-coordinated collection and payment</li></ul>
            {workflow?.laptop_request && <small className="reference-caption">Request LP-{String(workflow.laptop_request.id).padStart(6, "0")}</small>}
          </aside>
        )}
      </div>

      
    </main>
  );
}

function WorkflowActions({ loading, label, back, onNext }) {
  return (
    <div className="workflow-actions">
      {back ? <button type="button" className="workflow-button secondary" onClick={back}>Back</button> : <span />}
      <button type={onNext ? "button" : "submit"} className="workflow-button" onClick={onNext} disabled={loading}>
        {loading ? "Saving securely..." : label}<span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default SellLaptop;
