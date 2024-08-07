import {
    IGetOrganizationWithToken,
    IOrganization,
} from 'src/shared/interfaces';
import { iamApi } from '../main';

export const organizationApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrganization: builder.query<
            IOrganization,
            IGetOrganizationWithToken
        >({
            query: (data) => ({
                url: `/organizations/${data.id}/?token=${data.token}`,
                method: 'GET',
            }),
        }),
    }),
});
