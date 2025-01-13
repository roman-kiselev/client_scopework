import { Drawer, Row, Space, Timeline } from 'antd';
import { useParams } from 'react-router';
import { tableAddingDataApi } from 'src/shared/api';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { closeDrawerTimeline } from 'src/shared/models/scopeWork';
import CancelMarkForDeletion from './drawerTimelineMain/CancelMarkForDeletion';
import ConfirmDeletion from './drawerTimelineMain/ConfirmDeletion';
import DelItemTimeline from './drawerTimelineMain/DelItemTimeline';
import InfoTimeline from './drawerTimelineMain/InfoTimeline';
import MarkForDeletion from './drawerTimelineMain/MarkForDeletion';
import RecoverItemTimeline from './drawerTimelineMain/RecoverItemTimeline';

const DrawerTimelineNameWorkMain = () => {
    const dispatch = useAppDispatch();
    const { id: scopeWorkId } = useParams();
    const { stateDrawerTimeline, nameListId, nameWorkId, name, unitName } =
        useAppSelector(
            (store) => store.scopeWork.helpersScopeWork.drawerTimeline
        );

    const { data: dataTimeline, refetch: refetchTimeline } =
        tableAddingDataApi.useHistoryForNameQuery(
            {
                nameListId: !nameListId ? 0 : nameListId,
                nameWorkId: !nameWorkId ? 0 : nameWorkId,
                scopeWorkId: Number(scopeWorkId),
            },
            {
                skip:
                    !stateDrawerTimeline ||
                    nameListId === null ||
                    nameWorkId === null,
            }
        );

    const handleClick = () => {
        dispatch(closeDrawerTimeline(false));
    };

    return (
        <Drawer
            title={'История изменений'}
            onClose={handleClick}
            open={stateDrawerTimeline}
        >
            <>
                <Row style={{ marginBottom: '10px' }}>
                    <h4>{name}</h4>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    {dataTimeline ? (
                        <Timeline
                            items={dataTimeline.map((item) => ({
                                children: (
                                    <>
                                        <InfoTimeline
                                            item={item}
                                            unitName={unitName}
                                        />
                                        <MarkForDeletion
                                            item={item}
                                            refetchTimeline={refetchTimeline}
                                        />
                                        <CancelMarkForDeletion item={item} />
                                        <Space>
                                            <DelItemTimeline item={item} />
                                            <ConfirmDeletion item={item} />
                                            <RecoverItemTimeline item={item} />
                                        </Space>
                                    </>
                                ),
                            }))}
                        />
                    ) : null}
                </Row>
            </>
        </Drawer>
    );
};

export default DrawerTimelineNameWorkMain;
