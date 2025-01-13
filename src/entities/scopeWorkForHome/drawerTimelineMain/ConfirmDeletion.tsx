import { Button } from 'antd';
import React from 'react';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import { ITimelineMain } from './interfaces/ITimelineMain';

const ConfirmDeletion: React.FC<ITimelineMain> = ({ item }) => {
    const { roles } = useAppSelector((store) => store.auth);
    const [handleConfirm] = tableAddingDataApi.useConfirmMutation();
    const handleClickConfirm = (id: number, idDelCandidate: number) => {
        handleConfirm({ id, idDelCandidate });
    };
    return (
        <>
            {checkRole(roles, RoleString.ADMIN) &&
                item.deletedAt === null &&
                item.id !== null &&
                item.delCandidate !== null && (
                    <Button
                        onClick={() => {
                            if (
                                item.id !== null &&
                                item.delCandidate !== null
                            ) {
                                handleClickConfirm(item.id, item.delCandidate);
                            }
                        }}
                        size="small"
                        type="primary"
                    >
                        Подтвердить удаление
                    </Button>
                )}
        </>
    );
};

export default ConfirmDeletion;
