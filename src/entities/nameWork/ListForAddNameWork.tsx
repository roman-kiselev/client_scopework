import { Button, Col, Form, Row, Select, Space, Spin, message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    INameListWork,
    IOneItemForListNameWorkEdit,
} from 'src/shared/interfaces/models';
import * as XLSX from 'xlsx';
import {
    listNameWorkApi,
    nameWorkApi,
    typeWorkApi,
    unitsApi,
} from '../../shared/api';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import {
    IOneItemForListNameWork,
    ITypeWork,
    IUnit,
} from '../../shared/interfaces';
import {
    resetForOneItem,
    setNameAndDescription,
    setSelectedTypeWork,
} from '../../shared/models';
import { ModelArrStandart } from '../../shared/utils';
import { EditTableForNewList } from './table';

interface INameWorkFromExcel {
    __rowNum__: number;
    name: string;
    quntity: number;
    typeWork: string;
    unit: string;
}

const key = 'updatable';
const keyTwo = 'save';
const openMessageEdit = (
    messageApi: MessageInstance,
    err: boolean,
    key: string
) => {
    messageApi.open({
        key,
        type: 'loading',
        content: 'Подождите...',
    });
    if (!err) {
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Сохранено',
                duration: 2,
            });
        }, 2000);
    } else {
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Не удалось сохранить',
                duration: 2,
            });
        }, 2000);
    }
};
const openMessageSave = (
    messageApi: MessageInstance,
    err: boolean,
    id: number,
    keyTwo: string
) => {
    messageApi.open({
        key: keyTwo,
        type: 'loading',
        content: 'Подождите...',
    });
    if (!err) {
        setTimeout(() => {
            messageApi.open({
                key: keyTwo,
                type: 'success',
                content: (
                    <Link to={`/admin/object/list/listItem/${id}`}>
                        Перейти к списку
                    </Link>
                ),
                duration: 6,
            });
        }, 2000);
    } else {
        setTimeout(() => {
            messageApi.open({
                key: keyTwo,
                type: 'error',
                content: 'Не удалось сохранить',
                duration: 2,
            });
        }, 2000);
    }
};

const sumQuantity = (arr: any[]) => {
    const result = arr.reduce((acc, currentItem) => {
        const existingItem = acc.find((item: any) => {
            const itemName: string = item.name.replace(/\s/g, '').toLowerCase();
            const currentItemName: string = currentItem.name
                .replace(/\s/g, '')
                .toLowerCase();
            return itemName === currentItemName;
        });

        if (existingItem) {
            existingItem.quntity += currentItem.quntity;
        } else {
            acc.push({ ...currentItem });
        }

        return acc;
    }, []);

    return result;
};

// Начало основного компонента
const ListForAddNameWork = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [form] = Form.useForm();

    const { data: dataUnits } = unitsApi.useGetAllUnitsQuery();
    const { data: dataTypeWork } = typeWorkApi.useGetAllShortQuery();
    // const { data: dataTypeWorks } = typeWorkApi.useGetAllShortQuery();
    const [createList, { isError: isErrorSave }] =
        listNameWorkApi.useCreateListMutation();
    const [editList] = listNameWorkApi.useEditListMutation();
    const [createNameWork, { isLoading: isLoadingCreateNameWork }] =
        nameWorkApi.useCreateExcelForListMutation();
    const arrUnit = new ModelArrStandart<IUnit>(dataUnits ?? []);
    const arrTypeWork = new ModelArrStandart<ITypeWork>(dataTypeWork ?? []);

    const [messageApi, contextHolder] = message.useMessage();
    const [valueOption, setValueOption] = useState(0);

    const { idNumber, typeWorkId, name, description, list } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );
    const { selectedTypeWork } = useAppSelector((store) => store.nameWorkList);

    const dataForSave: IOneItemForListNameWork = {
        name,
        description,
        typeWorkId,
        list,
    };
    const dataForEdit: IOneItemForListNameWorkEdit = {
        id: +id!,
        idNumber,
        name,
        description,
        typeWorkId,
        list,
    };

    const { isLoading: isLoadingNameWork } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId:
                idNumber && typeWorkId !== null ? typeWorkId : selectedTypeWork,
        });

    if (isLoadingNameWork) <Spin />;
    const dataOption = dataTypeWork?.map((type) => {
        const { id, name } = type;
        return { value: id, label: name };
    });
    dataOption?.push({ value: 0, label: 'Выберите тип' });

    const handleSelectChange = (value: number) => {
        dispatch(setSelectedTypeWork(value));
        setValueOption(value);
    };

    const { isError: isErrorMain } = useAppSelector(
        (store) => store.nameWorkList
    );

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData: INameWorkFromExcel[] =
                XLSX.utils.sheet_to_json(sheet);

            const excelDataForAdd = excelData.map((item) => {
                // interface INameWorkFromExcel {
                //     __rowNum__: number;
                //     name: string;
                //     quntity: number;
                //     typeWork: string;
                //     unit: string;
                // }
                return {
                    name: item.name,
                    typeWorkId: arrTypeWork.getField<string, number>(
                        'name',
                        'id',
                        item.typeWork
                    ),
                    unitId: arrUnit.getField<string, number>(
                        'name',
                        'id',
                        item.unit
                    ),
                    quntity: item.quntity,
                    row: item.__rowNum__,
                };
            });
            handleSelectChange(excelDataForAdd[0].typeWorkId);
            const dataEditQuantity = sumQuantity(excelDataForAdd);
            await createNameWork(dataEditQuantity);
        };

        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        if (idNumber !== null && idNumber !== undefined) {
            editList(dataForEdit);
        }
    }, []);
    const handleFirstSave = async () => {
        const res = await createList(dataForSave);
        const { data } = res as { data: INameListWork };
        dispatch(resetForOneItem());
        handleSelectChange(0);
        dispatch(setNameAndDescription({ name: '', description: '' }));
        openMessageSave(messageApi, isErrorSave, data.id ?? 0, keyTwo);
    };

    const handleEdit = async () => {
        if (id) {
            editList(dataForEdit);
            openMessageEdit(messageApi, isErrorMain, key);
            handleSelectChange(0);
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ overflow: 'auto', height: '90vh' }}>
                <Row style={{ margin: '10px 0' }}>
                    <Col style={{ marginRight: 10 }}>
                        {idNumber ? (
                            <Button type="primary" onClick={handleEdit}>
                                Сохранить изменения
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                disabled={valueOption === 0 ? true : false}
                                onClick={handleFirstSave}
                            >
                                Сохранить
                            </Button>
                        )}
                    </Col>
                    <Col style={{ boxSizing: 'border-box', marginRight: 10 }}>
                        <Select
                            defaultValue={idNumber ? typeWorkId : 0}
                            value={valueOption || typeWorkId}
                            style={{ width: 180 }}
                            disabled={
                                idNumber || list?.length >= 1 ? true : false
                            }
                            options={dataOption}
                            onChange={handleSelectChange}
                        />
                    </Col>
                    <Col>
                        <Space>
                            {isLoadingCreateNameWork ? (
                                <Spin />
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        onChange={handleFileUpload}
                                    />
                                </>
                            )}
                        </Space>
                    </Col>
                </Row>
                <EditTableForNewList form={form} />
            </div>
        </>
    );
};

export default ListForAddNameWork;
