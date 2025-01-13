import { Button } from 'antd';
import React from 'react';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import { ITimelineMain } from './interfaces/ITimelineMain';

const DelItemTimeline: React.FC<ITimelineMain> = ({ item }) => {
    const { roles } = useAppSelector((store) => store.auth);
    const [handleRemove] = tableAddingDataApi.useRemoveMutation();
    const handleClickRemove = (id: number) => {
        handleRemove({ id: id });
    };
    return (
        <>
            {checkRole(roles, RoleString.ADMIN) && item.deletedAt === null && (
                <Button
                    size="small"
                    danger
                    type="primary"
                    onClick={() => handleClickRemove(item.id)}
                >
                    Удалить
                </Button>
            )}
        </>
    );
};

export default DelItemTimeline;
