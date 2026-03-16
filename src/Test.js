// ---------- SECRET TEST (Gitleaks) ----------
const API_KEY = "sk_test_123456789";

// ---------- SAST TEST (Semgrep / CodeQL) ----------
function insecureEval(userInput) {
    eval(userInput);   // insecure code execution
}

// ---------- DEPENDENCY TEST (Trivy simulation) ----------
const vulnerablePackage = require("lodash");

// ---------- HIPAA TEST ----------
const patient_ssn = "123-45-6789";

// ---------- SOC2 TEST ----------
const password = "admin123";