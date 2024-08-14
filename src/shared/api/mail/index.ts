import {
    IInviteToken,
    IMailSendOtpDto,
    IMailSendOtpResDto,
    ISendInviteDto,
} from 'src/shared/interfaces';
import { iamApi } from '../main';

export const mailApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation<IMailSendOtpResDto, IMailSendOtpDto>({
            query: (data) => ({
                url: '/mail/send-otp',
                method: 'POST',
                body: data,
            }),
        }),
        sendInviteTokens: builder.mutation<IInviteToken, ISendInviteDto>({
            query: (data) => ({
                url: '/mail/create-send-invite-token',
                method: 'POST',
                body: data,
            }),
        }),
        sendUpdateInviteTokens: builder.mutation<
            IInviteToken,
            { email: string }
        >({
            query: (data) => ({
                url: `/mail/send-updated-invite-token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
