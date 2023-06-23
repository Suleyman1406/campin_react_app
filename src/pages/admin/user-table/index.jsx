import { ChakraProvider } from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import AdminSidebar from 'components/admin/sidebar';
import useAuth from 'context/auth';
import { ReactComponent as TrashIcon } from 'images/icons/trash.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addRoleToUser } from 'services/user/addRoleToUser';
import { deleteUser } from 'services/user/deleteUser';
import { getUsers } from 'services/user/getUsers';
import { notifyAxiosError } from 'utils';

const AdminUserTable = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

    const onUserDelete = useCallback(
        (id) => {
            if (confirm('Are you sure to delete user?')) {
                deleteUser(id)
                    .then(() => {
                        toast.success('User deleted successfully.');
                        setUsers([...users.filter((user) => user.userID !== id)]);
                    })
                    .catch((err) => notifyAxiosError(err));
            }
        },
        [users],
    );

    const changeRole = useCallback(
        (id, role) => {
            if (confirm('Are you sure to delete?')) {
                addRoleToUser(id, role)
                    .then((res) => {
                        toast.success(`User role changed to ${role}.`);
                        const userIdx = users.findIndex((user) => user.userID === id);
                        if (userIdx !== -1) {
                            users[userIdx].role = role;
                        }
                        setUsers([...users]);
                    })
                    .catch((err) => notifyAxiosError(err));
            }
        },
        [users],
    );

    return (
        <ChakraProvider>
            <div className="flex">
                <AdminSidebar />
                <div className="grow h-[400px] py-6 px-8">
                    <h3 className="text-4xl mb-3">User table</h3>
                    <TableContainer className="text-sm">
                        <Table _loading={loading} variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Full Name</Th>
                                    <Th>Email</Th>
                                    <Th>PhoneNumber</Th>
                                    <Th>Role</Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users?.map((user) => (
                                    <Tr key={user.userID}>
                                        <Td className="text-[10px]">{user.userID}</Td>
                                        <Td>
                                            {user.name} {user.surname}
                                        </Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.phoneNumber}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            {user.role === 'Basic' && (
                                                <button
                                                    onClick={() => changeRole(user.userID, 'Owner')}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded"
                                                >
                                                    Make Owner
                                                </button>
                                            )}
                                        </Td>
                                        <Td>
                                            {user.role === 'Basic' && (
                                                <button
                                                    onClick={() => changeRole(user.userID, 'Admin')}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </Td>
                                        <Td>
                                            {currentUser.userID !== user.userID && (
                                                <TrashIcon
                                                    onClick={() => onUserDelete(user.userID)}
                                                    className="fill-red-500 cursor-pointer"
                                                />
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default AdminUserTable;
