"use client";
import {
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";

import Select from "react-select";
import { useLmsSync } from "@/lib/useLmsSync";
import { LmsSyncBanner } from "@/components/LmsSyncBanner";
import { HospitalRegisterPanel } from "@/components/HospitalRegisterPanel";


export default function TrustivaLOS() {
    const router = useRouter();

  const [selectedMenu, setSelectedMenu] = useState("User Administration");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCreateType, setActiveCreateType] = useState("Relationship Associate");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [activeHospitalTab, setActiveHospitalTab] =
  useState("creation");

const [hospitalStepData, setHospitalStepData] =
  useState<any>({
    creation: {},
    onboarding: {},
    scheme: {},
    hrc: {},
  });
  const { syncToast, syncing, syncUser, syncHospital, syncEnquiry, syncCommercial } =
    useLmsSync();

  const [hospitals, setHospitals] = useState<string[]>([
  "Hospital1 - HYDERABAD",
  "Hospital2 - GK1",
]);

  const [schemeForm, setSchemeForm] = useState({
    hospitalName: "",
    schemeName: "",
  });

useEffect(() => {
  const user = localStorage.getItem("trustiva-user");
  if (!user) {
    router.push("/login");
    return;
  }
  const savedHospitals = localStorage.getItem("trustiva-hospitals");
  if (savedHospitals) {
    try {
      const parsed = JSON.parse(savedHospitals) as string[];
      if (parsed.length) setHospitals(parsed);
    } catch {
      /* ignore */
    }
  }
  const savedUsers = localStorage.getItem("trustiva-users");
  if (savedUsers) {
    try {
      setUsers(JSON.parse(savedUsers) as typeof users);
    } catch {
      /* ignore */
    }
  }
}, [router]);

const [userSearch, setUserSearch] = useState("");
const [selectedHospitalSearch, setSelectedHospitalSearch] =
  useState("");

const [filteredHospitalUsers, setFilteredHospitalUsers] =
  useState<any[]>([]);
  const [leadStep, setLeadStep] = useState(1);

  const [currentPincode, setCurrentPincode] =
  useState("");

const [currentCity, setCurrentCity] =
  useState("");

const [currentDistrict, setCurrentDistrict] =
  useState("");

const [currentState, setCurrentState] =
  useState("");

  const [permanentPincode, setPermanentPincode] =
  useState("");

const [permanentCity, setPermanentCity] =
  useState("");

const [permanentDistrict, setPermanentDistrict] =
  useState("");

const [permanentState, setPermanentState] =
  useState("");

const [permanentLocality, setPermanentLocality] =
  useState("");



const [officePincode, setOfficePincode] =
  useState("");

const [officeCity, setOfficeCity] =
  useState("");

const [officeDistrict, setOfficeDistrict] =
  useState("");

const [officeState, setOfficeState] =
  useState("");

const [officeLocality, setOfficeLocality] =
  useState("");

const [loadingPincode, setLoadingPincode] =
  useState(false);

const [showTreatmentModal, setShowTreatmentModal] =
  useState(false);

const [selectedTreatment, setSelectedTreatment] =
  useState("");

  const [showOtpModal, setShowOtpModal] =
  useState(false);

const [otpValue, setOtpValue] =
  useState("");

const [enquiryCreated, setEnquiryCreated] =
  useState(false);

const [leadForm, setLeadForm] = useState({
  enquiryType: "",
  mobileNumber: "",
  motherName: "",
  patientName: "",
  customerType: "",
  bedType: "",
  admissionDate: "",
  dischargeDate: "",
  consultationDate: "",
  email: "",
  hospitalName: "",
  treatmentName: "",
  medicalEstimate: "",
  financingRequired: "",
  callbackDate: "",
  remarks: "",
});

const isValidLeadMobile =
  /^[6-9]\d{9}$/.test(
    leadForm.mobileNumber
  );

const isValidLeadEmail =
  leadForm.email === "" ||
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    leadForm.email
  );

const todayDate = new Date()
  .toISOString()
  .split("T")[0];

  const currentYear =
  new Date().getFullYear();

const minimumBirthYear =
  currentYear - 100;

const maximumBirthYear =
  currentYear;

const isAdmissionValid =
  leadForm.admissionDate !== "";

const isDischargeValid =
  leadForm.dischargeDate === "" ||
  leadForm.dischargeDate >=
    leadForm.admissionDate;

const isCallbackValid =
  leadForm.callbackDate === "" ||
  leadForm.callbackDate >= todayDate;

const isLeadStep1Valid =
  leadForm.enquiryType &&
  isValidLeadMobile &&
  leadForm.motherName &&
  leadForm.patientName &&
  leadForm.customerType &&
  leadForm.bedType &&
  isAdmissionValid &&
  isDischargeValid &&
  isValidLeadEmail &&
  leadForm.hospitalName &&
  leadForm.treatmentName &&
  leadForm.financingRequired;

const treatmentCategories = [
  "General Medicine",
  "Gynaecology",
  "Urology",
  "Paediatrics",
  "Orthopaedics",
  "Ophthalmology",
  "Neurology",
  "Cardiology",
  "Pulmonology",
  "Proctology",
  "Dietetics",
  "Orthodontics",
  "Cosmetology",
  "Emergency Care",
  "Hepatology",
  "Gastroenterology",
];
const filteredUsers = users.filter((user) =>
  user.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
  user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
  user.phone.includes(userSearch)
);
  const createUserOptions = [
    "Relationship Associate",
    "Operations Desk",
    "Hospital Access",
    "Hospital",
    "Hospital Lifecycle",
    "Business Growth Team",
    "Hospital Team Directory",
  ];

  const sidebarItems = [
    "User Administration",
    "Associate Targets",
    "Attendance",
    "All Leads",
    "Lead Allocation",
    "Active Cases",
    "Create Lead",
    "My Leads",
    "My Enquiries",
    "Visits",
    "Finance Estimator",
  ];

  const sidebarSections = [
  {
    title: "OPERATIONS",
    items: [
      "Lender1 application",
      "Lender2 application",
      "Lender3 application",
      "Lender4 application",
      "Lender5 application",
      "User comments",
      "Enquiries",
      "Nach registrations",
    ],
  },
  {
    title: "CREDIT",
    items: [
      "Credit deviations",
      "Collections",
      "Nach registrations",
      "Tele collection",
    ],
  },
  {
    title: "FINANCE",
    items: [
      "Hospital payments",
      "Collections",
    ],
  },
];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    hospitals: [] as string[],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePassword = () => {
    const pass = crypto.randomUUID().slice(0, 8);
    setForm((prev) => ({ ...prev, password: pass }));
  };
  const handleDeleteUser = (indexToDelete: number) => {
  setUsers((prev) => prev.filter((_, index) => index !== indexToDelete));
};

  const isValidPhone = /^[6-9]\d{9}$/;
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@trustivasetu\.com$/;

const fetchPincodeDetails = async (
  pincode: string,
  type: "current" | "permanent" | "office"
) => {

  if (pincode.length !== 6) return;

  try {

    setLoadingPincode(true);

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const data = await response.json();

    if (
      data[0].Status === "Success"
    ) {

      const postOffice =
        data[0].PostOffice[0];

      const city =
        postOffice.Block ||
        postOffice.Name;

      const district =
        postOffice.District;

      const state =
        postOffice.State;

      const locality =
        postOffice.Name;

      // CURRENT
      if (type === "current") {

        setCurrentCity(city);

        setCurrentDistrict(district);

        setCurrentState(state);

      }

      // PERMANENT
      if (type === "permanent") {

        setPermanentCity(city);

        setPermanentDistrict(district);

        setPermanentState(state);

        

      }

      // OFFICE
      if (type === "office") {

        setOfficeCity(city);

        setOfficeDistrict(district);

        setOfficeState(state);

        

      }

    }

  } catch (error) {

    console.log(error);

  } finally {

    setLoadingPincode(false);

  }

};

const addHospitalLabel = (displayName: string) => {
  setHospitals((prev) => {
    if (prev.includes(displayName)) return prev;
    const next = [...prev, displayName];
    localStorage.setItem("trustiva-hospitals", JSON.stringify(next));
    return next;
  });
};

const handleSubmit = async () => {
  setError("");

  if (!form.fullName) return setError("Full name required");

  if (!isValidPhone.test(form.phone)) {
    return setError("Invalid Indian phone number");
  }

  if (!form.password) return setError("Password required");

  if (!isValidEmail.test(form.email)) {
    return setError("Only @trustivasetu.com email allowed");
  }

  try {
    await syncUser({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      password: form.password,
      role: activeCreateType,
      region: "South India",
      hospitals: form.hospitals,
    });

    const newUser = {
      ...form,
      email: form.email,
      role: activeCreateType,
    };

    setUsers((prev) => {
      const next = [...prev, newUser];
      localStorage.setItem("trustiva-users", JSON.stringify(next));
      return next;
    });

    setForm({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      hospitals: [],
    });

    setError("");
  } catch {
    /* error shown in sync banner */
  }
};

const handleFinalEnquirySubmit = async () => {
  try {
    await syncEnquiry(
      { ...leadForm, status: "PENDING" },
      {
        currentAddress: {
          city: currentCity,
          district: currentDistrict,
          state: currentState,
          pincode: currentPincode,
        },
        permanentAddress: {
          city: permanentCity,
          district: permanentDistrict,
          state: permanentState,
          pincode: permanentPincode,
          locality: permanentLocality,
        },
        officeAddress: {
          city: officeCity,
          district: officeDistrict,
          state: officeState,
          pincode: officePincode,
          locality: officeLocality,
        },
      }
    );
    setEnquiryCreated(true);
  } catch {
    /* banner */
  }
};

const handleSaveScheme = async () => {
  if (!schemeForm.hospitalName || !schemeForm.schemeName) {
    setError("Select hospital and scheme name");
    return;
  }
  try {
    await syncCommercial({
      hospitalName: schemeForm.hospitalName,
      commercials: { ...schemeForm },
    });
  } catch {
    /* banner */
  }
};

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">
      <LmsSyncBanner toast={syncToast} />
      {/* Sidebar */}
      <aside className="w-[250px] bg-[#071827] border-r border-white/10 h-screen overflow-y-auto p-4 text-[12px]">
        <h1 className="text-2xl font-bold text-lime-300 leading-tight">
          Trustiva LOS <br />
          Healthcare Partner Console
        </h1>

        <button
  onClick={() => {

    localStorage.removeItem(
      "trustiva-user"
    );

    router.push("/login");

  }}
  className="w-full bg-red-500 hover:bg-red-600 transition-all text-white py-2 rounded-xl mt-5 font-semibold"
>
  Logout
</button>

        <input
          type="text"
          placeholder="Search in menu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-6 p-2 rounded bg-white/10 text-white placeholder-gray-400"
        />

        

        <div className="mt-10 space-y-8">

  {/* MAIN MENU */}
  <div>
    <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wide">
      MAIN MENU
    </h3>

    <div className="space-y-2">
      {sidebarItems
        .filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedMenu(item)}
            className={`w-full flex items-center gapx-3 py-2 text-left px-3 py-2 rounded-xl transition-all ${
              selectedMenu === item
                ? "bg-lime-300 text-black font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span className="text-sm">📌</span>
            <span className="text-sm">{item}</span>
          </button>
        ))}
    </div>

    <div className="border-b border-white/10 mt-6"></div>
  </div>

  {/* EXTRA SECTIONS */}
  {sidebarSections.map((section, sectionIndex) => {
    const filteredItems = section.items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems.length === 0) return null;

    return (
      <div key={sectionIndex}>
        <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wide">
          {section.title}
        </h3>

        <div className="space-y-2">
          {filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMenu(item)}
              className={`w-full flex items-center gapx-3 py-2 text-left px-3 py-2 rounded-xl transition-all ${
                selectedMenu === item
                  ? "bg-lime-300 text-black font-semibold"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="text-sm">⚙️</span>
              <span className="text-sm">{item}</span>
            </button>
          ))}
        </div>

        <div className="border-b border-white/10 mt-6"></div>
      </div>
    );
  })}

</div>
      </aside>

      

      {/* Main Content */}
      <main className="flex-1 p-5 text-[12px]">
        {selectedMenu === "Create Lead" ? (

<div className="space-y-6">

  {/* HEADER */}
  <div className="flex items-center justify-between">

    <h2 className="text-[24px] font-semibold tracking-wide">
      Patient Enquiry Registration
    </h2>

    <div className="flex items-center gap-2">

      {[1,2,3,4].map((step) => (

        <div
          key={step}
          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-semibold ${
            leadStep === step
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          {step}
        </div>

      ))}

    </div>

  </div>

<div className="flex gap-3">

  {leadStep > 1 && (
    <button
      onClick={() =>
        setLeadStep((prev) => prev - 1)
      }
      className="bg-white/10 px-5 py-2 rounded-lg"
    >
      ← Previous Step
    </button>
  )}

  {leadStep < 7 && (
    <button
      onClick={() =>
        setLeadStep((prev) => prev + 1)
      }
      className="bg-blue-500 px-5 py-2 rounded-lg"
    >
      Next Step →
    </button>
  )}

</div>

{enquiryCreated && (

  <div className="bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-semibold">

    Enquiry Successfully Created

  </div>

)}

  {/* STEP 1 */}
  {leadStep === 1 && (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

      {/* ENQUIRY TYPE */}
      <div>

        <label className="text-sm text-gray-300">
          Enquiry Category *
        </label>

        <select
          value={leadForm.enquiryType}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              enquiryType: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-white/10 rounded mt-2"
        >
          <option value="">
            Select enquiry category
          </option>

          <option value="Cosmetology">
  Cosmetology
</option>

<option value="Hair Transplant">
  Hair Transplant
</option>

<option value="Ophthalmology">
  Ophthalmology
</option>

<option value="Dental">
  Dental Care
</option>

<option value="Hearing Aids">
  Hearing Aids
</option>

<option value="Weight Loss">
  Weight Loss Management
</option>

<option value="IVF">
  IVF & Fertility
</option>

<option value="IPD">
  IPD Admission
</option>

<option value="OPD">
  OPD Consultation
</option>

        </select>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* MOBILE */}
        <div>

          <label className="text-sm text-gray-300">
            Mobile Number *
          </label>

          <input
            type="tel"
maxLength={10}
placeholder="Enter 10 digit mobile number"
            value={leadForm.mobileNumber}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                mobileNumber: e.target.value,
              })
            }
            className={`w-full px-3 py-2 rounded mt-2 bg-white/10 ${
  leadForm.mobileNumber &&
  !isValidLeadMobile
    ? "border border-red-500"
    : "border border-transparent"
}`}
          />

        </div>

        {/* MOTHER NAME */}
        <div>

          <label className="text-sm text-gray-300">
            Guardian / Mother's Name *
          </label>

          <input
            type="text"
            placeholder="Enter name"
            value={leadForm.motherName}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                motherName: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          />

        </div>

      </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* PATIENT NAME */}
  <div>

    <label className="text-sm text-gray-300">
      Patient Full Name *
    </label>

    <input
      type="text"
      placeholder="Enter patient full name"
      value={leadForm.patientName}
      onChange={(e) =>
        setLeadForm({
          ...leadForm,
          patientName: e.target.value,
        })
      }
      className="w-full px-3 py-2 bg-white/10 rounded mt-2"
    />

  </div>

  {/* DOB */}
  <div>

    <label className="text-sm text-gray-300">
      Patient Date of Birth *
    </label>

    <input
      type="date"
      min={`${minimumBirthYear}-01-01`}
      max={`${maximumBirthYear}-12-31`}
      className="w-full px-3 py-2 bg-white/10 rounded mt-2"
    />

  </div>

</div>
      
      {/* CUSTOMER + BED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="text-sm text-gray-300">
            Payment Category *
          </label>

          <select
            value={leadForm.customerType}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                customerType: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          >
            <option value="">
              Select payment category
            </option>

            <option value="Cash">
  Self-Paid / Cash
</option>

<option value="Insurance">
  Insurance / TPA
</option>

          </select>

        </div>

        <div>

          <label className="text-sm text-gray-300">
            Bed Category *
          </label>

          <select
            value={leadForm.bedType}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                bedType: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          >
            <option value="">
              Select bed category
            </option>

            <option value="Not Applicable">
  Not Applicable
</option>

<option value="General Ward">
  General Ward
</option>

<option value="Private Ward">
  Private Ward
</option>

<option value="ICU">
  ICU
</option>

<option value="NICU">
  NICU
</option>

<option value="PICU">
  PICU
</option>

<option value="Emergency">
  Emergency
</option>

          </select>

        </div>

      </div>

      {/* DATES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="text-sm text-gray-300">
            Admission Date *
          </label>

          <input
            type="date"
            min={leadForm.admissionDate}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                admissionDate: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          />

        </div>

        <div>

          <label className="text-sm text-gray-300">
            Discharge Date *
          </label>

          <input
            type="date"
            value={leadForm.dischargeDate}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                dischargeDate: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          />

        </div>

      </div>

      {/* CONSULTATION */}
      <div>

        <label className="text-sm text-gray-300">
          Consultation Date
        </label>

        <input
          type="date"
          value={leadForm.consultationDate}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              consultationDate: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-white/10 rounded mt-2"
        />

      </div>

      {/* EMAIL */}
      <div>

        <label className="text-sm text-gray-300">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter email address"
          value={leadForm.email}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              email: e.target.value,
            })
          }
          className={`w-full px-3 py-2 rounded mt-2 bg-white/10 ${
  leadForm.email &&
  !isValidLeadEmail
    ? "border border-red-500"
    : "border border-transparent"
}`}
        />

      </div>

      {/* HOSPITAL */}
      <div>

        <label className="text-sm text-gray-300">
          Healthcare Partner *
        </label>

        <select
          value={leadForm.hospitalName}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              hospitalName: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-white/10 rounded mt-2"
        >
          <option value="">
            Select healthcare partner
          </option>

          {hospitals.map((hospital, index) => (
            <option
              key={index}
              value={hospital}
              className="text-black"
            >
              {hospital}
            </option>
          ))}

        </select>

      </div>

      {/* TREATMENT */}
      <div>

        <label className="text-sm text-gray-300">
          Treatment Speciality
        </label>

        <button
          onClick={() =>
            setShowTreatmentModal(true)
          }
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg mt-2 font-semibold"
        >
          Select Treatment Speciality
        </button>

        {selectedTreatment && (
          <p className="mt-2 text-lime-300">
            Selected: {selectedTreatment}
          </p>
        )}

      </div>

      {/* MEDICAL ESTIMATE */}
      <div>

        <label className="text-sm text-gray-300">
          Estimated Medical Expense
        </label>

        <input
          type="number"
          placeholder="Enter estimate amount"
          value={leadForm.medicalEstimate}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              medicalEstimate: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-white/10 rounded mt-2"
        />

      </div>

      {/* FINANCING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="text-sm text-gray-300">
            Financing Requirement *
          </label>

          <select
            value={leadForm.financingRequired}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                financingRequired: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          >
            <option value="">
              Select option
            </option>

            <option value="Yes">
  Yes
</option>

<option value="No">
  No
</option>

          </select>

        </div>

        <div>

          <label className="text-sm text-gray-300">
            Preferred Callback Date
          </label>

          <input
            type="date"
            value={leadForm.callbackDate}
            onChange={(e) =>
              setLeadForm({
                ...leadForm,
                callbackDate: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-white/10 rounded mt-2"
          />

        </div>

      </div>

      {/* REMARKS */}
      <div>

        <label className="text-sm text-gray-300">
          Case Notes / Requirement Summary
        </label>

        <textarea
          rows={4}
          placeholder="Enter detailed notes"
          value={leadForm.remarks}
          onChange={(e) =>
            setLeadForm({
              ...leadForm,
              remarks: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-white/10 rounded mt-2"
        />

      </div>

      {/* BUTTON */}
<button
  disabled={!isLeadStep1Valid}
  onClick={() => {

    localStorage.setItem(
      "trustiva-lead",
      JSON.stringify(leadForm)
    );

    setEnquiryCreated(true);

    setShowOtpModal(true);

  }}
  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
    isLeadStep1Valid
      ? "bg-blue-500 text-white"
      : "bg-gray-600 text-gray-400 cursor-not-allowed"
  }`}
>
  Create Enquiry & Send OTP
</button>

    </div>

  )}

  
  {/* STEP 2 */}
{leadStep === 2 && (

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-8">

<h3 className="text-2xl font-semibold">
Address Information
</h3>

{/* CURRENT ADDRESS */}
<div className="border border-blue-500/30 rounded-2xl p-5 space-y-5">

<h4 className="text-lg font-semibold text-blue-400">
Current Address
</h4>

<textarea
rows={4}
placeholder="Enter Current Address"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

<div>

<label className="text-sm text-gray-300">
Pincode *
</label>

<input
type="text"
maxLength={6}
value={currentPincode}
onChange={(e) => {

const pin = e.target.value;

setCurrentPincode(pin);

fetchPincodeDetails(pin, "current");

}}
placeholder="Enter 6 digit pincode"
className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

{loadingPincode && (
<p className="text-blue-400 text-sm mt-2">
Fetching details...
</p>
)}

</div>

<div>

<label className="text-sm text-gray-300">
City
</label>

<input
type="text"
value={currentCity}
readOnly
className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

</div>

<div>

<label className="text-sm text-gray-300">
District
</label>

<input
type="text"
value={currentDistrict}
readOnly
className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

</div>

<div>

<label className="text-sm text-gray-300">
State
</label>

<input
type="text"
value={currentState}
readOnly
className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

</div>

</div>

</div>

{/* PERMANENT ADDRESS */}
<div className="border border-lime-300/30 rounded-2xl p-5 space-y-5">

  <h4 className="text-lg font-semibold text-lime-300">
    Permanent Address
  </h4>

  <textarea
    rows={4}
    placeholder="House No / Street / Area"
    className="w-full px-3 py-2 bg-white/10 rounded"
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>

      <label className="text-sm text-gray-300">
        Pincode *
      </label>

      <input
  type="text"
  maxLength={6}
  value={permanentPincode}
  onChange={(e) => {

    const pin = e.target.value;

    setPermanentPincode(pin);

    fetchPincodeDetails(
      pin,
      "permanent"
    );

  }}
  placeholder="Enter 6 digit pincode"
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        Area / Locality
      </label>

      <input
  type="text"
  value="Enter locality"
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        City
      </label>

      <input
  type="text"
  value={permanentCity}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        District
      </label>

      <input
  type="text"
  value={permanentDistrict}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        State
      </label>

      <input
  type="text"
  value={permanentState}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        Landmark
      </label>

      <input
        type="text"
        placeholder="Nearby landmark"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />

    </div>

  </div>

</div>

{/* OFFICE ADDRESS */}
<div className="border border-lime-300/30 rounded-2xl p-5 space-y-5">

  <h4 className="text-lg font-semibold text-lime-300">
    Office Address
  </h4>

  <textarea
    rows={4}
    placeholder="House No / Street / Area"
    className="w-full px-3 py-2 bg-white/10 rounded"
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>

      <label className="text-sm text-gray-300">
        Pincode *
      </label>

      <input
  type="text"
  maxLength={6}
  value={officePincode}
  onChange={(e) => {

    const pin = e.target.value;

    setOfficePincode(pin);

    fetchPincodeDetails(
      pin,
      "office"
    );

  }}
  placeholder="Enter 6 digit pincode"
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        Area / Locality
      </label>

      <input
  type="text"
  value="Enter locality"
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        City
      </label>

      <input
  type="text"
  value={officeCity}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        District
      </label>

      <input
  type="text"
  value={officeDistrict}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        State
      </label>

      <input
  type="text"
  value={officeState}
  readOnly
  className="w-full px-3 py-2 bg-white/10 rounded mt-2"
/>

    </div>

    <div>

      <label className="text-sm text-gray-300">
        Landmark
      </label>

      <input
        type="text"
        placeholder="Nearby landmark"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />

    </div>

  </div>

</div>
</div>

)}
{/* STEP 3 */}
{leadStep === 3 && (

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

<h3 className="text-2xl font-semibold">
Employment Information
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<input
type="email"
placeholder="Official Email Address"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<input
type="email"
placeholder="Personal Email Address"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<input
type="text"
placeholder="Company Name"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<select
className="w-full px-3 py-2 bg-white/10 rounded"
>
<option>Select Employment Type</option>
<option>Salaried</option>
<option>Self Employed</option>
</select>

<input
type="text"
placeholder="Designation"
className="w-full px-3 py-2 bg-white/10 rounded"
/>









</div>

<button
onClick={() => setLeadStep(4)}
className="w-full bg-blue-500 py-3 rounded-xl font-semibold"
>
Save Employment Details & Continue
</button>

</div>

)}

{/* STEP 4 */}
{leadStep === 4 && (

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

<h3 className="text-2xl font-semibold">
Co-Applicant Information
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<input
type="text"
placeholder="Co-Applicant Full Name"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<select
className="w-full px-3 py-2 bg-white/10 rounded"
>
<option>Select Relationship</option>
<option>Father</option>
<option>Mother</option>
<option>Brother</option>
<option>Sister</option>
<option>Spouse</option>
</select>

<input
type="text"
placeholder="Monthly Income"
className="w-full px-3 py-2 bg-white/10 rounded"
/>
<select
className="w-full px-3 py-2 bg-white/10 rounded"
>
<option>Select Employment Type</option>
<option>Salaried</option>
<option>Self Employed</option>
</select>

<textarea
rows={4}
placeholder="Current Address"
className="w-full px-3 py-2 bg-white/10 rounded"
/>

<textarea
rows={4}
placeholder="Permanent Address"
className="w-full px-3 py-2 bg-white/10 rounded"
/>





</div>

<button
type="button"
disabled={syncing}
onClick={handleFinalEnquirySubmit}
className="w-full bg-lime-300 text-black py-3 rounded-xl font-semibold disabled:opacity-50"
>
{syncing ? "Syncing to LOS…" : "Final Submit Application"}
</button>

</div>

)}

{showOtpModal && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

  <div className="bg-[#071827] w-[95%] max-w-md rounded-2xl p-6">

    <h3 className="text-2xl font-semibold mb-4 text-center">
      Mobile Verification
    </h3>

    <p className="text-sm text-gray-300 text-center mb-6">
      OTP has been sent to +91 {leadForm.mobileNumber}
    </p>

    <input
      type="text"
      maxLength={6}
      value={otpValue}
      onChange={(e) =>
        setOtpValue(e.target.value)
      }
      placeholder="Enter 6 digit OTP"
      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10"
    />

</div>

    <button
  type="button"
  onClick={async () => {
    if (otpValue === "123456") {
      try {
        await syncEnquiry({ ...leadForm, status: "PENDING" });
      } catch {
        /* banner */
      }
      setShowOtpModal(false);
      setLeadStep(2);
    }
  }}
  className="w-full bg-blue-500 mt-5 py-3 rounded-xl font-semibold"
>
Verify OTP
</button>
    <button
      onClick={() => {
        // Resend OTP logic here
      }}
      className="w-full bg-gray-500 mt-3 py-3 rounded-xl font-semibold"
    >
      Resend OTP
    </button>

  </div>



)}

  {/* TREATMENT MODAL */}
  {showTreatmentModal && (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#071827] w-[90%] max-w-5xl rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h3 className="text-2xl font-semibold">
            Select Treatment Speciality
          </h3>

          <button
            onClick={() =>
              setShowTreatmentModal(false)
            }
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {treatmentCategories.map((item, index) => (

            <div
              key={index}
              onClick={() => {
                setSelectedTreatment(item);

                setLeadForm({
                  ...leadForm,
                  treatmentName: item,
                });

                setShowTreatmentModal(false);
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 cursor-pointer text-center transition-all"
            >

              <div className="text-4xl mb-3">
                🏥
              </div>

              <p className="text-sm font-medium">
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )}

</div>

) : selectedMenu === "User Administration" ?  (
          <>
            <h2 className="text-[24px] font-semibold mb-5 tracking-wide">Create User</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side Options */}
              
              <div className="space-y-4">
                {error && <p className="text-red-400">{error}</p>}
                {createUserOptions.map((item, index) => (
  <div
    key={index}
    onClick={() => setActiveCreateType(item)}
    className={`bg-white/5 border rounded-xl px-4 py-2 flex items-center justify-between cursor-pointer transition 
      ${
        activeCreateType === item
          ? "border-lime-300 bg-white/10"
          : "border-white/10 hover:border-lime-300"
      }`}
  >
    <span className="text-[13px] font-medium tracking-wide">{item}</span>
    <span className="text-xl text-lime-300">⌄</span>
  </div>
))}
              </div>

              {/* Right Side Blank Panel */}
              <div className="bg-white/5 border border-white/10 rounded-3xl min-h-[600px] p-6">
                {activeCreateType === "Relationship Associate" && (
  <div className="space-y-4">
    <h3 className="text-2xl font-semibold">Create Relationship Associate</h3>
    <input
  type="text"
  placeholder="Search users..."
  value={userSearch}
  onChange={(e) => setUserSearch(e.target.value)}
  className="w-full p-2 bg-white/10 rounded text-white"
/>

<label className="text-sm text-gray-400">Full Name *</label>

    <input
    type="text"
  name="fullName"
  value={form.fullName}
  onChange={handleChange}
  placeholder="Full Name"
  className="w-full px-3 py-2 bg-white/10 rounded"
/>

    <input
  type="text"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder="Phone Number"
  className="w-full px-3 py-2 bg-white/10 rounded"
/>

<input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Official Email (@trustivasetu.com)"
  className="w-full px-3 py-2 bg-white/10 rounded"
/>

    <div className="flex gap-2">
      <input
      type="text"
        value={form.password}
        readOnly
        className="w-full px-3 py-2 bg-white/10 rounded"
      />
      <button
        onClick={generatePassword}
        className="bg-lime-300 text-black px-4 rounded"
      >
        Generate
      </button>
    </div>

    <div className="space-y-2">
  <label className="text-sm text-gray-400">
    Hospital Name *
  </label>

  <select
    className="w-full px-3 py-2 bg-white/10 rounded text-white"
    onChange={(e) => {
      setForm((prev) => ({
        ...prev,
        hospitals: [e.target.value],
      }));
    }}
  >
    <option value="">
      Select Hospital
    </option>

    {hospitals.map((hospital, index) => (
      <option
        key={index}
        value={hospital}
        className="text-black"
      >
        {hospital}
      </option>
    ))}
  </select>
</div>

    <button
      onClick={handleSubmit}
      disabled={syncing}
      className="bg-lime-300 text-black px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
    >
      {syncing ? "Syncing…" : "Create User"}
    </button>
    <div className="mt-6">
  <h4 className="text-lg font-semibold">Users</h4>

  {filteredUsers.map((user, index) => (
    <div
  key={index}
  className="bg-white/10 px-3 py-2 rounded mt-2 flex justify-between items-center"
>
  <div>
    <p>{user.fullName}</p>
    <p className="text-sm text-gray-400">{user.email}</p>
    <p className="text-sm">{user.phone}</p>
  </div>
  

  <button
    onClick={() => handleDeleteUser(index)}
    className="bg-red-500 px-3 py-1 rounded text-sm"
  >
    Delete
  </button>
</div>
  ))}
</div>
  </div>
)}

{activeCreateType === "Operations Desk" && (
  <div className="space-y-4">

    <h3 className="text-2xl font-semibold">
      Create Operations Executive
    </h3>

    <input
      type="text"
      placeholder="Full Name"
      value={form.fullName}
      onChange={handleChange}
      name="fullName"
      className="w-full px-3 py-2 bg-white/10 rounded"
    />

    <input
      type="text"
      placeholder="Phone Number"
      value={form.phone}
      onChange={handleChange}
      name="phone"
      className="w-full px-3 py-2 bg-white/10 rounded"
    />

    <input
      type="email"
      placeholder="Official Email"
      value={form.email}
      onChange={handleChange}
      name="email"
      className="w-full px-3 py-2 bg-white/10 rounded"
    />

    <div className="flex gap-2">
      <input
      type="text"
        value={form.password}
        readOnly
        className="w-full px-3 py-2 bg-white/10 rounded"
      />

      <button
        onClick={generatePassword}
        className="bg-lime-300 text-black px-4 rounded"
      >
        Generate
      </button>
    </div>

    <div className="space-y-2">
      <label className="text-sm text-gray-400">
        Assign Hospital
      </label>

      <select
        className="w-full px-3 py-2 bg-white/10 rounded text-white"
        onChange={(e) => {
          setForm((prev) => ({
            ...prev,
            hospitals: [e.target.value],
          }));
        }}
      >
        <option value="">
          Select Hospital
        </option>

        {hospitals.map((hospital, index) => (
          <option
            key={index}
            value={hospital}
            className="text-black"
          >
            {hospital}
          </option>
        ))}
      </select>
    </div>

    <div className="flex gap-6 pt-2">
      <label className="flex items-center gap-2">
        <input type="radio" name="status" />
        Active
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name="status" />
        Inactive
      </label>
    </div>

    <button
      onClick={handleSubmit}
      className="w-full bg-lime-300 text-black px-6 py-2 rounded-lg font-semibold"
    >
      Create Operation User
    </button>

  </div>
)}

{activeCreateType === "Business Growth Team" && (
  <div className="space-y-4">

    <h3 className="text-2xl font-semibold">
      Create Business Growth Executive
    </h3>

    {/* Full Name */}
    <div>
      <label className="text-sm text-gray-400">
        Full Name *
      </label>

      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Enter full name"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="text-sm text-gray-400">
        Phone Number *
      </label>

      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Email */}
    <div>
      <label className="text-sm text-gray-400">
        Official Email *
      </label>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="name@trustivasetu.com"
        className={`w-full px-3 py-2 rounded mt-2 bg-white/10 ${
  leadForm.email &&
  !isValidLeadEmail
    ? "border border-red-500"
    : "border border-transparent"
}`}
      />
    </div>

    {/* Password */}
    <div>
      <label className="text-sm text-gray-400">
        Password *
      </label>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={form.password}
          readOnly
          className="w-full px-3 py-2 bg-white/10 rounded"
        />

        <button
          onClick={generatePassword}
          className="bg-lime-300 text-black px-4 rounded font-semibold"
        >
          Auto Generate
        </button>
      </div>
    </div>

    {/* Region */}
    <div>
      <label className="text-sm text-gray-400">
        Assigned Region *
      </label>

      <select className="w-full px-3 py-2 bg-white/10 rounded text-white mt-2">
        <option value="">
          Select Region
        </option>

        <option className="text-black">
          North India
        </option>

        <option className="text-black">
          South India
        </option>

        <option className="text-black">
          East India
        </option>

        <option className="text-black">
          West India
        </option>

        <option className="text-black">
          Central India
        </option>
      </select>
    </div>

    {/* Reporting Manager */}
    <div>
      <label className="text-sm text-gray-400">
        Reporting Manager
      </label>

      <select className="w-full px-3 py-2 bg-white/10 rounded text-white mt-2">
        <option value="">
          Select Manager
        </option>

        {users.map((user, index) => (
          <option
            key={index}
            className="text-black"
          >
            {user.fullName}
          </option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div className="flex gap-6 pt-2">

      <label className="flex items-center gap-2">
        <input type="radio" name="bdStatus" />
        Active
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name="bdStatus" />
        Inactive
      </label>

    </div>

    {/* Submit */}
    <button
      onClick={handleSubmit}
      className="w-full bg-lime-300 text-black px-6 py-2 rounded-lg font-semibold"
    >
      Create BD User
    </button>

  </div>
)}

{activeCreateType === "Hospital Access" && (
  <div className="space-y-4">

    <h3 className="text-2xl font-semibold">
      Register Healthcare Partner Access User
    </h3>

    {/* Full Name */}
    <div>
      <label className="text-sm text-gray-400">
        Full Name *
      </label>

      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="text-sm text-gray-400">
        Phone no *
      </label>

      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Email */}
    <div>
      <label className="text-sm text-gray-400">
        Email *
      </label>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Official Email"
        className={`w-full px-3 py-2 rounded mt-2 bg-white/10 ${
  leadForm.email &&
  !isValidLeadEmail
    ? "border border-red-500"
    : "border border-transparent"
}`}
      />
    </div>

    {/* Password */}
    <div>
      <label className="text-sm text-gray-400">
        Password *
      </label>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={form.password}
          readOnly
          className="w-full px-3 py-2 bg-white/10 rounded"
        />

        <button
          onClick={generatePassword}
          className="bg-lime-300 text-black px-4 rounded"
        >
          Generate Password
        </button>
      </div>
    </div>

    {/* Hospital */}
    <div>
      <label className="text-sm text-gray-400">
        Hospital Name *
      </label>

      <select
        className="w-full px-3 py-2 bg-white/10 rounded text-white mt-2"
        onChange={(e) => {
          setForm((prev) => ({
            ...prev,
            hospitals: [e.target.value],
          }));
        }}
      >
        <option value="">
          Select Hospital
        </option>

        {hospitals.map((hospital, index) => (
          <option
            key={index}
            value={hospital}
            className="text-black"
          >
            {hospital}
          </option>
        ))}
      </select>
    </div>

    {/* Department */}
    <div>
      <label className="text-sm text-gray-400">
        Person Department *
      </label>

      <select className="w-full px-3 py-2 bg-white/10 rounded text-white mt-2">
        <option>Select Department</option>
        <option>Finance</option>
        <option>Operations</option>
        <option>Front Desk</option>
        <option>Management</option>
      </select>
    </div>

    {/* Viewing Purpose */}
    <div>
      <label className="text-sm text-gray-400">
        Hospital enabled communication
        (only for viewing purpose)
      </label>

      <textarea
        rows={5}
        placeholder="Final Notes"
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Communication */}
    <div>
      <label className="text-sm text-gray-400">
        Communication *
      </label>

      <textarea
        rows={5}
        className="w-full px-3 py-2 bg-white/10 rounded mt-2"
      />
    </div>

    {/* Send Communication */}
    <div className="flex items-center gap-2">
      <input type="checkbox" />
      <span>Send communication</span>
    </div>

    {/* Status */}
    <div className="flex gap-6 pt-2">
      <label className="flex items-center gap-2">
        <input type="radio" name="status" />
        Active
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name="status" />
        Inactive
      </label>
    </div>

    {/* Button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-lime-300 text-black px-6 py-2 rounded-lg font-semibold"
    >
      Register Healthcare Partner Access User
    </button>

  </div>
)}

{activeCreateType === "Hospital" && (
  <HospitalRegisterPanel
    syncing={syncing}
    onSync={syncHospital}
    onRegistered={addHospitalLabel}
  />
)}

{activeCreateType === "Hospital Lifecycle" && (

  <div className="space-y-8 overflow-y-auto max-h-[85vh] pr-2">

    <h3 className="text-3xl font-bold">
      Hospital Step Wise
    </h3>

    <div className="flex flex-wrap gapx-3 py-2">

      <button
        onClick={() =>
          setActiveHospitalTab("creation")
        }
        className={`px-5 py-2 rounded-lg ${
          activeHospitalTab === "creation"
            ? "bg-lime-300 text-black"
            : "bg-white/10"
        }`}
      >
        1. Creation stage
      </button>

      <button
        onClick={() =>
          setActiveHospitalTab("onboarding")
        }
        className={`px-5 py-2 rounded-lg ${
          activeHospitalTab === "onboarding"
            ? "bg-lime-300 text-black"
            : "bg-white/10"
        }`}
      >
        2. Onboarding stage
      </button>

      <button
        onClick={() =>
          setActiveHospitalTab("scheme")
        }
        className={`px-5 py-2 rounded-lg ${
          activeHospitalTab === "scheme"
            ? "bg-lime-300 text-black"
            : "bg-white/10"
        }`}
      >
        3. Add Scheme
      </button>

      <button
        onClick={() =>
          setActiveHospitalTab("hrc")
        }
        className={`px-5 py-2 rounded-lg ${
          activeHospitalTab === "hrc"
            ? "bg-lime-300 text-black"
            : "bg-white/10"
        }`}
      >
        4. HRC Data
            </button>

    </div>

    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">

      {activeHospitalTab === "creation" && (
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Creation Stage
          </h4>

          <input
            type="text"
            placeholder="Full Name"
            data-hospital-creation-name
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            data-hospital-creation-phone
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            data-hospital-creation-email
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <button
            type="button"
            disabled={syncing}
            onClick={async () => {
              const fullName = (
                document.querySelector<HTMLInputElement>(
                  "[data-hospital-creation-name]"
                )?.value || "New Hospital - HYDERABAD"
              ).trim();
              const phone =
                document.querySelector<HTMLInputElement>(
                  "[data-hospital-creation-phone]"
                )?.value || "9999999999";
              const email =
                document.querySelector<HTMLInputElement>(
                  "[data-hospital-creation-email]"
                )?.value || "";
              try {
                await syncHospital({ fullName, phone, email, city: "HYDERABAD" });
                addHospitalLabel(fullName);
              } catch {
                /* banner */
              }
            }}
            className="bg-lime-300 text-black px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Submit to LOS"}
          </button>
        </div>
      )}

      {activeHospitalTab === "onboarding" && (
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Onboarding Stage
          </h4>

          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <input
            type="text"
            placeholder="PAN Number"
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <button
            type="button"
            className="bg-lime-300 text-black px-6 py-2 rounded-lg"
          >
            Save onboarding (local)
          </button>
        </div>
      )}

      {activeHospitalTab === "scheme" && (
        <div>
          <h4 className="text-xl font-semibold mb-4">
            Add Scheme (Commercials → LOS)
          </h4>

          <label className="text-sm text-gray-400">Hospital</label>
          <select
            value={schemeForm.hospitalName}
            onChange={(e) =>
              setSchemeForm((p) => ({ ...p, hospitalName: e.target.value }))
            }
            className="w-full px-3 py-2 rounded bg-white/10 mb-4 text-white"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h, i) => (
              <option key={i} value={h} className="text-black">
                {h}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Scheme Name"
            value={schemeForm.schemeName}
            onChange={(e) =>
              setSchemeForm((p) => ({ ...p, schemeName: e.target.value }))
            }
            className="w-full px-3 py-2 rounded bg-white/10 mb-4"
          />

          <button
            type="button"
            disabled={syncing}
            onClick={handleSaveScheme}
            className="bg-lime-300 text-black px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Save to LOS"}
          </button>
        </div>
      )}

      {activeHospitalTab === "hrc" && (
  <div>
    <h4 className="text-xl font-semibold mb-4">
      HRC Data
    </h4>

    <textarea
      placeholder="Final Notes"
      className="w-full px-3 py-2 rounded bg-white/10 mb-4 h-40"
    />

    <button className="bg-lime-300 text-black px-6 py-2 rounded-lg">
      Final Submit Hospital
    </button>
    
  </div>
                      )}

                    </div>

                  </div>
                )}

              </div>

            </div>

          



</>
        ) : null}

        <div className="bg-red-500 text-white p-3 text-center font-bold">
  THIS IS LOS DASHBOARD
</div>

      </main>

    </div>
  );
}