import { IInviteToken, IInviteTokenWithExpired } from 'src/shared/interfaces';
import { iamApi } from '../main';

export const inviteTokensApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        checkInviteToken: builder.query<IInviteToken, { token: string }>({
            query: (data) => ({
                url: `/invite-tokens/check/?token=${data.token}`,
                method: 'GET',
            }),
        }),

        getInviteTokensList: builder.query<IInviteTokenWithExpired[], void>({
            query: () => ({
                url: '/invite-tokens/list',
                method: 'GET',
            }),
        }),
    }),
});
