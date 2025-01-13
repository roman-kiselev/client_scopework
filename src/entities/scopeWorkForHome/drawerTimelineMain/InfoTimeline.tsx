import { QuestionCircleFilled } from '@ant-design/icons';
import React from 'react';

import { useAppSelector } from 'src/shared/hooks';
import { IUserWithDescriptionDto } from 'src/shared/interfaces';
import { getDate, getItem } from 'src/shared/utils';
import { IInfoTimeline } from './interfaces';

const InfoTimeline: React.FC<IInfoTimeline> = ({ item, unitName }) => {
    const { listUsers } = useAppSelector((store) => store.users);

    return (
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
                - {item.quntity} {unitName || `ед.`} - (
                {getDate(item.createdAt)})
                {item.delCandidate !== null && (
                    <QuestionCircleFilled
                        style={{
                            color: 'red',
                        }}
                    />
                )}
            </p>{' '}
        </>
    );
};

export default InfoTimeline;
