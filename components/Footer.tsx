import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12 no-print">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
            </div>
        </footer>
    );
};
