import React from 'react';
import { useParams } from 'react-router';
import { tableAddingDataApi } from 'src/shared/api';

interface IDrawerTimelineNameWorkMain {
    nameListId: number;
    nameWorkId: number;
}

const DrawerTimelineNameWorkMain: React.FC<IDrawerTimelineNameWorkMain> = ({
    nameListId,
    nameWorkId,
}) => {
    const { id: scopeWorkId } = useParams<{ id: string }>();
    const { data: dataTimeline, refetch: refetchTimeline } =
        tableAddingDataApi.useHistoryForNameQuery({
            nameListId,
            nameWorkId,
            scopeWorkId: Number(scopeWorkId),
        });

    const [handleRemove] = tableAddingDataApi.useRemoveMutation();
    const [handleRecovery] = tableAddingDataApi.useRecoveryMutation();
    const [handleCandidateDel] =
        tableAddingDataApi.useCreateCandidateDelMutation();
    const [handleConfirm] = tableAddingDataApi.useConfirmMutation();

    // const handleClickRemove = (id: number) => {
    //     handleRemove({ id: id }).then(() => refetch());
    //     handleClickQuery();
    //     // refetch();
    // };
    // const handleClickRecovery = (id: number) => {
    //     handleRecovery({ id: id });
    //     handleClickQuery();
    //     refetch();
    // };

    // const handleClickCandidate = (
    //     userId: number | null,
    //     tableAddingDataId: number
    // ) => {
    //     handleCandidateDel({
    //         userId: userId !== null ? userId : 0,
    //         tableAddingDataId,
    //     }).then(() => refetch());
    //     handleClickQuery();
    //     // refetch();
    // };

    // const handleClickConfirm = (id: number, idDelCandidate: number) => {
    //     handleConfirm({ id, idDelCandidate });
    //     handleClickQuery();
    //     refetch();
    // };

    // if (isLoading) {
    //     return <Spin />;
    // }

    return (
        <>
            Hello
            {/* <Drawer title={name} onClose={onClose} open={open}>
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
            </Drawer> */}
        </>
    );
};

export default DrawerTimelineNameWorkMain;
