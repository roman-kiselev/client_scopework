import { QuestionCircleFilled } from '@ant-design/icons';
import { Button, Drawer, Space, Spin, Timeline } from 'antd';
import { tableAddingDataApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppSelector } from 'src/shared/hooks';
import { IUnit, IUserWithDescriptionDto } from 'src/shared/interfaces';
import { IDataGetHistoryForNameWorkId } from 'src/shared/interfaces/api';
import { checkRole, getDate, getItem } from 'src/shared/utils';

interface IDrawerTimelineNameWork {
    name: string;
    onClose: () => void;
    open: boolean;
    dataTimeline: IDataGetHistoryForNameWorkId[];
    dataUnit: IUnit[];
    unitName: string;
    roles: string[];
    nameListId: number;
    nameWorkId: number;
    scopeWorkId: number;
    handleClickQuery: () => void;
    refetch: any;
    isLoading: boolean;
    unitId: number;
}

const DrawerTimelineNameWork: React.FC<IDrawerTimelineNameWork> = ({
    name,
    onClose,
    open,
    dataTimeline,
    dataUnit,
    unitName,
    roles,
    handleClickQuery,
    refetch,
    isLoading,
}) => {
    const { id } = useAppSelector((store) => store.auth);
    const { listUsers } = useAppSelector((store) => store.users);

    const [handleRemove] = tableAddingDataApi.useRemoveMutation();
    const [handleRecovery] = tableAddingDataApi.useRecoveryMutation();
    const [handleCandidateDel] =
        tableAddingDataApi.useCreateCandidateDelMutation();
    const [handleConfirm] = tableAddingDataApi.useConfirmMutation();

    const handleClickRemove = (id: number) => {
        handleRemove({ id: id }).then(() => refetch());
        handleClickQuery();
        // refetch();
    };
    /**
     * Handles the recovery of a removed data.
     * @param {number} id - The id of the data to recover.
     */
    const handleClickRecovery = (id: number) => {
        handleRecovery({ id: id });
        handleClickQuery();
        refetch();
    };

    const handleClickCandidate = (
        userId: number | null,
        tableAddingDataId: number
    ) => {
        handleCandidateDel({
            userId: userId !== null ? userId : 0,
            tableAddingDataId,
        }).then(() => refetch());
        handleClickQuery();
        // refetch();
    };

    const handleClickConfirm = (id: number, idDelCandidate: number) => {
        handleConfirm({ id, idDelCandidate });
        handleClickQuery();
        refetch();
    };

    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            <Drawer title={name} onClose={onClose} open={open}>
                <Timeline
                    items={dataTimeline.map((item) => ({
                        children: (
                            <>
                                <p
                                    style={
                                        item.deletedAt === null
                                            ? { color: 'black' }
                                            : { color: 'grey' }
                                    }
                                >
                                    {item.id}.{' '}
                                    {
                                        getItem<IUserWithDescriptionDto>(
                                            listUsers,
                                            item.userId,
                                            'id'
                                        )?.description.firstname
                                    }{' '}
                                    {
                                        getItem<IUserWithDescriptionDto>(
                                            listUsers,
                                            item.userId,
                                            'id'
                                        )?.description.lastname
                                    }{' '}
                                    - {item.quntity} {unitName}- (
                                    {getDate(item.createdAt)})
                                    {item.delCandidate !== null && (
                                        <QuestionCircleFilled
                                            style={{
                                                color: 'red',
                                            }}
                                        />
                                    )}
                                </p>{' '}
                                {checkRole(roles, [
                                    RoleString.MASTER,
                                    RoleString.WORKER,
                                ]) &&
                                    item.delCandidate === null &&
                                    item.deletedAt === null && (
                                        <Button
                                            onClick={() =>
                                                handleClickCandidate(
                                                    id,
                                                    item.id
                                                )
                                            }
                                            size="small"
                                        >
                                            Пометить на удаление
                                        </Button>
                                    )}
                                <Space>
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt === null && (
                                            <Button
                                                size="small"
                                                danger
                                                type="primary"
                                                onClick={() =>
                                                    handleClickRemove(item.id)
                                                }
                                            >
                                                Удалить
                                            </Button>
                                        )}
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt === null &&
                                        item.id !== null &&
                                        item.delCandidate !== null && (
                                            <Button
                                                onClick={() => {
                                                    if (
                                                        item.id !== null &&
                                                        item.delCandidate !==
                                                            null
                                                    ) {
                                                        handleClickConfirm(
                                                            item.id,
                                                            item.delCandidate
                                                        );
                                                    }
                                                }}
                                                size="small"
                                                type="primary"
                                            >
                                                Подтвердить удаление
                                            </Button>
                                        )}
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt !== null && (
                                            <Button
                                                size="small"
                                                style={{
                                                    backgroundColor: 'yellow',
                                                }}
                                                onClick={() =>
                                                    handleClickRecovery(item.id)
                                                }
                                            >
                                                Восстановить
                                            </Button>
                                        )}
                                </Space>
                            </>
                        ),
                    }))}
                />
            </Drawer>
        </>
    );
};

export default DrawerTimelineNameWork;
