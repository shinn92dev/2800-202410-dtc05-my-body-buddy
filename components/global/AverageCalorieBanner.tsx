import React from "react";

type AverageCalorieBannerProps = {
    title: string;
    range: string;
}

const AverageCalorieBanner: React.FC<AverageCalorieBannerProps> = ({ title, range }) => {
    return (
        <div className="text-lg text-center font-semibold p-4 m-4 bg-beige rounded shadow-md">
            {title}
            <br />{range}
        </div>
    );
};

export default AverageCalorieBanner;