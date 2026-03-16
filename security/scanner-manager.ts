import fs from "fs";
import yaml from "js-yaml";

export class ScannerManager {

    config: any;

    constructor() {
        const file = fs.readFileSync("config/tools.yaml", "utf8");
        this.config = yaml.load(file);
    }

    async runScanner(scannerName: string) {

        try {

            console.log(`Running ${scannerName} scanner`);

            const scanner = await import(`./scanners/${scannerName}`);

            await scanner.run();

        } catch (error) {

            console.error(`${scannerName} failed`);
            throw error;

        }

    }

    async runCategory(scanners: string[]) {

        if (!scanners) return;

        for (const scanner of scanners) {
            await this.runScanner(scanner);
        }

    }

    async runAll() {

        console.log("Starting security scans...");

        await this.runCategory(this.config.secret_scanners);
        await this.runCategory(this.config.sast_scanners);
        await this.runCategory(this.config.dependency_scanners);

        console.log("Security scans finished");

    }

}