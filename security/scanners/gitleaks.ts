import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Gitleaks secret scan");

        exec(
            "gitleaks detect --source . --report-format json --report-path reports/gitleaks.json",
            (error) => {

                if (error) {
                    reject("Secrets detected by Gitleaks");
                } else {
                    resolve("Gitleaks scan passed");
                }

            }
        );

    });

}