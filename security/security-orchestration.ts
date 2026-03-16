import { installTools } from "./tool-installer";
import { ScannerManager } from "./scanner-manager";
import { runComplianceChecks } from "../compilances/compilance-manager";
import { generateSecurityReport } from "./report-aggregator";
async function runSecurityPipeline() {

    installTools();

    const manager = new ScannerManager();

    await manager.runAll();

    await runComplianceChecks();

    generateSecurityReport();

    console.log("Security pipeline finished");

}

runSecurityPipeline();