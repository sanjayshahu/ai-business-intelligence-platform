// // components/AntDesignComponent.tsx
// import React, { useState } from 'react';
// import {
//   Layout,
//   Menu,
//   Card,
//   Button,
//   Form,
//   Input,
//   Switch,
//   Slider,
//   Rate,
//   Progress,
//   Tag,
//   Avatar,
//   Badge,
//   Divider,
//   Row,
//   Col,
//   Statistic,
//   Timeline,
//   List,
//   Modal,
//   message,
//   Space,
//   Typography,
// } from 'antd';
// import {
//   UserOutlined,
//   NotificationOutlined,
//   ShoppingCartOutlined,
//   HeartOutlined,
//   StarOutlined,
//   LikeOutlined,
//   MessageOutlined,
// } from '@ant-design/icons';

// const { Header, Content, Sider } = Layout;
// const { Title, Paragraph } = Typography;
// const { TextArea } = Input;

// const AntDesignComponent: React.FC = () => {
//   const [form] = Form.useForm();
//   const [darkMode, setDarkMode] = useState(false);
//   const [rating, setRating] = useState(3);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     message.success('Operation completed successfully!');
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     message.info('Operation cancelled');
//   };

//   const onFinish = (values: any) => {
//     console.log('Form values:', values);
//     message.success('Form submitted successfully!');
//   };

//   const data = [
//     {
//       title: 'Ant Design Title 1',
//       description: 'Enterprise-class UI design language',
//     },
//     {
//       title: 'Ant Design Title 2',
//       description: 'A set of high-quality React components',
//     },
//     {
//       title: 'Ant Design Title 3',
//       description: 'Designed for enterprise-level products',
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header style={{ padding: '0 20px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
//           <Title level={3} style={{ color: 'white', margin: 0 }}>
//             Ant Design Demo
//           </Title>
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={['1']}
//             style={{ flex: 1, justifyContent: 'flex-end' }}
//           >
//             <Menu.Item key="1" icon={<UserOutlined />}>
//               Dashboard
//             </Menu.Item>
//             <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
//               Products
//             </Menu.Item>
//             <Menu.Item key="3" icon={<NotificationOutlined />}>
//               Notifications
//               <Badge count={5} style={{ marginLeft: 8 }} />
//             </Menu.Item>
//           </Menu>
//         </div>
//       </Header>

//       <Layout>
//         <Sider width={250} theme="light">
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             style={{ height: '100%', borderRight: 0 }}
//           >
//             <Menu.Item key="1" icon={<HeartOutlined />}>
//               Favorites
//             </Menu.Item>
//             <Menu.Item key="2" icon={<StarOutlined />}>
//               Starred
//             </Menu.Item>
//             <Menu.Item key="3" icon={<NotificationOutlined />}>
//               Alerts
//             </Menu.Item>
//           </Menu>
//         </Sider>

//         <Layout style={{ padding: '24px' }}>
//           <Content>
//             {/* Statistics Row */}
//             <Row gutter={16} style={{ marginBottom: 24 }}>
//               <Col span={6}>
//                 <Card>
//                   <Statistic
//                     title="Active Users"
//                     value={1128}
//                     prefix={<UserOutlined />}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card>
//                   <Statistic
//                     title="Feedback"
//                     value={93}
//                     suffix="/ 100"
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card>
//                   <Statistic
//                     title="Sales"
//                     value={112893}
//                     precision={2}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card>
//                   <Statistic
//                     title="Growth Rate"
//                     value={9.3}
//                     precision={2}
//                     suffix="%"
//                   />
//                 </Card>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               {/* Left Column */}
//               <Col span={12}>
//                 <Card 
//                   title="Interactive Controls" 
//                   extra={<Tag color="blue">New</Tag>}
//                   style={{ marginBottom: 16 }}
//                 >
//                   <Space direction="vertical" style={{ width: '100%' }} size="large">
//                     <div>
//                       <Paragraph>Dark Mode</Paragraph>
//                       <Switch
//                         checked={darkMode}
//                         onChange={setDarkMode}
//                         checkedChildren="On"
//                         unCheckedChildren="Off"
//                       />
//                     </div>

//                     <div>
//                       <Paragraph>Rating: {rating}</Paragraph>
//                       <Rate value={rating} onChange={setRating} />
//                     </div>

//                     <div>
//                       <Paragraph>Progress</Paragraph>
//                       <Progress percent={75} status="active" />
//                     </div>

//                     <Button type="primary" onClick={showModal}>
//                       Open Modal
//                     </Button>
//                   </Space>
//                 </Card>

//                 <Card title="Timeline">
//                   <Timeline>
//                     <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
//                     <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
//                     <Timeline.Item color="red">
//                       <p>Technical testing 1</p>
//                       <p>Technical testing 2</p>
//                     </Timeline.Item>
//                     <Timeline.Item color="gray">
//                       <p>Technical testing 3</p>
//                       <p>Technical testing 4</p>
//                     </Timeline.Item>
//                   </Timeline>
//                 </Card>
//               </Col>

//               {/* Right Column */}
//               <Col span={12}>
//                 <Card title="Form Example">
//                   <Form
//                     form={form}
//                     layout="vertical"
//                     onFinish={onFinish}
//                   >
//                     <Form.Item
//                       label="Email Address"
//                       name="email"
//                       rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                       <Input prefix={<UserOutlined />} placeholder="Enter your email" />
//                     </Form.Item>

//                     <Form.Item
//                       label="Message"
//                       name="message"
//                       rules={[{ required: true, message: 'Please input your message!' }]}
//                     >
//                       <TextArea rows={4} placeholder="Enter your message" />
//                     </Form.Item>

//                     <Form.Item>
//                       <Button type="primary" htmlType="submit" icon={<LikeOutlined />}>
//                         Submit Form
//                       </Button>
//                     </Form.Item>
//                   </Form>
//                 </Card>

//                 <Card title="Data List" style={{ marginTop: 16 }}>
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={data}
//                     renderItem={item => (
//                       <List.Item
//                         actions={[
//                           <Button key="like" icon={<LikeOutlined />} type="text">Like</Button>,
//                           <Button key="message" icon={<MessageOutlined />} type="text">Message</Button>,
//                         ]}
//                       >
//                         <List.Item.Meta
//                           avatar={<Avatar src="https://via.placeholder.com/40" />}
//                           title={item.title}
//                           description={item.description}
//                         />
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </Content>
//         </Layout>
//       </Layout>

//       {/* Modal */}
//       <Modal
//         title="Ant Design Modal"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Confirm"
//         cancelText="Cancel"
//       >
//         <Paragraph>
//           This is a modal dialog from Ant Design with proper focus management
//           and accessibility features.
//         </Paragraph>
//         <Divider />
//         <Paragraph>
//           Enterprise-level UI design system with comprehensive components.
//         </Paragraph>
//       </Modal>
//     </Layout>
//   );
// };

// export default AntDesignComponent;
export default {}