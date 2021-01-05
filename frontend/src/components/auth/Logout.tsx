import React, { useEffect } from 'react';

interface Props {

};

export function Logout(props: Props) {

    useEffect(() => {
        localStorage.removeItem("usertoken");
        // @ts-ignore
        window.location = '/login';
    }, [])

    return (
        <div>
        </div>
    );
}