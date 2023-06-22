import { Dialog, Transition } from '@headlessui/react';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { ReactComponent as CloseIcon } from 'images/icons/close.svg';
import { ReactComponent as EditIcon } from 'images/icons/edit.svg';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { getCampsiteById } from 'services/campsite/getCampsiteById';
import { notifyAxiosError } from 'utils';
import * as Yup from 'yup';

import { ImgDropzone } from './dropzone';

const CreateValidationSchema = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Name is required.'),
    description: Yup.string().min(20, 'Too Short!').required('Description is required.'),
    adultPrice: Yup.number().required('Adult price is required.'),
    childPrice: Yup.number().required('Child price is required.'),
    seasonStartDate: Yup.string().required('Season start date is required.'),
    seasonCloseDate: Yup.string().required('Season end date is required.'),
    holidayDestinationId: Yup.string().required('Destination is required.'),
    lat: Yup.number().required('Latitude is required.'),
    lng: Yup.number().required('Longitude is required.'),
    capacity: Yup.number().required('Capacity is required.'),
});

const CampsiteEditCreateModal = ({
    onSubmit,
    isModalOpen,
    onCloseModal,
    editedCampsiteId,
    createEditLoading,
    holidayDestinations,
    getDestinationLoading,
}) => {
    const [getEditCampsiteLoading, setEditCampsiteLoading] = useState(false);
    const [editedCampsite, setEditedCampsite] = useState();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileUrls, setUploadedFileUrls] = useState([]);

    useEffect(() => {
        if (editedCampsiteId && isModalOpen && holidayDestinations) {
            setEditCampsiteLoading(true);
            getCampsiteById(editedCampsiteId)
                .then((res) => {
                    if (res.data && res.data.succeeded) {
                        setEditedCampsite({
                            ...(res.data.body?.campsite ?? {}),
                            ...(res.data.body?.features ?? {}),
                        });
                    }
                })
                .catch((err) => notifyAxiosError(err))
                .finally(() => setEditCampsiteLoading(false));
        } else {
            setEditedCampsite();
            setUploadedFileUrls([]);
        }
    }, [editedCampsiteId, isModalOpen, holidayDestinations]);

    return (
        <Transition appear show={isModalOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                                <div className="flex justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-medium leading-6 text-gray-900"
                                    >
                                        {editedCampsiteId ? 'Edit' : 'Create'} Campsite
                                    </Dialog.Title>
                                    <CloseIcon
                                        onClick={() => {
                                            onCloseModal();
                                        }}
                                        className="cursor-pointer w-[25px] h-[25px] duration-100 hover:scale-105"
                                    />
                                </div>

                                <Formik
                                    initialValues={{
                                        name: editedCampsite?.name ?? '',
                                        description: editedCampsite?.description ?? '',
                                        adultPrice: editedCampsite?.adultPrice ?? '',
                                        childPrice: editedCampsite?.childPrice ?? '',
                                        capacity: editedCampsite?.capacity ?? '',
                                        seasonStartDate: editedCampsite?.seasonStartDate ?? '',
                                        seasonCloseDate: editedCampsite?.seasonCloseDate ?? '',
                                        holidayDestinationId:
                                            holidayDestinations.find(
                                                (d) =>
                                                    d.holidayDestinationName ===
                                                    editedCampsite?.holidayDestinationName,
                                            )?.id ?? '',
                                        lat: editedCampsite?.lat ?? '',
                                        lng: editedCampsite?.lng ?? '',
                                        hasElectricity: editedCampsite?.hasElectricity ?? false,
                                        hasWater: editedCampsite?.hasWater ?? false,
                                        hasToilet: editedCampsite?.hasToilet ?? false,
                                        hasShower: editedCampsite?.hasShower ?? false,
                                        hasWiFi: editedCampsite?.hasWiFi ?? false,
                                        hasTrees: editedCampsite?.hasTrees ?? false,
                                        hasParking: editedCampsite?.hasParking ?? false,
                                        hasSecurity: editedCampsite?.hasSecurity ?? false,
                                        hasBusinessServices:
                                            editedCampsite?.hasBusinessServices ?? false,
                                        hasActivities: editedCampsite?.hasActivities ?? false,
                                        hasFirePit: editedCampsite?.hasFirePit ?? false,
                                        hasSignal: editedCampsite?.hasSignal ?? false,
                                        isNearSea: editedCampsite?.isNearSea ?? false,
                                    }}
                                    enableReinitialize
                                    validationSchema={CreateValidationSchema}
                                    onSubmit={(values) => onSubmit(values, uploadedFileUrls)}
                                >
                                    {({
                                        values,
                                        setFieldValue,
                                        errors,
                                        touched,
                                        setFieldTouched,
                                    }) => (
                                        <Form>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6 ">
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="registerName"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={values['name']}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    'name',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('name', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.name && touched.name
                                                            ? errors.name
                                                            : ''}
                                                    </p>
                                                </div>

                                                <div>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value.value
                                                        }
                                                        value={
                                                            holidayDestinations
                                                                .map((d) => ({
                                                                    label: d.holidayDestinationName,
                                                                    value: d.id,
                                                                }))
                                                                .find(
                                                                    (d) =>
                                                                        d.value ==
                                                                        values[
                                                                            'holidayDestinationId'
                                                                        ],
                                                                ) ?? null
                                                        }
                                                        options={holidayDestinations.map((d) => ({
                                                            label: d.holidayDestinationName,
                                                            value: d.id,
                                                        }))}
                                                        loading={getDestinationLoading}
                                                        // sx={{ width: '100%' }}
                                                        className="m-auto lg:m-0"
                                                        onChange={(e, option) => {
                                                            setFieldValue(
                                                                'holidayDestinationId',
                                                                option?.value ?? null,
                                                            );
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Destination"
                                                            />
                                                        )}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                padding: '9px',
                                                            },
                                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderRadius: '8px',
                                                                    border: '1px solid #1A1D21',
                                                                },
                                                            '& .MuiOutlinedInput-root.Mui-focused':
                                                                {
                                                                    borderRadius: '8px',
                                                                    boxShadow:
                                                                        '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                                                },
                                                        }}
                                                    />
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.holidayDestinationId &&
                                                        touched.holidayDestinationId
                                                            ? errors.holidayDestinationId
                                                            : ''}
                                                    </p>
                                                </div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <div>
                                                        <DatePicker
                                                            label="Season Start Date"
                                                            className="m-auto lg:m-0"
                                                            value={
                                                                values['seasonStartDate']
                                                                    ? dayjs(
                                                                          values['seasonStartDate'],
                                                                      )
                                                                    : null
                                                            }
                                                            onChange={(value) =>
                                                                setFieldValue(
                                                                    'seasonStartDate',
                                                                    new Date(value),
                                                                )
                                                            }
                                                            sx={{
                                                                width: '100%',
                                                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                    {
                                                                        borderRadius: '8px',
                                                                        border: '1px solid #1A1D21',
                                                                    },
                                                                '& .MuiOutlinedInput-root.Mui-focused':
                                                                    {
                                                                        borderRadius: '8px',
                                                                        boxShadow:
                                                                            '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                                                    },
                                                            }}
                                                        />
                                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                            {errors.seasonStartDate &&
                                                            touched.seasonStartDate
                                                                ? errors.seasonStartDate
                                                                : ''}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <DatePicker
                                                            label="Season Close Date"
                                                            className="m-auto lg:m-0"
                                                            value={
                                                                values['seasonCloseDate']
                                                                    ? dayjs(
                                                                          values['seasonCloseDate'],
                                                                      )
                                                                    : null
                                                            }
                                                            onChange={(value) =>
                                                                setFieldValue(
                                                                    'seasonCloseDate',
                                                                    new Date(value),
                                                                )
                                                            }
                                                            sx={{
                                                                width: '100%',
                                                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                    {
                                                                        borderRadius: '8px',
                                                                        border: '1px solid #1A1D21',
                                                                    },
                                                                '& .MuiOutlinedInput-root.Mui-focused':
                                                                    {
                                                                        borderRadius: '8px',
                                                                        boxShadow:
                                                                            '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                                                    },
                                                            }}
                                                        />
                                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                            {errors.seasonCloseDate &&
                                                            touched.seasonCloseDate
                                                                ? errors.seasonCloseDate
                                                                : ''}
                                                        </p>
                                                    </div>
                                                </LocalizationProvider>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="adultPrice"
                                                            name="adultPrice"
                                                            placeholder="Adult Price"
                                                            value={values['adultPrice']}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    'adultPrice',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('adultPrice', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.adultPrice && touched.adultPrice
                                                            ? errors.adultPrice
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="childPrice"
                                                            name="childPrice"
                                                            placeholder="Child Price"
                                                            value={values['childPrice']}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    'childPrice',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('childPrice', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.childPrice && touched.childPrice
                                                            ? errors.childPrice
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="lat"
                                                            name="lat"
                                                            placeholder="Latitude"
                                                            value={values['lat']}
                                                            onChange={(e) =>
                                                                setFieldValue('lat', e.target.value)
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('lat', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.lat && touched.lat
                                                            ? errors.lat
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="lng"
                                                            name="lng"
                                                            placeholder="Longitude"
                                                            value={values['lng']}
                                                            onChange={(e) =>
                                                                setFieldValue('lng', e.target.value)
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('lng', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.lng && touched.lng
                                                            ? errors.lng
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="capacity"
                                                            name="capacity"
                                                            placeholder="Capacity"
                                                            value={values['capacity']}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    'capacity',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('capacity', true)
                                                            }
                                                            className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.capacity && touched.capacity
                                                            ? errors.capacity
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="relative">
                                                        <textarea
                                                            type="text"
                                                            id="description"
                                                            name="description"
                                                            placeholder="Description"
                                                            value={values['description']}
                                                            onChange={(e) =>
                                                                setFieldValue(
                                                                    'description',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched('description', true)
                                                            }
                                                            className="resize-y min-h-[80px] border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                        />
                                                        <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                    </div>
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.description && touched.description
                                                            ? errors.description
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div className="col-span-2 flex flex-wrap px-1 gap-x-2">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasElectricity']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasElectricity',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Electricity"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasWater']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasWater',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Water"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasToilet']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasToilet',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Toilet"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasShower']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasShower',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Shower"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasWiFi']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasWiFi',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Wifi"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasTrees']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasTrees',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Trees"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasParking']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasParking',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Parking"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasSecurity']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasSecurity',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Security"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    values['hasBusinessServices']
                                                                }
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasBusinessServices',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Business Services"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasActivities']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasActivities',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Activities"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasFirePit']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasFirePit',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Fire Pit"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['hasSignal']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'hasSignal',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Has Signal"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values['isNearSea']}
                                                                onChange={(_, checked) =>
                                                                    setFieldValue(
                                                                        'isNearSea',
                                                                        checked,
                                                                    )
                                                                }
                                                                color="warning"
                                                            />
                                                        }
                                                        label="Is Near Sea"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <ImgDropzone
                                                        uploadedFile={uploadedFile}
                                                        uploadLoading={uploadLoading}
                                                        setUploadedFile={setUploadedFile}
                                                        uploadedFileUrls={uploadedFileUrls}
                                                        setUploadLoading={setUploadLoading}
                                                        setUploadedFileUrls={setUploadedFileUrls}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={createEditLoading || uploadLoading}
                                                className="w-full rounded-xl bg-primary-1 py-3 text-white font-bold leading-6 border-[3px] border-transparent hover:border-primary-1 hover:text-primary-1 hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-white disabled:hover:bg-primary-1 disabled:opacity-80 disabled:cursor-wait duration-200 flex items-center justify-center"
                                            >
                                                <div className="w-[30px] h-[30px] flex items-center -ml-[30px] justify-center">
                                                    <ClipLoader
                                                        color={'white'}
                                                        loading={createEditLoading || uploadLoading}
                                                        size={20}
                                                    />
                                                </div>
                                                {editedCampsiteId ? 'Edit' : 'Create'}
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                {getEditCampsiteLoading && (
                                    <div className="absolute top-0 z-30 left-0 bg-black/30 w-full h-full flex flex-col items-center justify-center">
                                        <ClipLoader size={100} color="white" />
                                        <span className="font-play-fair text-white text-[32px]">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CampsiteEditCreateModal;
