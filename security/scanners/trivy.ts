import { exec } from "child_process";

export async function run() {

    return new Promise((resolve, reject) => {

        console.log("Running Trivy dependency scan");

        exec(
            "trivy fs --format json -o reports/trivy.json .",
            (error) => {

                if (error) {
                    reject("Dependency vulnerabilities found");
                } else {
                    resolve("Trivy scan completed");
                }

            }
        );

    });

}