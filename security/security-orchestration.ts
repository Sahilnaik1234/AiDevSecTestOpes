import { installTools } from "./tool-installer.ts";
import { ScannerManager } from "./scanner-manager.ts";
import { runComplianceChecks } from "../compilances/compilance-manager.ts";
import { generateSecurityReport } from "./report-aggregator.ts";
async function runSecurityPipeline() {

    installTools();

    const manager = new ScannerManager();

    await manager.runAll();

    await runComplianceChecks();

    generateSecurityReport();

    console.log("Security pipeline finished");

}

runSecurityPipeline();