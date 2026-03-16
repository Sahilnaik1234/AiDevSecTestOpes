import fs from "fs";
import yaml from "js-yaml";
import { execSync } from "child_process";

export function installTools() {

    const file = fs.readFileSync("config/tools.yaml", "utf8");
    const config: any = yaml.load(file);

    const categories = [
        config.secret_scanners,
        config.sast_scanners,
        config.dependency_scanners
    ];

    for (const category of categories) {

        if (!category) continue;

        for (const tool in category) {

            const installCommand = category[tool].install;

            if (installCommand) {

                console.log(`Installing ${tool}`);

                execSync(installCommand, { stdio: "inherit" });

            }

        }

    }

}