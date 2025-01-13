import { Button } from 'antd';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import { ITimelineMain } from './interfaces';

const CancelMarkForDeletion: React.FC<ITimelineMain> = ({ item }) => {
    const { id, roles } = useAppSelector((store) => store.auth);
    const [cancel] = tableAddingDataApi.useCancelMutation();

    const handleCancelCandidate = (delTableAddingDataId: number) => {
        cancel({ id: delTableAddingDataId });
    };

    if (item.delTableAddingData === null) return null;

    return (
        <>
            {checkRole(roles, [RoleString.MASTER, RoleString.WORKER]) &&
            item.userId === id &&
            item.delTableAddingData &&
            item.deletedAt === null ? (
                <Button
                    onClick={() =>
                        handleCancelCandidate(
                            item.delTableAddingData
                                ? item.delTableAddingData.id
                                : 0
                        )
                    }
                    size="small"
                >
                    Отменить удаление
                </Button>
            ) : null}
        </>
    );
};

export default CancelMarkForDeletion;
