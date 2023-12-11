import React from "react";
import './Marker.css';

interface Props {
    img: string;
    onClick: () => void;
}

const Marker: React.FC<Props> = ({img, onClick}) => {
    return (
        <div className={'marker-container'} onClick={onClick}>
            <img className={'marker-img'} alt={'courier'} src={img} />
        </div>
    )
}

export default Marker;
