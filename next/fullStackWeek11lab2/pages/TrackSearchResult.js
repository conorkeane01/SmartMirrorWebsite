import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {

    function handlePlay() {
        chooseTrack(track)
    }
  return (
    <div
      className="d-flex m-3 align-items-center"
      styles={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-6">
        <div>{track.title}</div>
        <div className="text-muted"> {track.artist}</div>
      </div>
    </div>
  );
}
