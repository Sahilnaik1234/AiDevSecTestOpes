import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Semgrep SAST scan");

        exec(
            "semgrep --config auto --json > reports/semgrep.json",
            (error) => {

                if (error) {
                    reject("Semgrep vulnerabilities detected");
                } else {
                    resolve("Semgrep scan completed");
                }

            }
        );

    });

}