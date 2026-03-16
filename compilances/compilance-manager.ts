import { runHIPAA } from "./frameworks/hippa";
import { runSOC2 } from "./frameworks/soc2";

export async function runComplianceChecks() {

    console.log("Running HIPAA checks");
    await runHIPAA();

    console.log("Running SOC2 checks");
    await runSOC2();

    console.log("Compliance checks passed");

}