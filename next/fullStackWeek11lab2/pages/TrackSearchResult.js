import React from "react";
import { Card } from "react-bootstrap";
import Image from 'next/image';

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handleClick = () => {
    chooseTrack(track);
  };

  return (
    <div className="mb-3" onClick={handleClick} style={{background: 'rgba(255, 255, 255, 0.7)', display: "flex", alignItems: "center", padding: "10px", borderRadius: "8px" }}>
      {track.albumUrl && ( // Add conditional check for albumUrl
        <Image src={track.albumUrl} alt={`${track.title} album cover`} width={64} height={64} layout="fixed" />
      )}
      <Card.Body>
        <div>{track.title}</div>
        <div>{track.albumName}</div>
        <div style={{ color: 'gray' }}>{track.artist}</div>
      </Card.Body>
    </div>
  );
};

export default TrackSearchResult;
