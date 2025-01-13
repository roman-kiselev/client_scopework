import { Col, Row } from 'antd';
import React from 'react';
import ColumnNameHandlers from './columnName/ColumnNameHandlers';
import ColumnNameProgress from './columnName/ColumnNameProgress';
import { IColumnNameQuickProps } from './interfaces';

const ColumnNameQuick: React.FC<IColumnNameQuickProps> = ({
    name,
    nameListId,
    nameWorkId,
    percent,
    unitName,
    isLoading,
    remainderQuntity,
    isDel,
    verfulfilment,
}) => {
    // console.log({
    //     name: name,
    //     nameListId: nameListId,
    //     nameWorkId: nameWorkId,
    //     percent: percent,
    //     unitName: unitName,
    //     isLoading: isLoading,
    //     remainderQuntity: remainderQuntity,
    //     isDel: isDel,
    //     verfulfilment: verfulfilment,
    // });
    return (
        <>
            <Col>
                <p>{name}</p>
            </Col>

            <Row>
                <ColumnNameHandlers
                    isDel={isDel}
                    name={name}
                    nameListId={nameListId}
                    nameWorkId={nameWorkId}
                    unitName={unitName}
                    remainderQuntity={remainderQuntity}
                    verfulfilment={verfulfilment}
                />
            </Row>

            <ColumnNameProgress isLoading={isLoading} percent={percent} />
        </>
    );
};

export default ColumnNameQuick;
