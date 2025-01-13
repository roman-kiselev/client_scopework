import { Button, Spin } from 'antd';
import React from 'react';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import { IMarkForDeletion } from './interfaces';

const MarkForDeletion: React.FC<IMarkForDeletion> = ({
    item,
    refetchTimeline,
}) => {
    const { id, roles } = useAppSelector((store) => store.auth);
    const [handleCandidateDel, { isLoading }] =
        tableAddingDataApi.useCreateCandidateDelMutation();
    const handleClickCandidate = (
        userId: number | null,
        tableAddingDataId: number
    ) => {
        handleCandidateDel({
            userId: userId !== null ? userId : 0,
            tableAddingDataId,
        });
        refetchTimeline();
    };

    if (isLoading) <Spin />;

    return (
        <>
            {checkRole(roles, [RoleString.MASTER, RoleString.WORKER]) &&
                item.userId === id &&
                item.delCandidate === null &&
                item.deletedAt === null && (
                    <Button
                        onClick={() =>
                            handleClickCandidate(item.userId, item.id)
                        }
                        size="small"
                    >
                        Пометить на удаление
                    </Button>
                )}
        </>
    );
};

export default MarkForDeletion;
