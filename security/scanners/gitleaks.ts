import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Gitleaks secret scan");

        exec(
            "gitleaks detect --source . --report-format json --report-path reports/gitleaks.json",
            (error) => {

                if (error) {
                    console.log("Gitleaks found secrets (see report)");
                    resolve("Gitleaks scan completed with findings");
                } else {
                    resolve("Gitleaks scan completed");
                }

            }
        );

    });

}