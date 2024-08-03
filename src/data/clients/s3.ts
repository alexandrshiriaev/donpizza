import { S3Client } from '@aws-sdk/client-s3';

const s3ClientSingleton = () => {
    return new S3Client({
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
};

declare const globalThis: {
    s3ClientGlobal: ReturnType<typeof s3ClientSingleton>;
} & typeof global;

const s3Client = globalThis.s3ClientGlobal ?? s3ClientSingleton();

export default s3Client;

if (process.env.NODE_ENV === 'production') globalThis.s3ClientGlobal = s3Client;
