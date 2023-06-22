import useAuth from 'context/auth';
import dayjs from 'dayjs';
import { ReactComponent as CapacityIcon } from 'images/icons/capacity.svg';
import { ReactComponent as ChildIcon } from 'images/icons/child.svg';
import { ReactComponent as EditIcon } from 'images/icons/edit.svg';
import { ReactComponent as LocationIcon } from 'images/icons/location.svg';
import { ReactComponent as PersonIcon } from 'images/icons/person.svg';
import { ReactComponent as TrashIcon } from 'images/icons/trash.svg';
import NotFoundImg from 'images/image-not-found.png';
import LandingBg from 'images/landing_bg.jpeg';
import CampsiteDeleteModal from 'pages/owner/campsite/deleteModal';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { getCampsites } from 'services/campsite/getCampsites';
import { createCampsite } from 'services/campsite-owner/createCampsite';
import { deleteCampsite } from 'services/campsite-owner/deleteCampsite';
import { updateCampsite } from 'services/campsite-owner/updateCampsite';
import { getHolidayDestination } from 'services/holiday-destination/getDestination';
import { notifyAxiosError } from 'utils';

import CampsiteEditCreateModal from './editCreateModal';

const OwnerCampsites = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [campsites, setCampsites] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createEditLoading, setCreateEditLoading] = useState(false);
    const [isEditCreateModalOpen, setEditCreateModalOpen] = useState(false);
    const [editedCampsiteId, setEditedCampsiteId] = useState();
    const [selectedCampsiteIdForDelete, setSelectedCampsiteIdForDelete] = useState();
    const [getDestinationLoading, setDestinationLoading] = useState(true);
    const [holidayDestinations, setHolidayDestinations] = useState([]);

    useEffect(() => {
        getCampsites()
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setCampsites(
                        res.data.body.filter(
                            (campsite) =>
                                campsite.ownerID === user.userID || campsite.ownerID === user.id,
                        ),
                    );
                }
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

    const onCloseModal = useCallback(() => setSelectedCampsiteIdForDelete(), []);

    useEffect(() => {
        getHolidayDestination()
            .then((res) => setHolidayDestinations(res.data))
            .catch((err) => notifyAxiosError(err))
            .finally(() => setDestinationLoading(false));
    }, []);

    const onCampsiteDelete = useCallback(() => {
        setDeleteLoading(true);
        deleteCampsite(selectedCampsiteIdForDelete)
            .then((res) => {
                console.warn(res);
                setCampsites([
                    ...campsites.filter(
                        (campsite) => campsite.campsiteId !== selectedCampsiteIdForDelete,
                    ),
                ]);
                setSelectedCampsiteIdForDelete();
                toast.success('Campsite succesfully deleted.');
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setDeleteLoading(false));
    }, [selectedCampsiteIdForDelete]);

    const onCreateEditSubmit = useCallback(
        (values, uploadedFileUrls) => {
            setCreateEditLoading(true);
            if (uploadedFileUrls.length > 0) values.imageUrls = uploadedFileUrls;
            if (!editedCampsiteId) {
                createCampsite(values)
                    .then((res) => {
                        if (res.data && res.data.succeeded) {
                            toast.success(res.data.message);
                            setCampsites((prev) => [res.data.body, ...prev]);
                            setEditCreateModalOpen(false);
                        }
                    })
                    .catch((err) => notifyAxiosError(err))
                    .finally(() => setCreateEditLoading(false));
            } else {
                values.seasonStartDate = dayjs(values.seasonStartDate).format('YYYY/MM/DD');
                values.seasonCloseDate = dayjs(values.seasonCloseDate).format('YYYY/MM/DD');
                updateCampsite({ ...values, campsiteId: editedCampsiteId })
                    .then((res) => {
                        if (res.data && res.data.succeeded) {
                            setEditedCampsiteId();
                            setEditCreateModalOpen(false);
                            toast.success(res.data.message);
                            const idx = campsites.findIndex(
                                (c) => res.data.body.campsiteId === c.campsiteId,
                            );
                            if (idx !== -1) {
                                campsites[idx] = res.data.body;
                                setCampsites([...campsites]);
                            }
                        }
                    })
                    .catch((err) => notifyAxiosError(err))
                    .finally(() => setCreateEditLoading(false));
            }
        },
        [editedCampsiteId],
    );
    return (
        <div
            className="bg-primary-1 min-h-screen bg-bottom bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${LandingBg})` }}
        >
            <div
                style={{
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
                className="w-[320px] min-h-screen rounded-3xl bg-white lg:w-[768px] xl:w-[1152px] mx-auto duration-75 py-2 lg:py-5"
            >
                <Link to="/" className="font-play-fair text-4xl ml-8">
                    Campin
                </Link>
                <div className="mt-10 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-3xl">Owned Campsites</h1>
                        <button
                            onClick={() => setEditCreateModalOpen(true)}
                            className="text-lg bg-primary-1 px-4 py-3 text-white font-bold rounded-xl border-2 border-transparent hover:border-primary-1 hover:bg-transparent hover:text-primary-1 duration-100"
                        >
                            Add Campsite
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex flex-col items-center mt-16">
                            <ClipLoader size={100} color={'#617143'} />
                            <span className="text-primary-1 font-play-fair text-2xl mt-2">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-8 mt-6 max-h-[80vh] overflow-y-auto customscrollbar pr-2">
                            {campsites &&
                                campsites.map((campsite) => (
                                    <div
                                        key={campsite.campsiteId}
                                        className="flex rounded-lg"
                                        style={{
                                            boxShadow:
                                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                        }}
                                    >
                                        <img
                                            src={campsite.defaultImage ?? ''}
                                            alt="campsite"
                                            loading="lazy"
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = NotFoundImg;
                                            }}
                                            className="w-[240px] h-[210px] object-cover rounded-l-lg"
                                        />
                                        <div className="grow px-4 py-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xl text-primary-1 font-bold">
                                                    {campsite.name}
                                                </h3>
                                                <div className="flex items-center text-xl gap-x-6 mr-2">
                                                    <EditIcon
                                                        onClick={() => {
                                                            setEditedCampsiteId(
                                                                campsite.campsiteId,
                                                            );
                                                            setEditCreateModalOpen(true);
                                                        }}
                                                        className="cursor-pointer hover:scale-105 duration-100 fill-orange-400"
                                                    />
                                                    <TrashIcon
                                                        onClick={() =>
                                                            setSelectedCampsiteIdForDelete(
                                                                campsite.campsiteId,
                                                            )
                                                        }
                                                        className="cursor-pointer hover:scale-105 duration-100 fill-red-500"
                                                    />
                                                </div>
                                            </div>
                                            <p className="h-[120px] overflow-auto mt-2 text-lg w-[70%]">
                                                {campsite.description}
                                            </p>
                                            <div className="flex gap-x-6 text-2xl items-center">
                                                <div className="flex gap-x-2 items-center text-primary-1">
                                                    <CapacityIcon />
                                                    <span>{campsite.capacity}</span>
                                                </div>
                                                <div className="flex gap-x-2 items-center text-primary-1">
                                                    <PersonIcon />
                                                    <span>{campsite.adultPrice}TL</span>
                                                </div>
                                                <div className="flex gap-x-2 items-center text-primary-1">
                                                    <ChildIcon />
                                                    <span>{campsite.childPrice}TL</span>
                                                </div>
                                                <Link
                                                    to={
                                                        campsite.lat && campsite.lng
                                                            ? `https://www.google.com/maps/search/?api=1&query=${campsite.lat},${campsite.lng}`
                                                            : '/'
                                                    }
                                                    target="_blank"
                                                    className="ml-auto mr-2 hover:scale-105 duration-100"
                                                >
                                                    <LocationIcon />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <CampsiteDeleteModal
                onCloseModal={onCloseModal}
                deleteLoading={deleteLoading}
                onCampsiteDelete={onCampsiteDelete}
                isModalOpen={!!selectedCampsiteIdForDelete}
            />
            <CampsiteEditCreateModal
                getDestinationLoading={getDestinationLoading}
                holidayDestinations={holidayDestinations}
                editedCampsiteId={editedCampsiteId}
                onSubmit={onCreateEditSubmit}
                createEditLoading={createEditLoading}
                onCloseModal={() => {
                    setEditCreateModalOpen(false);
                    setEditedCampsiteId();
                }}
                isModalOpen={isEditCreateModalOpen}
            />
        </div>
    );
};

export default OwnerCampsites;
