import { FilesService } from './files.service';
import { DeleteFileDto, SignedUploadQueryDto, UploadFileQueryDto } from './dto/files.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, query: UploadFileQueryDto): Promise<import("../../shared/storage/storage.interface").UploadResult>;
    uploadImage(files: {
        file?: Express.Multer.File[];
        image?: Express.Multer.File[];
    }, query: UploadFileQueryDto): Promise<import("../../shared/storage/storage.interface").UploadResult>;
    uploadMany(files: Express.Multer.File[], query: UploadFileQueryDto): Promise<{
        files: import("../../shared/storage/storage.interface").UploadResult[];
    }>;
    getUploadSignature(query: SignedUploadQueryDto): Promise<import("../../shared/storage/storage.interface").SignedUploadParams>;
    delete(dto: DeleteFileDto): Promise<{
        success: boolean;
        publicId: string;
    }>;
}
