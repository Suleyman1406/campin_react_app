import { ChakraProvider } from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import AdminSidebar from 'components/admin/sidebar';
import { ReactComponent as TrashIcon } from 'images/icons/trash.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCampsite } from 'services/campsite/deleteCampsite';
import { getCampsites } from 'services/campsite/getCampsites';
import { notifyAxiosError } from 'utils';

const CampsiteTable = () => {
    const [campsites, setCampsites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCampsites()
            .then((res) => {
                setCampsites(res.data?.body ?? []);
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

    const onCampsiteDelete = useCallback(
        (id) => {
            if (confirm('Are you sure to delete campsite?')) {
                deleteCampsite(id)
                    .then(() => {
                        toast.success('Campsite deleted successfully.');
                        setCampsites([
                            ...campsites.filter((campsite) => campsite.campsiteId !== id),
                        ]);
                    })
                    .catch((err) => notifyAxiosError(err));
            }
        },
        [campsites],
    );

    return (
        <ChakraProvider>
            <div className="flex">
                <AdminSidebar />
                <div className="grow h-[400px] py-6 px-8">
                    <h3 className="text-4xl mb-3">Campsite table</h3>
                    <TableContainer className="text-sm">
                        <Table _loading={loading} variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Name</Th>
                                    <Th>City</Th>
                                    <Th>Rate</Th>
                                    <Th>ReviewCount</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campsites.map((campsite) => (
                                    <Tr key={campsite.campsiteId} className="text-sm">
                                        <Td>
                                            <Link
                                                to={`/campsite/${campsite.campsiteId}`}
                                                target="_blank"
                                                className="underline text-[11px] text-blue-600 hover:text-blue-800 duration-100"
                                            >
                                                {campsite.campsiteId}
                                            </Link>
                                        </Td>
                                        <Td>{campsite.name}</Td>
                                        <Td>{campsite.cityName}</Td>
                                        <Td>{campsite.rate}</Td>
                                        <Td>{campsite.reviewCount}</Td>
                                        <Td>
                                            <TrashIcon
                                                onClick={() =>
                                                    onCampsiteDelete(campsite.campsiteId)
                                                }
                                                className="fill-red-500 cursor-pointer"
                                            />
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

export default CampsiteTable;
