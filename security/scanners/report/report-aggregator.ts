import fs from "fs";

export function generateSecurityReport() {

    const report: any = {
        secrets: [],
        sast: [],
        dependencies: []
    };

    // Read Gitleaks report
    if (fs.existsSync("reports/gitleaks.json")) {
        const gitleaks = JSON.parse(
            fs.readFileSync("reports/gitleaks.json", "utf8")
        );
        report.secrets = gitleaks;
    }

    // Read Semgrep report
    if (fs.existsSync("reports/semgrep.json")) {
        const semgrep = JSON.parse(
            fs.readFileSync("reports/semgrep.json", "utf8")
        );
        report.sast = semgrep.results || [];
    }

    // Read Trivy report
    if (fs.existsSync("reports/trivy.json")) {
        const trivy = JSON.parse(
            fs.readFileSync("reports/trivy.json", "utf8")
        );
        report.dependencies = trivy.Results || [];
    }

    // Save combined report
    fs.writeFileSync(
        "reports/security-summary.json",
        JSON.stringify(report, null, 2)
    );

    console.log("Security summary generated");

    // ---- SECURITY POLICY CHECK ----

    if (report.secrets.length > 0) {
        console.error("❌ Secrets detected in repository");
        process.exit(1);
    }

    if (report.sast.length > 0) {
        console.error("❌ SAST vulnerabilities detected");
        process.exit(1);
    }

    if (report.dependencies.length > 0) {
        console.error("❌ Vulnerable dependencies detected");
        process.exit(1);
    }

    console.log("✅ No critical security issues found");

}