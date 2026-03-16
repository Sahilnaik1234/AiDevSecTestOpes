import fs from "fs";
import { installTools } from "./tool-installer.ts";
import { ScannerManager } from "./scanner-manager.ts";
import { runComplianceChecks } from "../compilances/compilance-manager.ts";
import { generateSecurityReport } from "./report-aggregator.ts";
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