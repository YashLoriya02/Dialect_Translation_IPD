// export const googleLanguages = [
//     { name: "Afrikaans", code: "af", bcp47: "af-ZA" },
//     { name: "Albanian", code: "sq", bcp47: "sq-AL" },
//     { name: "Amharic", code: "am", bcp47: "am-ET" },
//     { name: "Arabic", code: "ar", bcp47: "ar-SA" },
//     { name: "Armenian", code: "hy", bcp47: "hy-AM" },
//     { name: "Azerbaijani", code: "az", bcp47: "az-AZ" },
//     { name: "Basque", code: "eu", bcp47: "eu-ES" },
//     { name: "Belarusian", code: "be", bcp47: "be-BY" },
//     { name: "Bengali", code: "bn", ping: "bn-IN", bcp47: "bn-BD" },
//     { name: "Bosnian", code: "bs", bcp47: "bs-BA" },
//     { name: "Bulgarian", code: "bg", bcp47: "bg-BG" },
//     { name: "Catalan", code: "ca", bcp47: "ca-ES" },
//     { name: "Cebuano", code: "ceb", bcp47: "ceb-PH" },
//     { name: "Chichewa", code: "ny", bcp47: "ny-MW" },
//     { name: "Chinese (Simplified)", code: "zh-CN", bcp47: "zh-CN" },
//     { name: "Chinese (Traditional)", code: "zh-TW", bcp47: "zh-TW" },
//     { name: "Corsican", code: "co", bcp47: "co-FR" },
//     { name: "Croatian", code: "hr", bcp47: "hr-HR" },
//     { name: "Czech", code: "cs", bcp47: "cs-CZ" },
//     { name: "Danish", code: "da", bcp47: "da-DK" },
//     { name: "Dutch", code: "nl", bcp47: "nl-NL" },
//     { name: "English", code: "en", ping: "null", bcp47: "en-US" },
//     { name: "Esperanto", code: "eo", bcp47: "eo" }, // No country code
//     { name: "Estonian", code: "et", bcp47: "et-EE" },
//     { name: "Filipino", code: "tl", bcp47: "fil-PH" },
//     { name: "Finnish", code: "fi", bcp47: "fi-FI" },
//     { name: "French", code: "fr", bcp47: "fr-FR" },
//     { name: "Frisian", code: "fy", bcp47: "fy-NL" },
//     { name: "Galician", code: "gl", bcp47: "gl-ES" },
//     { name: "Georgian", code: "ka", bcp47: "ka-GE" },
//     { name: "German", code: "de", bcp47: "de-DE" },
//     { name: "Greek", code: "el", bcp47: "el-GR" },
//     { name: "Gujarati", code: "gu", ping: "gu-IN", bcp47: "gu-IN" },
//     { name: "Haitian Creole", code: "ht", bcp47: "ht-HT" },
//     { name: "Hausa", code: "ha", bcp47: "ha-NG" },
//     { name: "Hawaiian", code: "haw", bcp47: "haw-US" },
//     { name: "Hebrew", code: "iw", bcp47: "he-IL" }, // Note: 'iw' is legacy, modern is 'he'
//     { name: "Hindi", code: "hi", ping: "hi-IN", bcp47: "hi-IN" },
//     { name: "Hmong", code: "hmn", bcp47: "hmn" }, // No country code
//     { name: "Hungarian", code: "hu", bcp47: "hu-HU" },
//     { name: "Icelandic", code: "is", bcp47: "is-IS" },
//     { name: "Igbo", code: "ig", bcp47: "ig-NG" },
//     { name: "Indonesian", code: "id", bcp47: "id-ID" },
//     { name: "Irish", code: "ga", bcp47: "ga-IE" },
//     { name: "Italian", code: "it", bcp47: "it-IT" },
//     { name: "Japanese", code: "ja", bcp47: "ja-JP" },
//     { name: "Javanese", code: "jw", bcp47: "jv-ID" }, // 'jw' is legacy, modern is 'jv'
//     { name: "Kannada", code: "kn", ping: "kn-IN", bcp47: "kn-IN" },
//     { name: "Kazakh", code: "kk", bcp47: "kk-KZ" },
//     { name: "Khasi", code: "kha", bcp47: "kha-IN" },
//     { name: "Khmer", code: "km", bcp47: "km-KH" },
//     { name: "Korean", code: "ko", bcp47: "ko-KR" },
//     { name: "Kurdish", code: "ku", bcp47: "ku-IQ" }, // Most common variant
//     { name: "Kyrgyz", code: "ky", bcp47: "ky-KG" },
//     { name: "Lao", code: "lo", bcp47: "lo-LA" },
//     { name: "Latin", code: "la", bcp47: "la" }, // No country code
//     { name: "Latvian", code: "lv", bcp47: "lv-LV" },
//     { name: "Lithuanian", code: "lt", bcp47: "lt-LT" },
//     { name: "Luxembourgish", code: "lb", bcp47: "lb-LU" },
//     { name: "Macedonian", code: "mk", bcp47: "mk-MK" },
//     { name: "Malagasy", code: "mg", bcp47: "mg-MG" },
//     { name: "Malay", code: "ms", bcp47: "ms-MY" },
//     { name: "Malayalam", code: "ml", ping: "ml-IN", bcp47: "ml-IN" },
//     { name: "Maltese", code: "mt", bcp47: "mt-MT" },
//     { name: "Maori", code: "mi", bcp47: "mi-NZ" },
//     { name: "Marathi", code: "mr", ping: "mr-IN", bcp47: "mr-IN" },
//     { name: "Mongolian", code: "mn", bcp47: "mn-MN" },
//     { name: "Myanmar", code: "my", bcp47: "my-MM" },
//     { name: "Nepali", code: "ne", bcp47: "ne-NP" },
//     { name: "Norwegian", code: "no", bcp47: "nb-NO" }, // Using Bokmål as default
//     { name: "Odia", code: "or", ping: "or-IN", bcp47: "or-IN" },
//     { name: "Pashto", code: "ps", bcp47: "ps-AF" },
//     { name: "Persian", code: "fa", bcp47: "fa-IR" },
//     { name: "Polish", code: "pl", bcp47: "pl-PL" },
//     { name: "Portuguese", code: "pt", bcp47: "pt-PT" }, // European Portuguese
//     { name: "Punjabi", code: "pa", ping: "pa-IN", bcp47: "pa-IN" },
//     { name: "Romanian", code: "ro", bcp47: "ro-RO" },
//     { name: "Russian", code: "ru", bcp47: "ru-RU" },
//     { name: "Samoan", code: "sm", bcp47: "sm-WS" },
//     { name: "Scots Gaelic", code: "gd", bcp47: "gd-GB" },
//     { name: "Serbian", code: "sr", bcp47: "sr-RS" },
//     { name: "Sesotho", code: "st", bcp47: "st-LS" },
//     { name: "Shona", code: "sn", bcp47: "sn-ZW" },
//     { name: "Sindhi", code: "sd", bcp47: "sd-PK" },
//     { name: "Sinhala", code: "si", bcp47: "si-LK" },
//     { name: "Slovak", code: "sk", bcp47: "sk-SK" },
//     { name: "Slovenian", code: "sl", bcp47: "sl-SI" },
//     { name: "Somali", code: "so", bcp47: "so-SO" },
//     { name: "Spanish", code: "es", bcp47: "es-ES" },
//     { name: "Sundanese", code: "su", bcp47: "su-ID" },
//     { name: "Swahili", code: "sw", bcp47: "sw-KE" },
//     { name: "Swedish", code: "sv", bcp47: "sv-SE" },
//     { name: "Tajik", code: "tg", bcp47: "tg-TJ" },
//     { name: "Tamil", code: "ta", ping: "ta-IN", bcp47: "ta-IN" },
//     { name: "Telugu", code: "te", ping: "te-IN", bcp47: "te-IN" },
//     { name: "Thai", code: "th", bcp47: "th-TH" },
//     { name: "Turkish", code: "tr", bcp47: "tr-TR" },
//     { name: "Ukrainian", code: "uk", bcp47: "uk-UA" },
//     { name: "Urdu", code: "ur", bcp47: "ur-PK" },
//     { name: "Uzbek", code: "uz", bcp47: "uz-UZ" },
//     { name: "Vietnamese", code: "vi", bcp47: "vi-VN" },
//     { name: "Welsh", code: "cy", bcp47: "cy-GB" },
//     { name: "Xhosa", code: "xh", bcp47: "xh-ZA" },
//     { name: "Yiddish", code: "yi", bcp47: "yi" }, // No country code
//     { name: "Yoruba", code: "yo", bcp47: "yo-NG" },
//     { name: "Zulu", code: "zu", bcp47: "zu-ZA" }
// ];