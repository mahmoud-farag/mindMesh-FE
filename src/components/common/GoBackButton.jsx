import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton({
    label = 'Go Back',
    onClick,
    className = '',
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <div
            className={`flex-center text-slate-500 hover:text-slate-900 pb-1 border-slate-300 transition-colors duration-200 w-fit ${className}`}
        >
            <ArrowLeft className="w-5 h-5" />
            <button type="button" className="cursor-pointer" onClick={handleClick}>
                {label}
            </button>
        </div>
    );
}
