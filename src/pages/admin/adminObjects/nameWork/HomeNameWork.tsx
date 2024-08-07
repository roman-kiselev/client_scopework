import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
const HomeNameWork = () => {
    return (
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
            <Row>
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <Link to="/">Домой</Link>
                                    </>
                                ),
                            },

                            {
                                title: 'Главная (Списки)',
                            },
                        ]}
                    />
                </Row>
            </Row>

            <Row>
                <Col>
                    <Card
                        size="small"
                        title="Создать список"
                        extra={<Link to="addNewList">Перейти</Link>}
                        style={{ width: 300 }}
                    >
                        <p>Быстрое добавление</p>
                    </Card>
                </Col>
                <Col>
                    <Card
                        size="small"
                        title="Общий список"
                        extra={<Link to="listItem">Перейти</Link>}
                        style={{ width: 300 }}
                    >
                        <p>Все списки</p>
                    </Card>
                </Col>
                {/* <Col>
                <Card
                    size="small"
                    title="Загрузить из файла"
                    extra={<h6>Перейти</h6>}
                    style={{ width: 300, backgroundColor: "lightgrey" }}
                >
                    <p>В разработке</p>
                </Card>
            </Col>
            <Col>
                <Card
                    size="small"
                    title="Статистика"
                    extra={<h6>Перейти</h6>}
                    style={{ width: 300, backgroundColor: "lightgrey" }}
                >
                    <p>В разработке</p>
                </Card>
            </Col> */}
            </Row>
        </Row>
    );
};

export default HomeNameWork;
