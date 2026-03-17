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

    // ---- DETAILED LOGGING ----

    if (report.secrets.length > 0) {
        console.log("\n--- Secrets Found ---");
        report.secrets.forEach((s: any) => {
            console.log(`- File: ${s.File}, Line: ${s.StartLine}, Type: ${s.Description}`);
        });
    }

    if (report.sast.length > 0) {
        console.log("\n--- SAST Vulnerabilities Found ---");
        report.sast.forEach((v: any) => {
            console.log(`- File: ${v.path}, Line: ${v.start.line}, Rule: ${v.check_id}, Message: ${v.extra.message}`);
        });
    }

    if (report.dependencies.length > 0) {
        console.log("\n--- Dependency Vulnerabilities Found ---");
        report.dependencies.forEach((d: any) => {
            console.log(`- Target: ${d.Target}`);
            d.Vulnerabilities?.forEach((v: any) => {
                console.log(`  * ID: ${v.VulnerabilityID}, Severity: ${v.Severity}, Pkg: ${v.PkgName}`);
            });
        });
    }

    // ---- SECURITY POLICY CHECK ----

    if (report.secrets.length > 0) {
        console.error("\n❌ Secrets detected in repository");
        process.exit(1);
    }

    if (report.sast.length > 0) {
        console.error("\n❌ SAST vulnerabilities detected");
        process.exit(1);
    }

    if (report.dependencies.length > 0) {
        console.error("\n❌ Vulnerable dependencies detected");
        process.exit(1);
    }

    console.log("\n✅ No critical security issues found");

}