import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ClipLoader } from 'react-spinners';

// interface IProps {
//     uploadLoading: boolean;
//     uploadedFile: { filePath: string; fileName: string; size?: number } | null;
//     setUploadedFile: (val: { filePath: string; fileName: string; size?: number } | null) => void;
//     setUploadLoading: (val: boolean) => void;
// }

export const ImgDropzone = ({ setUploadLoading, setUploadedFile, uploadLoading, uploadedFile }) => {
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#E6E6E6',
        borderStyle: 'dashed',
        backgroundColor: '#fff',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };

    const focusedStyle = {
        borderColor: '#2196f3',
    };

    const acceptStyle = {
        borderColor: '#00e676',
    };

    const rejectStyle = {
        borderColor: '#ff1744',
    };

    const formData = new FormData();
    const onDropAccepted = React.useCallback((acceptedFiles) => {
        formData.append('File', acceptedFiles[0]);
        setUploadLoading(true);
        setUploadedFile(null);
        console.warn(acceptedFiles);
        // orderService
        //     .uploadShippingFile(formData)
        //     .then((res) => {
        //         if (!res || !res.filePath) {
        //             return notifyError('Error occured!');
        //         }
        //         setUploadedFile({
        //             filePath: res.filePath,
        //             fileName: acceptedFiles[0].name,
        //             size: acceptedFiles[0].size,
        //         });
        //         setUploadLoading(false);
        //         toast.success('File succesfully added !', {
        //             position: toast.POSITION.TOP_RIGHT,
        //         });
        //         formData.delete('File');
        //     })
        //     .catch((err) => {
        //         console.warn(err);

        //         notifyRequestErr(err);
        //     })
        //     .finally(() => setUploadLoading(false));
    }, []);

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } =
        useDropzone({
            maxFiles: 10,
            accept: {
                'image/*': ['.jpeg', '.png'],
            },
            onDropAccepted,
        });

    const style = React.useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject],
    );

    return (
        <div className="cursor-pointer">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} disabled={uploadLoading} />
                {isDragAccept && <p>All files will be accepted</p>}
                {isDragReject && <p>Some files will be rejected</p>}
                {!isDragActive && (
                    <>
                        <div className="flex items-center text-[17px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                            <p className="text-txt-gray">
                                Drag and drop or{' '}
                                <b className="text-black">
                                    <u>Browse</u>
                                </b>
                            </p>
                        </div>
                        <p className="text-txt-gray text-xs">
                            (10 is the maximum number of img file you can drop here)
                        </p>
                        {uploadedFile && (
                            <aside>
                                <h4>Uploaded file</h4>
                                <ul>{`${uploadedFile.fileName}${
                                    uploadedFile.size ? ` - ${uploadedFile.size} bytes` : ''
                                }`}</ul>
                            </aside>
                        )}
                        <ClipLoader loading={uploadLoading} className="mr-4" />
                    </>
                )}
            </div>
        </div>
    );
};
