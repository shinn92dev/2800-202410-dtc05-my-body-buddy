import React from 'react';
import '@/components/global/LoadingAnimation.scss';

const LoadingAnimation: React.FC = () => {
    return (
        <div className="loading-animation">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingAnimation;
