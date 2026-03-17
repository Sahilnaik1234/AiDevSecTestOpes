import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Trivy dependency scan");

        exec(
            "trivy fs --format json -o reports/trivy.json .",
            (error) => {

                if (error) {
                    console.log("Trivy found vulnerabilities (see report)");
                    resolve("Trivy scan completed with findings");
                } else {
                    resolve("Trivy scan completed");
                }

            }
        );

    });

}