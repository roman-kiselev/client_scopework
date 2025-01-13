import {
    IObjectRechartsDataAndCountDto,
    IObjectRechartsTypeWorkDataDto,
} from 'src/shared/interfaces/models';
import {
    IGetDataRechartsProgressDto,
    IObjectCreateAttr,
    IObjectCreateResponse,
    IObjectFullData,
    IObjectShort,
    IOneObjectDataShort,
} from '../../interfaces';
import { mainApi } from '../main';

export const objectsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<IObjectCreateResponse, IObjectCreateAttr>({
            query: (objectData) => ({
                url: '/objects',
                method: 'POST',
                body: objectData,
            }),
        }),
        getAllObjects: builder.query<IObjectCreateResponse[], void>({
            query: () => ({
                url: '/objects',
                method: 'GET',
            }),
        }),
        getAllShortData: builder.query<IOneObjectDataShort[], void>({
            query: () => ({
                url: '/objects/shortData',
                method: 'GET',
            }),
        }),

        getFullDataForOne: builder.query<IObjectFullData, number>({
            query: (id) => ({
                url: `/objects/fullData/${id}`,
                method: 'GET',
            }),
        }),
        getAllObjectShort: builder.query<IObjectShort[], void>({
            query: () => ({
                url: `/objects/shortAllObjects`,
                method: 'GET',
            }),
        }),
        getAllDataRechartsProgress: builder.query<
            IObjectRechartsDataAndCountDto,
            IGetDataRechartsProgressDto
        >({
            query: (queryParams) => {
                const queryParamsData: Record<string, string> = {};
                queryParamsData.limit = queryParams.limit.toString();
                queryParamsData.offset = queryParams.offset.toString();

                const query = new URLSearchParams(queryParamsData).toString();
                return {
                    url: `/objects/data-recharts-progress/?${query}`,
                    method: 'GET',
                };
            },
        }),
        getAllDataRechartsTypeWork: builder.query<
            IObjectRechartsTypeWorkDataDto,
            { objectId: number }
        >({
            query: ({ objectId }) => {
                return {
                    url: `/objects/data-recharts-type-work/${objectId}`,
                    method: 'GET',
                };
            },
        }),
    }),
});
