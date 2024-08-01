declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NON_POOLING: string;
            AUTH_SECRET: string;
        }
    }
}

export {};
