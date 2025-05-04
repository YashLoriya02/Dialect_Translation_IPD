import React, { useEffect, useState } from 'react';

const translations = [
    "One voice, many languages.",
    "एक आवाज, अनेक भाषा.",
    "एक आवाज, कई भाषाएं।"
];

const TypingText = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = translations[index];
        const delay = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            setText(current.slice(0, charIndex));
            if (!isDeleting && charIndex < current.length) {
                setCharIndex(prev => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                setCharIndex(prev => prev - 1);
            } else if (!isDeleting && charIndex === current.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % translations.length);
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index]);

    return (
        <div className="flex justify-center items-center mt-10">
            <h1 className="text-2xl sm:text-4xl gradient-text font-bold text-center text-white">
                {text}
                <span className="animate-pulse">|</span>
            </h1>
        </div>
    );
};

export default TypingText;
