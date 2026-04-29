"use client";

import React, { useState } from "react";

export default function TrustivaLMS() {
  const [selectedMenu, setSelectedMenu] = useState("Create User");

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

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex">
      {/* Sidebar */}
      <aside className="w-[300px] bg-[#071827] border-r border-white/10 h-screen overflow-y-auto p-6">
        <h1 className="text-2xl font-bold text-lime-300 leading-tight">
          Trustiva Setu <br />
          Leads Portal
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Aarthsetu Technologies Pvt. Ltd.
        </p>

        <div className="mt-10 space-y-4">
          <p className="text-gray-400 text-sm font-semibold">USERS</p>

          <button
            onClick={() => setSelectedMenu("Create User")}
            className={`block w-full text-left rounded-lg px-3 py-2 transition ${
              selectedMenu === "Create User"
                ? "bg-lime-300 text-black font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Create User
          </button>

          <p className="px-3">Associate Targets</p>
          <p className="px-3">Attendance</p>

          <p className="text-gray-400 text-sm font-semibold mt-8">
            ASSOCIATES
          </p>
          <p className="px-3">All Leads</p>
          <p className="px-3">Assign Enquiries</p>
          <p className="px-3">Cases in Hand</p>
          <p className="px-3">Create Lead</p>
          <p className="px-3">Your Leads</p>
          <p className="px-3">Your Enquiries</p>
          <p className="px-3">Visits</p>
          <p className="px-3">EMI Calculator</p>
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
                {createUserOptions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between hover:border-lime-300 transition cursor-pointer"
                  >
                    <span className="text-lg">{item}</span>
                    <span className="text-xl text-lime-300">⌄</span>
                  </div>
                ))}
              </div>

              {/* Right Side Blank Panel */}
              <div className="bg-white/5 border border-white/10 rounded-3xl min-h-[600px] p-6">
                <p className="text-gray-400">
                  User creation details will appear here.
                </p>
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
