import { Col, Radio, RadioChangeEvent, Row, Select, Switch } from 'antd';
import React from 'react';
import { objectsApi, typeWorkApi } from 'src/shared/api';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import {
    setCandidateForDel,
    setObjectName,
    setOnlyCompleted,
    setOnlyNotCompleted,
    setTypeWorkName,
} from 'src/shared/models/scopeWork';

interface IFilterForScopeWork {
    refetch: () => void;
}

export class GetShortQueryDto {
    onlyCompleted?: boolean;
    onlyNotCompleted?: boolean;
    objectName?: string;
    typeWorkName?: string;
}

const options = [
    { label: 'Все', value: 'all' },
    { label: 'Завершенные', value: 'onlyCompleted' },
    { label: 'Не завершенные', value: 'onlyNotCompleted' },
];

function createOptions(
    data: { id: number; name: string }[] | [],
    defaultLabel: string
) {
    const options = [
        {
            label: defaultLabel,
            value: 0,
        },
    ];

    if (data.length > 0) {
        data?.forEach(({ id, name }) => {
            options.push({
                label: name,
                value: id,
            });
        });

        return options;
    }

    return options;
}

const FilterForScopeWork: React.FC<IFilterForScopeWork> = ({ refetch }) => {
    const dispatch = useAppDispatch();
    const { data: dataObjects } = objectsApi.useGetAllShortDataQuery();
    const { data: dataTypeWorks } = typeWorkApi.useGetAllShortQuery();
    const { isDel } = useAppSelector(
        (store) => store.scopeWork.filteringOptions.home
    );

    const optionsObjects = createOptions(dataObjects ?? [], 'Выбор объекта');
    const optionsTypeWorks = createOptions(
        dataTypeWorks ?? [],
        'Выбор типа работ'
    );

    const handleChange = (value: string) => {
        switch (value) {
            case 'onlyCompleted':
                dispatch(setOnlyCompleted(true));
                dispatch(setOnlyNotCompleted(false));
                break;
            case 'onlyNotCompleted':
                dispatch(setOnlyNotCompleted(true));
                dispatch(setOnlyCompleted(false));

                break;
            case 'all':
                dispatch(setOnlyNotCompleted(false));
                dispatch(setOnlyCompleted(false));
                break;
            default:
                break;
        }
    };
    const handleChangeSwitch = (checked: boolean) => {
        dispatch(setCandidateForDel(!isDel));
        // refetch();
    };

    const handleSelect = (value: string) => {
        const result = options.find((item) => item.value === value);
        if (result) {
            dispatch(setObjectName(result.label));
        } else {
            dispatch(setObjectName(''));
        }
    };

    return (
        <Row style={{ marginBottom: 10 }}>
            <Col>
                <Radio.Group
                    options={options}
                    defaultValue="onlyNotCompleted"
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) =>
                        handleChange(e.target.value)
                    }
                />
            </Col>
            <Col>
                <Select
                    showSearch
                    placeholder="Выбор объекта"
                    // onChange={(value, option) => {
                    //     dispatch(
                    //         setObjectName(
                    //             !Array.isArray(option)
                    //                 ? option.label
                    //                 : option[0].label
                    //         )
                    //     );
                    // }}
                    onChange={handleSelect}
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={optionsObjects ?? []}
                />
            </Col>
            <Col>
                <Select
                    showSearch
                    placeholder="Выбор типа работ"
                    onChange={(value, option) => {
                        dispatch(
                            setTypeWorkName(
                                !Array.isArray(option)
                                    ? option.label
                                    : option[0].label
                            )
                        );
                    }}
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={optionsTypeWorks ?? []}
                />
            </Col>
            <Col>
                <Switch
                    checked={isDel}
                    checkedChildren="Все"
                    unCheckedChildren="Для удаления"
                    onChange={(checked) => handleChangeSwitch(checked)}
                />
            </Col>
        </Row>
    );
};

export default FilterForScopeWork;
