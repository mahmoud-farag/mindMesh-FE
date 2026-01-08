

import React, { useState, useEffect, useRef } from 'react';

export default function useModalAnimation({
    isOpen,
    onClose
}, options = {}) {
    const { animationDuration = 300 } = options;

    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const closeTimerRef = useRef(null);


    useEffect(() => {

        function trigger() {

            if (isOpen)
                setIsVisible(true);
        }

        trigger();

    }, [isOpen]);


    useEffect(() => {

        return () => {

            if (closeTimerRef?.current)
                clearTimeout(closeTimerRef.current);
        }

    }, []);


    function handleCloseModal() {

        setIsClosing(true);
        setIsVisible(false);

        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

        closeTimerRef.current = setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, animationDuration);


    }

    const shouldRender = isOpen || isClosing;

    return { isVisible, isClosing, shouldRender, handleCloseModal }

}

