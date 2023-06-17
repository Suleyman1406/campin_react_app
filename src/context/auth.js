import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { login } from 'services/auth/login';
import { register } from 'services/auth/register';
import { getCurrentUser } from 'services/user/getUserInfo';
import { notifyAxiosError } from 'utils';

const AuthContext = createContext({});

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    // We are using `react-router` for this example,
    // but feel free to omit this or use the
    // router of your choice.

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            getCurrentUser(jwt)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    toast.error('Session expired, please login again.');
                    localStorage.removeItem('jwt');
                    console.error(err);
                })
                .finally(() => setLoadingInitial(false));
        } else {
            setLoadingInitial(false);
        }
    }, []);

    // Flags the component loading state and posts the login
    // data to the server.
    //
    // An error means that the email/password combination is
    // not valid.
    //
    // Finally, just signal the component that loading the
    // loading state is over.
    async function loginFunc(data) {
        setLoading(true);
        return await login(data)
            .then((res) => {
                if (res && res.data && res.data.succeeded) {
                    setUser(res.data.body);
                    localStorage.setItem('jwt', res.data.body.jwToken);
                }
                return res;
            })
            .catch((error) => {
                setError(error);
                notifyAxiosError(error);
            })
            .finally(() => setLoading(false));
    }

    // // Sends sign up details to the server. On success we just apply
    // // the created user to the state.
    async function registerFunc(data) {
        setLoading(true);
        return await register(data)
            .catch((err) => {
                notifyAxiosError(err);
            })
            .finally(() => setLoading(false));
    }

    // Call the logout endpoint and then remove the user
    // from the state.
    function logoutFunc() {
        setUser(undefined);
        localStorage.removeItem('jwt');
    }

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
        () => ({
            user,
            error,
            loading,
            loginFunc,
            logoutFunc,
            registerFunc,
        }),
        [user, loading, error],
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {loadingInitial ? (
                <div className="w-screen h-screen flex flex-col items-center justify-center bg-primary-1">
                    <ClipLoader color="white" size={150} />
                    <h1 className="text-white text-[48px] font-play-fair mt-4">Loading...</h1>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}
