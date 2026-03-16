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
            const scannerPath = `./security/scanners/${scannerName}.ts`;
            if (!fs.existsSync(scannerPath)) {
                console.log(`Skipping ${scannerName}: Implementation not found at ${scannerPath}`);
                return;
            }

            console.log(`Running ${scannerName} scanner`);
            const scanner = await import(`./scanners/${scannerName}.ts`);
            await scanner.run();
        } catch (error) {
            console.error(`${scannerName} failed`);
            throw error;
        }
    }

    async runCategory(scanners: any) {
        if (!scanners) return;
        const scannerNames = Object.keys(scanners);
        for (const scanner of scannerNames) {
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