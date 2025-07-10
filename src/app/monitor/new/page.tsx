"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, ArrowLeft, AlertTriangle, Globe } from "lucide-react";

const addBackendUrl =
  process.env.NEXT_PUBLIC_ADD_URL || "http://localhost:3000/api/add/websites";

export default function New() {
  const { data: session } = useSession();
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const [keyword, setKeyword] = useState("");
  const [statusCode, setStatusCode] = useState<string>("");
  const [url, setUrl] = useState("");
  const [creatingMonitor, setCreatingMonitor] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  const UrlRegex = /^https?:\/\/[^\s]+$/;

  const monitoringConditions = [
    {
      value: "website goes down",
      label: "Website goes down",
      description: "Alert when website becomes unavailable",
    },
    {
      value: "keyword missing",
      label: "Url does not contain a keyword",
      description: "Alert when a keyword is missing from url",
    },
    {
      value: "keyword found",
      label: "Url contains a keyword",
      description: "Alert when url contains a keyword",
    },
    {
      value: "invalid code",
      label: "Url returns a status code other than",
      description: "Alert when an invalid status code is received",
    },
  ];

  const needsKeyword =
    selectedCondition === "keyword missing" ||
    selectedCondition === "keyword found";
  const needsStatusCode = selectedCondition === "invalid code";

  const handleCreateMonitor = async () => {
    if (!UrlRegex.test(url)) {
      setIsUrlValid(false);
      return;
    }
    setIsUrlValid(true);
    setCreatingMonitor(true);
    try {
      await axios.post(addBackendUrl, {
        email: session?.user?.email,
        url,
        alertOn: selectedCondition,
        keyword,
        expectedStatus: statusCode,
      });
      setCreatingMonitor(false);
      setShowSuccess(true);
    } catch (error) {
      setCreatingMonitor(false);
      console.error("Error creating monitor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Success Alert Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-green-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Monitor Created Successfully!
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Your website monitor has been set up and is now actively
                monitoring{" "}
                <span className="text-blue-400 font-medium">{url}</span> for the
                selected conditions.
              </p>
              <div className="space-y-4">
                <Link
                  href="/monitor"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setSelectedCondition("");
                    setKeyword("");
                    setStatusCode("");
                    setUrl("");
                  }}
                  className="w-full text-gray-400 hover:text-white px-6 py-3 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-200"
                >
                  Create Another Monitor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Create Monitor
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              What to monitor
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              Add your website URL to start monitoring. Need fine-tuned checks?
              Configure alert conditions below.
            </p>
          </div>

          {/* Monitor Configuration Card */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Alert Condition Section */}
            <div className="p-6 sm:p-8 border-b border-neutral-800">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white">
                    Alert Conditions
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Choose when to receive notifications
                  </p>
                </div>
              </div>

              {/* Form elements */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Monitoring Condition
                  </label>
                  <select
                    value={selectedCondition || ""}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full max-w-md border px-4 py-3 text-base rounded-xl border-neutral-700 bg-neutral-800/50 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-opacity-50 transition-all duration-200 hover:border-neutral-600 focus:outline-none"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-neutral-800 text-gray-400"
                    >
                      Select monitoring condition
                    </option>
                    {monitoringConditions.map((condition) => (
                      <option
                        key={condition.value}
                        value={condition.value}
                        className="bg-neutral-800 text-white py-2"
                      >
                        {condition.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCondition && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 max-w-md">
                    <p className="text-sm text-blue-300">
                      {
                        monitoringConditions.find(
                          (c) => c.value === selectedCondition
                        )?.description
                      }
                    </p>
                  </div>
                )}

                {/* Keyword Input - appears when keyword conditions are selected */}
                {needsKeyword && (
                  <div className="space-y-3 max-w-md">
                    <label className="block text-sm font-medium text-gray-300">
                      Keyword to{" "}
                      {selectedCondition === "keyword missing"
                        ? "check for"
                        : "monitor"}
                    </label>
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder={
                        selectedCondition === "keyword missing"
                          ? "Enter keyword that should be present"
                          : "Enter keyword to detect"
                      }
                      className="w-full px-4 py-3 text-base rounded-xl border border-neutral-700 bg-neutral-800/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:ring-opacity-50 transition-all duration-200 hover:border-neutral-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-400">
                      {selectedCondition === "keyword missing"
                        ? "Alert will be triggered if this keyword is NOT found on the page"
                        : "Alert will be triggered if this keyword IS found on the page"}
                    </p>
                  </div>
                )}

                {/* Status Code Input - appears when invalid code condition is selected */}
                {needsStatusCode && (
                  <div className="space-y-3 max-w-md">
                    <label className="block text-sm font-medium text-gray-300">
                      Expected Status Code
                    </label>
                    <input
                      type="number"
                      value={statusCode}
                      onChange={(e) => setStatusCode(e.target.value)}
                      placeholder="200"
                      min="100"
                      max="599"
                      className="w-full px-4 py-3 text-base rounded-xl border border-neutral-700 bg-neutral-800/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:ring-opacity-50 transition-all duration-200 hover:border-neutral-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-400">
                      Alert will be triggered if the website returns any status
                      code other than this value
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* URL Input Section */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white">
                    Website URL
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Enter the URL you want to monitor
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Website URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 text-base rounded-xl border border-neutral-700 bg-neutral-800/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:ring-opacity-50 transition-all duration-200 hover:border-neutral-600 focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Error message for invalid URL */}
                {url && !isUrlValid && (
                  <div className="text-red-400 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Please enter a valid URL (e.g., https://example.com)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <Link
              href={"/monitor"}
              className="w-full sm:w-auto px-8 py-3 text-gray-300 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-600 text-center"
            >
              Cancel
            </Link>
            <button
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              disabled={
                !selectedCondition ||
                !url ||
                (needsKeyword && !keyword) ||
                (needsStatusCode && !statusCode) ||
                creatingMonitor
              }
              onClick={handleCreateMonitor}
            >
              {creatingMonitor ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Monitor"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
