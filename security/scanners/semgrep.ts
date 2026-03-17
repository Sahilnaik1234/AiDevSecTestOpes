import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Semgrep SAST scan");

        exec(
            "semgrep --config auto --json > reports/semgrep.json",
            (error) => {

                if (error) {
                    console.log("Semgrep found vulnerabilities (see report)");
                    resolve("Semgrep scan completed with findings");
                } else {
                    resolve("Semgrep scan completed");
                }

            }
        );

    });

}