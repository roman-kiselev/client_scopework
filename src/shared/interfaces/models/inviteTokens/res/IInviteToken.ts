export interface IInviteToken {
    id: number;
    org_id: number;
    token: string;
    email: string;
    is_used: boolean;
    created_at: string;
    expires_at: string;
}
