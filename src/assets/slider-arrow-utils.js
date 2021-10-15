import React from "react";

export const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className="next-arrow">
        &#10095;
    </button>
);
export const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="prev-arrow">
        &#10094;
    </button>
);
