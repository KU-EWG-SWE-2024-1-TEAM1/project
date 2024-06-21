import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

export const generatePresignedUrl = async (fileName, fileType) => {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return { uploadURL, key: fileName };
};