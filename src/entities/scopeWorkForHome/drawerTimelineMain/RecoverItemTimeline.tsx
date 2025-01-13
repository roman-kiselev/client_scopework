import { Button } from 'antd';
import React from 'react';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import { ITimelineMain } from './interfaces/ITimelineMain';

const RecoverItemTimeline: React.FC<ITimelineMain> = ({ item }) => {
    const { roles } = useAppSelector((store) => store.auth);
    const [handleRecovery] = tableAddingDataApi.useRecoveryMutation();
    const handleClickRecovery = (id: number) => {
        handleRecovery({ id: id });
    };
    return (
        <>
            {checkRole(roles, RoleString.ADMIN) && item.deletedAt !== null && (
                <Button
                    size="small"
                    style={{
                        backgroundColor: 'yellow',
                    }}
                    onClick={() => handleClickRecovery(item.id)}
                >
                    Восстановить
                </Button>
            )}
        </>
    );
};

export default RecoverItemTimeline;
