import { ArrowLeftOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './form_submit_user.module.scss';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from '../../../../contexts/user_context';

const Form_Submit_User = () => {
    const { state, handleSubmitForm, getUserById } = useContext(UserContext) as UserContextType;
    const [form] = Form.useForm();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserById(+id);
        }
    }, [id]);

    useEffect(() => {
        if (id && state.users.length) {
            const user = state.users.find(u => u.id === +id)
            if (user) {
                form.setFieldsValue(user);
            }
        }
    }, [id, state.users, form]);

    const onFinish = (data: any) => {
        handleSubmitForm(id ? { ...data, id } : data);
        console.log(data)
    };

    return (
        <>
            <div className={`${styles['heading']} flex justify-between items-center mb-6`} style={{ flex: '0 0 20%' }}>
                <h3 className='font-semibold text-xl'>{id ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}</h3>
                <div className="">
                    <Button className='bg-[#C67D39] text-white' href='/admin/list_user'>
                        <ArrowLeftOutlined />
                        Quay lại
                    </Button>
                </div>
            </div>

            <div className={`${styles['content']} h-full py-16`}>
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='email'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className='pr-2' />}
                                placeholder='Địa chỉ Email'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='fullname'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { max: 25, message: 'Tên người dùng không được phép vượt quá 25 ký tự!' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className='pr-2' />}
                                placeholder='Tên người dùng'
                                className={`${styles['inputForm']} py-2`}
                            />
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='password'
                            rules={[
                                { required: true, message: 'Không được bỏ trống!' },
                                { min: 8, message: 'Mật khẩu phải có độ dài ít nhất từ 8 ký tự trở lên!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className='pr-2' />}
                                placeholder='Mật khẩu'
                                type='password'
                                className={`${styles['inputForm']} py-2`}
                                visibilityToggle={true}
                            />
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='role'
                        // rules={[
                        //     { required: true, message: 'Không được bỏ trống!' },
                        // ]}

                        >
                            <Select placeholder="Phân quyền tài khoản">
                                <Select.Option value={1}>Admin</Select.Option>
                                <Select.Option value={0}>Client</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            className={`${styles['formGroup']} `}
                            name='status'
                        // rules={[
                        //     { required: true, message: 'Không được bỏ trống!' },
                        // ]}
                        >
                            <Select placeholder="Trạng thái">
                                <Select.Option value={1}>Đã kích hoạt</Select.Option>
                                <Select.Option value={0}>Chưa kích hoạt</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button className='bg-[#C67D39] text-white p-6' htmlType='submit'>
                                {id ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Form_Submit_User;
