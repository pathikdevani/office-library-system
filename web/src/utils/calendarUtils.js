export const getLocaleDateString = () => {
  const formats = {
    'ar-SA': 'dd/MM/yyyy',
    'bg-BG': 'dd.MM.yyyy',
    'ca-ES': 'dd/MM/yyyy',
    'zh-TW': 'yyyy/MM/dd',
    'cs-CZ': 'dd.MM.yyyy',
    'da-DK': 'dd-MM-yyyy',
    'de-DE': 'dd.MM.yyyy',
    'el-GR': 'dd/MM/yyyy',
    'en-US': 'MM/dd/yyyy',
    'fi-FI': 'dd.MM.yyyy',
    'fr-FR': 'dd/MM/yyyy',
    'he-IL': 'dd/MM/yyyy',
    'hu-HU': 'yyyy. MM. dd.',
    'is-IS': 'dd.MM.yyyy',
    'it-IT': 'dd/MM/yyyy',
    'ja-JP': 'yyyy/MM/dd',
    'ko-KR': 'yyyy-MM-dd',
    'nl-NL': 'dd-MM-yyyy',
    'nb-NO': 'dd.MM.yyyy',
    'pl-PL': 'yyyy-MM-dd',
    'pt-BR': 'dd/MM/yyyy',
    'ro-RO': 'dd.MM.yyyy',
    'ru-RU': 'dd.MM.yyyy',
    'hr-HR': 'dd.MM.yyyy',
    'sk-SK': 'dd. MM. yyyy',
    'sq-AL': 'yyyy-MM-dd',
    'sv-SE': 'yyyy-MM-dd',
    'th-TH': 'dd/MM/yyyy',
    'tr-TR': 'dd.MM.yyyy',
    'ur-PK': 'dd/MM/yyyy',
    'id-ID': 'dd/MM/yyyy',
    'uk-UA': 'dd.MM.yyyy',
    'be-BY': 'dd.MM.yyyy',
    'sl-SI': 'dd.MM.yyyy',
    'et-EE': 'dd.MM.yyyy',
    'lv-LV': 'yyyy.MM.dd.',
    'lt-LT': 'yyyy.MM.dd',
    'fa-IR': 'MM/dd/yyyy',
    'vi-VN': 'dd/MM/yyyy',
    'hy-AM': 'dd.MM.yyyy',
    'az-Latn-AZ': 'dd.MM.yyyy',
    'eu-ES': 'yyyy/MM/dd',
    'mk-MK': 'dd.MM.yyyy',
    'af-ZA': 'yyyy/MM/dd',
    'ka-GE': 'dd.MM.yyyy',
    'fo-FO': 'dd-MM-yyyy',
    'hi-IN': 'dd-MM-yyyy',
    'ms-MY': 'dd/MM/yyyy',
    'kk-KZ': 'dd.MM.yyyy',
    'ky-KG': 'dd.MM.yyyy',
    'sw-KE': 'MM/dd/yyyy',
    'uz-Latn-UZ': 'dd/MM yyyy',
    'tt-RU': 'dd.MM.yyyy',
    'pa-IN': 'dd-MM-yyyy',
    'gu-IN': 'dd-MM-yyyy',
    'ta-IN': 'dd-MM-yyyy',
    'te-IN': 'dd-MM-yyyy',
    'kn-IN': 'dd-MM-yyyy',
    'mr-IN': 'dd-MM-yyyy',
    'sa-IN': 'dd-MM-yyyy',
    'mn-MN': 'yyyy.MM.dd',
    'gl-ES': 'dd/MM/yyyy',
    'kok-IN': 'dd-MM-yyyy',
    'syr-SY': 'dd/MM/yyyy',
    'dv-MV': 'dd/MM/yyyy',
    'ar-IQ': 'dd/MM/yyyy',
    'zh-CN': 'yyyy/MM/dd',
    'de-CH': 'dd.MM.yyyy',
    'en-GB': 'dd/MM/yyyy',
    'es-MX': 'dd/MM/yyyy',
    'fr-BE': 'dd/MM/yyyy',
    'it-CH': 'dd.MM.yyyy',
    'nl-BE': 'dd/MM/yyyy',
    'nn-NO': 'dd.MM.yyyy',
    'pt-PT': 'dd-MM-yyyy',
    'sr-Latn-CS': 'dd.MM.yyyy',
    'sv-FI': 'dd.MM.yyyy',
    'az-Cyrl-AZ': 'dd.MM.yyyy',
    'ms-BN': 'dd/MM/yyyy',
    'uz-Cyrl-UZ': 'dd.MM.yyyy',
    'ar-EG': 'dd/MM/yyyy',
    'zh-HK': 'dd/MM/yyyy',
    'de-AT': 'dd.MM.yyyy',
    'en-AU': 'dd/MM/yyyy',
    'es-ES': 'dd/MM/yyyy',
    'fr-CA': 'yyyy-MM-dd',
    'sr-Cyrl-CS': 'dd.MM.yyyy',
    'ar-LY': 'dd/MM/yyyy',
    'zh-SG': 'dd/MM/yyyy',
    'de-LU': 'dd.MM.yyyy',
    'en-CA': 'dd/MM/yyyy',
    'es-GT': 'dd/MM/yyyy',
    'fr-CH': 'dd.MM.yyyy',
    'ar-DZ': 'dd-MM-yyyy',
    'zh-MO': 'dd/MM/yyyy',
    'de-LI': 'dd.MM.yyyy',
    'en-NZ': 'dd/MM/yyyy',
    'es-CR': 'dd/MM/yyyy',
    'fr-LU': 'dd/MM/yyyy',
    'ar-MA': 'dd-MM-yyyy',
    'en-IE': 'dd/MM/yyyy',
    'es-PA': 'MM/dd/yyyy',
    'fr-MC': 'dd/MM/yyyy',
    'ar-TN': 'dd-MM-yyyy',
    'en-ZA': 'yyyy/MM/dd',
    'es-DO': 'dd/MM/yyyy',
    'ar-OM': 'dd/MM/yyyy',
    'en-JM': 'dd/MM/yyyy',
    'es-VE': 'dd/MM/yyyy',
    'ar-YE': 'dd/MM/yyyy',
    'en-029': 'MM/dd/yyyy',
    'es-CO': 'dd/MM/yyyy',
    'ar-SY': 'dd/MM/yyyy',
    'en-BZ': 'dd/MM/yyyy',
    'es-PE': 'dd/MM/yyyy',
    'ar-JO': 'dd/MM/yyyy',
    'en-TT': 'dd/MM/yyyy',
    'es-AR': 'dd/MM/yyyy',
    'ar-LB': 'dd/MM/yyyy',
    'en-ZW': 'MM/dd/yyyy',
    'es-EC': 'dd/MM/yyyy',
    'ar-KW': 'dd/MM/yyyy',
    'en-PH': 'MM/dd/yyyy',
    'es-CL': 'dd-MM-yyyy',
    'ar-AE': 'dd/MM/yyyy',
    'es-UY': 'dd/MM/yyyy',
    'ar-BH': 'dd/MM/yyyy',
    'es-PY': 'dd/MM/yyyy',
    'ar-QA': 'dd/MM/yyyy',
    'es-BO': 'dd/MM/yyyy',
    'es-SV': 'dd/MM/yyyy',
    'es-HN': 'dd/MM/yyyy',
    'es-NI': 'dd/MM/yyyy',
    'es-PR': 'dd/MM/yyyy',
    'am-ET': 'dd/MM/yyyy',
    'tzm-Latn-DZ': 'dd-MM-yyyy',
    'iu-Latn-CA': 'dd/MM/yyyy',
    'sma-NO': 'dd.MM.yyyy',
    'mn-Mong-CN': 'yyyy/MM/dd',
    'gd-GB': 'dd/MM/yyyy',
    'en-MY': 'dd/MM/yyyy',
    'prs-AF': 'dd/MM/yy',
    'bn-BD': 'dd-MM-yyyy',
    'wo-SN': 'dd/MM/yyyy',
    'rw-RW': 'MM/dd/yyyy',
    'qut-GT': 'dd/MM/yyyy',
    'sah-RU': 'MM.dd.yyyy',
    'gsw-FR': 'dd/MM/yyyy',
    'co-FR': 'dd/MM/yyyy',
    'oc-FR': 'dd/MM/yyyy',
    'mi-NZ': 'dd/MM/yyyy',
    'ga-IE': 'dd/MM/yyyy',
    'se-SE': 'yyyy-MM-dd',
    'br-FR': 'dd/MM/yyyy',
    'smn-FI': 'dd.MM.yyyy',
    'moh-CA': 'MM/dd/yyyy',
    'arn-CL': 'dd-MM-yyyy',
    'ii-CN': 'yyyy/MM/dd',
    'dsb-DE': 'dd. MM. yyyy',
    'ig-NG': 'dd/MM/yyyy',
    'kl-GL': 'dd-MM-yyyy',
    'lb-LU': 'dd/MM/yyyy',
    'ba-RU': 'dd.MM.yyyy',
    'nso-ZA': 'yyyy/MM/dd',
    'quz-BO': 'dd/MM/yyyy',
    'yo-NG': 'd/MM/yyyy',
    'ha-Latn-NG': 'dd/MM/yyyy',
    'fil-PH': 'MM/dd/yyyy',
    'ps-AF': 'dd/MM/yyyy',
    'fy-NL': 'dd-MM-yyyy',
    'ne-NP': 'MM/dd/yyyy',
    'se-NO': 'dd.MM.yyyy',
    'iu-Cans-CA': 'dd/MM/yyyy',
    'sr-Latn-RS': 'dd.MM.yyyy',
    'si-LK': 'yyyy-MM-dd',
    'sr-Cyrl-RS': 'dd.MM.yyyy',
    'lo-LA': 'dd/MM/yyyy',
    'km-KH': 'yyyy-MM-dd',
    'cy-GB': 'dd/MM/yyyy',
    'bo-CN': 'yyyy/MM/dd',
    'sms-FI': 'dd.MM.yyyy',
    'as-IN': 'dd-MM-yyyy',
    'ml-IN': 'dd-MM-yyyy',
    'en-IN': 'dd/MM/yyyy',
    'or-IN': 'dd-MM-yyyy',
    'bn-IN': 'dd-MM-yyyy',
    'tk-TM': 'dd.MM.yyyy',
    'bs-Latn-BA': 'dd.MM.yyyy',
    'mt-MT': 'dd/MM/yyyy',
    'sr-Cyrl-ME': 'dd.MM.yyyy',
    'se-FI': 'dd.MM.yyyy',
    'zu-ZA': 'yyyy/MM/dd',
    'xh-ZA': 'yyyy/MM/dd',
    'tn-ZA': 'yyyy/MM/dd',
    'hsb-DE': 'dd. MM. yyyy',
    'bs-Cyrl-BA': 'dd.MM.yyyy',
    'tg-Cyrl-TJ': 'dd.MM.yyyy',
    'sr-Latn-BA': 'dd.MM.yyyy',
    'smj-NO': 'dd.MM.yyyy',
    'rm-CH': 'dd/MM/yyyy',
    'smj-SE': 'yyyy-MM-dd',
    'quz-EC': 'dd/MM/yyyy',
    'quz-PE': 'dd/MM/yyyy',
    'hr-BA': 'dd.MM.yyyy.',
    'sr-Latn-ME': 'dd.MM.yyyy',
    'sma-SE': 'yyyy-MM-dd',
    'en-SG': 'dd/MM/yyyy',
    'ug-CN': 'yyyy-MM-dd',
    'sr-Cyrl-BA': 'dd.MM.yyyy',
    'es-US': 'MM/dd/yyyy',
    en: 'dd/MM/yyyy',
  };

  return (formats[navigator.language]) || 'MM/dd/yyyy';
};
