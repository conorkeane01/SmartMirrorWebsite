import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form, Card } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import axios from "axios";
import styles from "./Dashboard.module.css";
import Image from "next/image";
import Player from "./player";

const spotifyApi = new SpotifyWebApi({
  clientId: "ccc25013b49c4614a8c38194cdaf6137",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trackName, setTrackName] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setTrackName(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!trackName) return;

    const queryParams = new URLSearchParams({
      track: trackName.title,
      artist: trackName.artist,
    });

    fetch(`http://34.239.36.76:8000/lyrics?${queryParams.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLyrics(data.lyrics);
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        setLyrics("Unable to fetch lyrics.");
      });
  }, [trackName]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const albumImages = track.album.images;
          const smallestAlbumImage = albumImages.length
            ? albumImages.reduce(
                (smallest, image) =>
                  image.height < smallest.height ? image : smallest,
                albumImages[0]
              )
            : null;

          const largestAlbumImage = albumImages.length
            ? albumImages.reduce(
                (largest, image) =>
                  image.height > largest.height ? image : largest,
                albumImages[0]
              )
            : null;

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage ? smallestAlbumImage.url : null,
            largeAlbumUrl: largestAlbumImage ? largestAlbumImage.url : null,
            albumName: track.album.name,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Layout>
      <div className={styles.background}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`${styles["background"]} ${styles[`span${i}`]}`}
          ></span>
        ))}
      </div>
      <Container
        className={`d-flex flex-column py-2 ${styles.content}`}
        style={{ height: "100vh" }}
      >
        <Form.Control
          type="search"
          placeholder="Search Songs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <div
              className="mb-3"
              key={track.uri}
              onClick={() => chooseTrack(track)}
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {track.albumUrl && ( // Add conditional check for albumUrl
                <Image
                  src={track.albumUrl}
                  alt={`${track.title} album cover`}
                  width={64}
                  height={64}
                  layout="fixed"
                />
              )}
              <Card.Body>
                <div>{track.title}</div>
                <div>{track.albumName}</div>
                <div style={{ color: "gray" }}>{track.artist}</div>
              </Card.Body>
            </div>
          ))}
          {searchResults.length === 0 && trackName && (
            <div className="text-center" style={{ whiteSpace: "pre-wrap" }}>
              <Image
                src={trackName.largeAlbumUrl}
                alt={`${trackName.title} album cover`}
                width={300}
                height={300}
                layout="intrinsic"
              />
              <h2>{trackName.title}</h2>
              <h4>{trackName.albumName}</h4>
              <p>{trackName.artist}</p>
              {lyrics.startsWith("http") ? (
                <a href={lyrics} target="_blank" rel="noopener noreferrer">
                  View Lyrics on Genius
                </a>
              ) : (
                <p>{lyrics}</p>
              )}
            </div>
          )}
        </div>
        <div className="player-position">
          <Player accessToken={accessToken} trackUri={trackName?.uri} />
        </div>
      </Container>
    </Layout>
  );
}
