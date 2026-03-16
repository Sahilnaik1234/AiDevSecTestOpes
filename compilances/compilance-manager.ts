import { runHIPAA } from "./frameworks/hippa.js";
import { runSOC2 } from "./frameworks/soc2.js";

export async function runComplianceChecks() {

    console.log("Running HIPAA checks");
    await runHIPAA();

    console.log("Running SOC2 checks");
    await runSOC2();

    console.log("Compliance checks passed");

}