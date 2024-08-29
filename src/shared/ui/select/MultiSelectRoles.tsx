import type { SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import { newRoleApi, newUserApi } from '../../api';
import { useAppSelector } from '../../hooks';

const MultiSelectRoles = () => {
    // const { data: allRoles, isLoading: isLoadingRoles } =
    //     roleApi.useGetAllRolesQuery();
    const { data: allRoles, isLoading: isLoadingRoles } =
        newRoleApi.useGetAllRolesQuery();
    const [changeRole] = newUserApi.useChangeRolesMutation();
    const { oneUserWithDescription, isLoading: isLoadingStore } =
        useAppSelector((store) => store.users);

    const options: SelectProps['options'] = allRoles?.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    // const [defaultState, setDefaultState] = useState(
    //     oneUserWithDescription !== null
    //         ? oneUserWithDescription?.roles.map((role) => role.name)
    //         : []
    // );
    // console.log(defaultState);

    const handleChange = (value: string[]) => {
        const roles = value.map((item) => {
            const findedItem = allRoles?.find((role) => role.name === item);
            if (findedItem) {
                return findedItem.id;
            }
            return 0;
        });
        if (oneUserWithDescription?.id) {
            changeRole({
                userId: oneUserWithDescription.id,
                roles: roles,
            });
        }
    };

    if (isLoadingStore || isLoadingRoles) {
        return <Spin />;
    }

    const dataRoles =
        oneUserWithDescription !== null && oneUserWithDescription.roles
            ? oneUserWithDescription.roles.map((role) => role.name)
            : [];
    return (
        <>
            {allRoles ? (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выбор роли"
                    defaultValue={dataRoles}
                    onChange={handleChange}
                    options={options}
                />
            ) : null}
        </>
    );
};

export default MultiSelectRoles;
