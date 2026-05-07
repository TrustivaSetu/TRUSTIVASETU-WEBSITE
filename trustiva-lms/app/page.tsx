"use client";


import React, { useState } from "react";

export default function TrustivaLMS() {
  const [selectedMenu, setSelectedMenu] = useState("Create User");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCreateType, setActiveCreateType] = useState("Associate");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<any[]>([]);
const [userSearch, setUserSearch] = useState("");
const filteredUsers = users.filter((user) =>
  user.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
  user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
  user.phone.includes(userSearch)
);
  const createUserOptions = [
    "Associate",
    "Operations",
    "Hospital User",
    "Hospital",
    "Hospital Step Wise",
    "Business Dev",
    "Telemed Clinic",
    "Telemed Doctor",
    "Search People by Hospital",
  ];

  const sidebarItems = [
    "Create User",
    "Associate Targets",
    "Attendance",
    "All Leads",
    "Assign Enquiries",
    "Cases in Hand",
    "Create Lead",
    "Your Leads",
    "Your Enquiries",
    "Visits",
    "EMI Calculator",
  ];

  const filteredSidebar = sidebarItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    hospitals: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

const handleSubmit = () => {
  setError("");

  if (!form.fullName) return setError("Full name required");

  if (!isValidPhone.test(form.phone)) {
    return setError("Invalid Indian phone number");
  }

  if (!form.password) return setError("Password required");

  if (!isValidEmail.test(form.email)) {
    return setError("Only @trustivasetu.com email allowed");
  }

  const resetLink = `https://yourapp.com/reset-password?user=${form.email}`;

  const newUser = {
    ...form,
    email: form.email,
  };

  setUsers((prev) => [...prev, newUser]);

  console.log("📧 Email sent to:", form.email);
  console.log("📱 SMS sent to:", form.phone);
  console.log("🔑 Password:", form.password);
  console.log("🔗 Reset Link:", resetLink);

  setForm({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    hospitals: [],
  });

  setError("");
};

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">
      {/* Sidebar */}
      <aside className="w-[300px] bg-[#071827] border-r border-white/10 h-screen overflow-y-auto p-6">
        <h1 className="text-2xl font-bold text-lime-300 leading-tight">
          Trustiva Setu <br />
          Leads Portal
        </h1>

        <input
          type="text"
          placeholder="Search in menu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-6 p-2 rounded bg-white/10 text-white placeholder-gray-400"
        />

        <p className="text-sm text-gray-400 mt-2">
          Aarthsetu Technologies Pvt. Ltd.
        </p>

        <div className="mt-10 space-y-3">
          {filteredSidebar.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedMenu(item)}
              className={`block w-full text-left rounded-lg px-3 py-2 transition ${
                selectedMenu === item
                  ? "bg-lime-300 text-black font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      

      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedMenu === "Create User" ? (
          <>
            <h2 className="text-4xl font-bold mb-8">Create User</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side Options */}
              
              <div className="space-y-4">
                {error && <p className="text-red-400">{error}</p>}
                {createUserOptions.map((item, index) => (
  <div
    key={index}
    onClick={() => setActiveCreateType(item)}
    className={`bg-white/5 border rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer transition 
      ${
        activeCreateType === item
          ? "border-lime-300 bg-white/10"
          : "border-white/10 hover:border-lime-300"
      }`}
  >
    <span className="text-lg">{item}</span>
    <span className="text-xl text-lime-300">⌄</span>
  </div>
))}
              </div>

              {/* Right Side Blank Panel */}
              <div className="bg-white/5 border border-white/10 rounded-3xl min-h-[600px] p-6">
                {activeCreateType === "Associate" && (
  <div className="space-y-4">
    <h3 className="text-2xl font-semibold">Create Associate</h3>
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
  className="w-full p-3 bg-white/10 rounded"
/>

    <input
  type="text"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder="Phone Number"
  className="w-full p-3 bg-white/10 rounded"
/>

<input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Official Email (@trustivasetu.com)"
  className="w-full p-3 bg-white/10 rounded"
/>

    <div className="flex gap-2">
      <input
        value={form.password}
        readOnly
        className="w-full p-3 bg-white/10 rounded"
      />
      <button
        onClick={generatePassword}
        className="bg-lime-300 text-black px-4 rounded"
      >
        Generate
      </button>
    </div>

    <select
  multiple
  className="w-full p-3 bg-white/10 rounded"
  onChange={(e) => {
    setForm((prev) => ({
      ...prev,
      hospitals: Array.from(
        e.target.selectedOptions,
        (opt) => opt.value
      ),
    }));
  }}
>
  <option disabled>No hospitals available</option>
</select>

    <button
      onClick={handleSubmit}
      className="bg-lime-300 text-black px-6 py-3 rounded-lg font-semibold"
    >
      Create User
    </button>
    <div className="mt-6">
  <h4 className="text-lg font-semibold">Users</h4>

  {filteredUsers.map((user, index) => (
    <div
  key={index}
  className="bg-white/10 p-3 rounded mt-2 flex justify-between items-center"
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
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-8">All Leads</h2>

            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-5xl font-bold">0</h3>
                <p className="mt-3">ENQUIRIES</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-5xl font-bold">0</h3>
                <p className="mt-3">LEADS</p>
              </div>

              <div className="bg-white/10 border border-lime-300 rounded-3xl p-6">
                <h3 className="text-5xl font-bold">0</h3>
                <p className="mt-3">APPROVAL</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-5xl font-bold">0</h3>
                <p className="mt-3">DOs</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
