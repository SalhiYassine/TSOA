"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodUser = void 0;
const zod_1 = require("zod");
exports.ZodUser = zod_1.z.object({
    id: zod_1.z.number(),
    email: zod_1.z.string(),
    name: zod_1.z.string(),
    status: zod_1.z.string().optional(),
    phoneNumbers: zod_1.z.array(zod_1.z.string()),
});
