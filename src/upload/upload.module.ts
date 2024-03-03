import { Module } from "@nestjs/common";
import { UploadCOntroller } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
    imports: [],
    controllers:[UploadCOntroller],
    providers: [UploadService],
})export class UploadModule{};