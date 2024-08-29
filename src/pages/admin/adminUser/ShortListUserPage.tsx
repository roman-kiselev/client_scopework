import { Col, Divider, List, Row, Space } from "antd";
import { newUserApi } from "src/shared/api";

const ShortListUserPage = () => {
    const {data} = newUserApi.useGetAllUserListQuery();

    return (
        <List
            size="small"
            // header={<HeaderCreateInvite />}
            //footer={<div>Footer</div>}
            bordered
            // dataSource={data}
            // renderItem={(item) => <List.Item>{item}</List.Item>}
        >
            {data?.map((item, index) => (
                <List.Item key={item.id}>
                    <Row>
                        <Space>
                            <Col>{index + 1}.</Col>
                            <Col>
                                Email: <a>{item.email}</a>
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                <p>
                                    {`${item.description.firstname} ${item.description.lastname}`}
                                </p>
                            </Col>

                            {/* <Divider type="vertical" />
                            <Col>
                                <Tag>
                                    {item.banned ? 'Заблокирован' : 'Активен'}
                                </Tag>
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                <Button>Заблокировать</Button>
                            </Col> */}
                            <Divider type="vertical" />
                            <Col>
                                
                            </Col>
                            <Divider type="vertical" />
                        </Space>
                    </Row>
                </List.Item>
            ))}
        </List>
    );
};

export default ShortListUserPage;
