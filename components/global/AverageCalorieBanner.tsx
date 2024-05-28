// import React from "react";

// type AverageCalorieBannerProps = {
//     title: string;
//     range: string;
// }

// const AverageCalorieBanner: React.FC<AverageCalorieBannerProps> = ({ title, range }) => {
//     return (
//         <div className="text-lg text-center font-semibold p-4 m-4 bg-beige rounded shadow-md">
//             {title}
//             <br />{range}
//         </div>
//     );
// };

// export default AverageCalorieBanner;


// use this when we don't have time to implement score calculation
import React from "react";

type AverageCalorieBannerProps = {
    title: string;
    range: string;
}

const AverageCalorieBanner: React.FC<AverageCalorieBannerProps> = ({ title, range }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src="/person_only_transparent.png" alt="Logo" className="w-60 h-60 mr-20 mt-[-60px]" />
            <div className="relative bg-beige text-black text-center font-semibold p-4 rounded-lg shadow-md mt-[-60px] mb-8">
                {title}
                <br />{range}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-b-[10px] border-b-beige border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent "></div>
            </div>
        </div>
    );
};

export default AverageCalorieBanner;
