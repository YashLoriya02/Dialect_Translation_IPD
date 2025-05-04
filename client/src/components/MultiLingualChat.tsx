// import React, { useRef, useEffect, useState } from "react";
// import languageIcon from "../../static/image/lang.svg";
// import axios from "axios";
// import { googleLanguages } from "@/utils/langUtil";

// const MultiLingualChat = ({ isOpen = false, onClose }) => {
//     const modalRef = useRef(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedLanguage, setSelectedLanguage] = useState(
//         "en"
//     );
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [isPingLoading, setIsPingLoading] = useState(false);

//     // Filter languages based on search query
//     const filteredLanguages = googleLanguages.filter((lang) =>
//         lang.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Function to trigger Google translate
//     //   const handleLanguageChange = (langCode) => {
//     //     setSelectedLanguage(langCode);

//     //     // Find the Google translate dropdown and change its value
//     //     const googleTranslateSelect = document.querySelector(".goog-te-combo");
//     //     if (googleTranslateSelect) {
//     //     //   googleTranslateSelect.value = langCode;
//     //       googleTranslateSelect.value = langCode;
//     //       googleTranslateSelect.dispatchEvent(new Event("change"));

//     //       // Store the selected language preference
//     //     //   Cookies.set("google_translate_language", langCode, { expires: 365 });
//     //     }
//     //   };

//     const handleLanguageChange = (langCode) => {
//         const trySetLanguage = () => {
//             const googleTranslateSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
//             if (googleTranslateSelect) {
//                 googleTranslateSelect.value = langCode;
//                 googleTranslateSelect.dispatchEvent(new Event("change"));
//             } else {
//                 // Retry after 200ms if not yet loaded
//                 setTimeout(trySetLanguage, 200);
//             }
//         };

//         trySetLanguage();
//     };


//     // Handle click outside modal
//     const handleClickOutside = (event) => {
//         if (modalRef.current && !modalRef.current.contains(event.target)) {
//             onClose();
//         }
//     };

//     // Setup listeners
//     useEffect(() => {
//         if (isOpen) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isOpen, onClose]);


//     //   const handleLanguageSelect = async (langCode) => {
//     //     setIsPingLoading(true);
//     //     // const userId = Cookies.get("userId");

//     //     // Find the selected language from the googleLanguages array
//     //     const selectedLang = googleLanguages.find((lang) => lang.code === langCode);

//     //     // Get the ping value if it exists, otherwise use null
//     //     const pingValue = selectedLang.code == "en" ? "null" : selectedLang.code;

//     //     const languageSelect = {
//     //       botToken: Cookies.get("botTokens"),
//     //       userId,
//     //       conversationId: Cookies.get("conversationIds"),
//     //       tokenCreatedAts: Cookies.get("tokenCreatedAts"),
//     //       alias: "User",
//     //       type: "languagePing",
//     //       from: { role: "user", id: Cookies.get("userId") },
//     //       text: pingValue,
//     //     };

//     //     // try {
//     //     //   await axios.post(
//     //     //     `${serverUrl}api/chat/send-ping-activity`,
//     //     //     languageSelect
//     //     //   );
//     //     //   return true;
//     //     // } catch (error) {
//     //     //   console.log("Error sending ping activity:", error);
//     //     //   return false;
//     //     // } finally {
//     //     //   setIsPingLoading(false);
//     //     // }
//     //   };

//     const handleSubmit = async () => {
//         setIsLoading(true);

//         // if (Cookies.get("Id")) {
//         //   const token = Cookies.get("signinToken");

//         //   await axios.post(
//         //     `${serverUrl}user/setLang`,
//         //     {
//         //       id: Cookies.get("Id"),
//         //       lang: selectedLanguage,
//         //     },
//         //     {
//         //       headers: {
//         //         Authorization: `Bearer ${token}`,
//         //       },
//         //     }
//         //   );
//         // }

//         try {
//             // Apply the selected language through Google Translate
//             handleLanguageChange(selectedLanguage);

//             // Send the language ping
//             //   const pingSuccess = await handleLanguageSelect(selectedLanguage);

//             //   if (pingSuccess) {
//             //     setIsSubmitted(true);
//             //   }
//         } catch (error) {
//             console.error("Error setting language:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle language selection
//     const handleSelectLanguage = (langCode) => {
//         setSelectedLanguage(langCode);
//     };

//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 notranslate"
//             style={{ zIndex: 1000 }}
//         >
//             <div
//                 ref={modalRef}
//                 className="bg-[#1f2029] w-[500px] p-6 text-white flex flex-col gap-6 no-scrollbar overflow-y-auto rounded-2xl shadow-lg"
//                 style={{ maxHeight: "80vh" }}
//             >
//                 {/* Header */}
//                 <div className="flex flex-row gap-4 items-center">
//                     <img src={languageIcon} alt="language icon" className="w-8 h-8" />
//                     <h2 className="text-xl font-semibold tracking-wide">
//                         Choose Your Language
//                     </h2>
//                 </div>

//                 {/* Search bar */}
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <svg
//                             className="w-4 h-4 text-gray-400"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 20 20"
//                         >
//                             <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                             />
//                         </svg>
//                     </div>
//                     <input
//                         type="search"
//                         className="block w-full p-3 pl-10 text-sm bg-[#2a2b35] rounded-lg border border-[#3a3b45] text-white focus:ring-[#ab2d73] focus:border-[#ab2d73] outline-none"
//                         placeholder="Search languages..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>

//                 {/* Language grid */}
//                 <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
//                     {filteredLanguages.map((lang, index) => (
//                         <div key={index} className="flex items-center gap-3">
//                             <span
//                                 className={`w-full py-2 px-4 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedLanguage === lang.code
//                                     ? "bg-[#ab2d7333] text-white"
//                                     : "bg-[#2a2b35] text-gray-300 hover:bg-[#3a3b45]"
//                                     }`}
//                                 onClick={() => handleSelectLanguage(lang.code)}
//                             >
//                                 {lang.name}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Hidden Google translate element */}
//                 <div id="google_translate_element" className="hidden"></div>

//                 {/* Buttons Section */}
//                 <div className="flex justify-end gap-4 mt-2">
//                     {!isSubmitted && (
//                         <button
//                             onClick={onClose}
//                             className="px-5 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
//                         >
//                             Cancel
//                         </button>
//                     )}
//                     {isSubmitted ? (
//                         <button
//                             onClick={onClose}
//                             className="px-5 py-2 bg-[#4e477f] text-white rounded-lg hover:bg-[#413976] transition-colors text-sm font-medium"
//                         >
//                             Done
//                         </button>
//                     ) : (
//                         <button
//                             onClick={handleSubmit}
//                             disabled={isLoading || isPingLoading}
//                             className={`px-5 py-2 bg-[#ab2d73] text-white rounded-lg hover:bg-[#c33d8a] transition-colors text-sm font-medium ${isLoading || isPingLoading
//                                 ? "opacity-60 cursor-not-allowed"
//                                 : ""
//                                 }`}
//                         >
//                             {isLoading || isPingLoading ? (
//                                 <span className="flex items-center gap-2">
//                                     <svg
//                                         className="animate-spin h-5 w-5 text-white"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                         />
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
//                                         />
//                                     </svg>
//                                     Processing...
//                                 </span>
//                             ) : (
//                                 "Apply Language"
//                             )}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MultiLingualChat;
