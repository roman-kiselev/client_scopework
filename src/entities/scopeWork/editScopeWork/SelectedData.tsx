import { Button, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import {
    newUserApi,
    objectsApi,
    scopeWorkApi,
    typeWorkApi,
} from '../../../shared/api';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import {
    IObjectCreateResponse,
    ITypeWork,
    IUserWithDescriptionDto,
} from '../../../shared/interfaces';
import {
    editUsers,
    selectedTypeWorkIdInScopeWork,
} from '../../../shared/models';
import { SelectObject, SelectTypeWork, SelectUser } from '../../../shared/ui';

const getOptionsObjectUsersTypeWork = (
    arrUsers: IUserWithDescriptionDto[],
    arrTypeWork: ITypeWork[],
    arrObject: IObjectCreateResponse[]
) => {
    const listUsersOption = arrUsers.map((item) => {
        const { id: userId } = item;
        const { firstname, lastname } = item.description;

        const label = `${lastname ?? ''} ${Array.from(firstname)[0] ?? ''}.`;
        return {
            value: userId.toString(),
            label,
        };
    });
    const listTypeWorkOption = arrTypeWork.map((item) => {
        const { id, name } = item;
        return {
            label: name,
            value: id,
        };
    });
    const listObjectOption = arrObject.map((item) => {
        const { id, name } = item;
        return {
            label: name,
            value: id,
        };
    });

    return {
        listObjectOption,
        listTypeWorkOption,
        listUsersOption,
    };
};

const SelectedData = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { users } = useAppSelector(
        (store) => store.scopeWork.selectedScopeWorkById
    );
    const [editScopeWork] = scopeWorkApi.useEditScopeWorkMutation();

    const { isLoading: isLoadingOneScopeWork, data: dataScopeWork } =
        scopeWorkApi.useGetOneByIdScopeWorkQuery({
            id: Number(id),
        });

    const { data: dataObject } = objectsApi.useGetAllObjectsQuery();

    const { data: dataUsers, isLoading: isLoadingUsers } =
        newUserApi.useGetAllUserListQuery();

    const { data: dataTypeWork, isLoading: isLoadingTypeWork } =
        typeWorkApi.useGetAllTypeWorkQuery();

    const { isLoading } = useAppSelector((store) => store.scopeWork);

    const {
        object,
        typeWork,
        usersIds,
        listNameWork,
        id: idScopeWork,
    } = useAppSelector((store) => store.scopeWork.selectedScopeWorkById);

    useEffect(() => {
        dispatch(selectedTypeWorkIdInScopeWork(typeWork?.id));
    }, [typeWork]);
    if (
        isLoadingOneScopeWork ||
        isLoading ||
        isLoadingUsers ||
        isLoadingTypeWork
    ) {
        return <Spin />;
    }

    const typeWorkName = typeWork?.name ?? '';
    const objectName = object?.name ?? '';

    const namesUser = usersIds?.map((user) => {
        const findedUser = dataUsers?.find((item) => item.id === user.userId);
        return findedUser?.id.toString() ?? '';
    });

    // Изменяем пользователей
    const handleChangeUsers = (arr: string[]) => {
        if (dataUsers) {
            dispatch(
                editUsers({
                    listUser: dataUsers,
                    listSelected: arr,
                })
            );
        }
    };
    const { listObjectOption, listTypeWorkOption, listUsersOption } =
        getOptionsObjectUsersTypeWork(
            dataUsers ?? [],
            dataTypeWork ?? [],
            dataObject ?? []
        );

    const handleEditScopeWork = () => {
        const listUsers = users.map((user) => user.id);

        const arrListId = listNameWork.map((item) => item.id);

        if (idScopeWork && object && typeWork) {
            editScopeWork({
                scopeWorkId: idScopeWork,
                listNameWork: arrListId,
                users:
                    listUsers.length === 0
                        ? usersIds.map((item) => item.userId)
                        : listUsers,
                objectId: object?.id,
                typeWorkId: typeWork.id,
            });
        }
    };

    return (
        <Row
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
            }}
        >
            <h4>Объём работ №{idScopeWork}</h4>
            <SelectTypeWork
                handleChange={() => console.log('typeWork')}
                defaultValue={typeWorkName}
                disabled={true}
                options={listTypeWorkOption}
            />
            <SelectObject
                handleChange={() => console.log('objects')}
                defaultValue={objectName}
                disabled={true}
                options={listObjectOption}
            />
            <SelectUser
                defaultValue={namesUser}
                handleChange={handleChangeUsers}
                options={listUsersOption}
            />
            <Button
                onClick={handleEditScopeWork}
                // disabled={
                //     listNameWork.length === 0 ||
                //     users.length === 0 ||
                //     typeWork === null ||
                //     object === null
                // }
                type="primary"
            >
                Сохранить изменения
            </Button>
        </Row>
    );
};

export default SelectedData;
