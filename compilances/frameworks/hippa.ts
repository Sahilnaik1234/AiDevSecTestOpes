import fs from "fs";

export async function runHIPAA() {

    console.log("Checking HIPAA compliance");

    const files = fs.readdirSync("src");

    for (const file of files) {

        const content = fs.readFileSync(`src/${file}`, "utf8");

        if (content.includes("patient_ssn")) {
            throw new Error("HIPAA violation detected");
        }

    }

    console.log("HIPAA checks passed");

}