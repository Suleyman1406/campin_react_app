import Campsite from 'components/campsite';
import Navbar from 'components/navbar';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getFavoriteCampsites } from 'services/favorite-campsite/getFavoriteCampsites';

const FavoriteCampsites = () => {
    const [favoriteCampsites, setFavoriteCampsites] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFavoriteCampsites()
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setFavoriteCampsites(res.data.body);
                }
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div
            className="bg-primary-1 min-h-screen bg-bottom bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${LandingBg})` }}
        >
            <Navbar />
            <div
                style={{
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
                className="min-h-[calc(100vh-130px)] rounded-3xl bg-white w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75 py-6 px-8 lg:py-5"
            >
                <h1 className="text-3xl mb-8 font-play-fair font-bold text-primary-1">
                    Favorite Campsites
                </h1>
                {loading && (
                    <div className="flex flex-col items-center pt-36">
                        <ClipLoader size={100} color={'#617143'} />
                        <span className="text-primary-1 font-play-fair text-2xl mt-2">
                            Loading...
                        </span>
                    </div>
                )}

                <div
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    }}
                    className="grid gap-7"
                >
                    {favoriteCampsites &&
                        favoriteCampsites.map((campsite) => (
                            <Campsite
                                key={campsite.campsiteId}
                                campsite={campsite}
                                isFavorite={favoriteCampsites.find(
                                    (c) => c.campsiteId === campsite.campsiteId,
                                )}
                                setFavoriteCampsites={setFavoriteCampsites}
                            />
                        ))}
                </div>
                {favoriteCampsites && favoriteCampsites.length === 0 && (
                    <div className="mt-[200px] font-play-fair text-center text-3xl">
                        Campsite Not Found in Favorites
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteCampsites;
