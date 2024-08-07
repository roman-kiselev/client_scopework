import { IInviteToken } from './IInviteToken';

export interface IInviteTokenWithExpired extends IInviteToken {
    expired: boolean;
}
