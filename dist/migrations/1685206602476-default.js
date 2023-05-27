"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1685206602476 = void 0;
class Default1685206602476 {
    constructor() {
        this.name = 'Default1685206602476';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Default1685206602476 = Default1685206602476;
