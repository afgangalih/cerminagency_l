export * from './agency';

export interface User {
    id: number;
    name: string;
    email: string;
    role?: 'admin' | 'client' | 'creative_lead' | 'editor';
    phone_number?: string;
    business_name?: string;
    instagram_handle?: string;
    avatar_url?: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
