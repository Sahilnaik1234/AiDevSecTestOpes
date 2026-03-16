import fs from "fs";
import { installTools } from "./tool-installer.js";
import { ScannerManager } from "./scanner-manager.js";
import { runComplianceChecks } from "../compilances/compilance-manager.js";
import { generateSecurityReport } from "./report-aggregator.js";
async function runSecurityPipeline() {
    if (!fs.existsSync("reports")) {
        fs.mkdirSync("reports");
    }
    installTools();

    const manager = new ScannerManager();

    await manager.runAll();

    await runComplianceChecks();

    generateSecurityReport();

    console.log("Security pipeline finished");

}

runSecurityPipeline().catch(error => {
    console.error("Pipeline failed with error:", error);
    process.exit(1);
});