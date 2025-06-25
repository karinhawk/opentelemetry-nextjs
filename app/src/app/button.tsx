"use client";

import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import type { Show } from "../utils/schemas/live";
import Link from "next/link";

export function FavouriteShowButton(props: Show) {
  const addShowToFavourites = async (show: Show) => {
    await fetch("http://localhost:3000/api/shows/favourites", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...show }),
    });
  };

  return (
    <button type="button" onClick={() => addShowToFavourites(props)}>
      Add show to favourites
    </button>
  );
}

type UnFavouriteShowButtonProps = {
  broadcastName: string;
};
export function UnFavouriteShowButton(props: UnFavouriteShowButtonProps) {
  const removeShowFromFavourites = async (broadcastName: string) => {
    await fetch("http://localhost:3000/api/shows/favourites", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ broadcastName: broadcastName }),
    });
  };

  return (
    <Link href="/favourites">
      <button
        type="button"
        onClick={() => removeShowFromFavourites(props.broadcastName)}
      >
        Remove show from favourites
      </button>
    </Link>
  );
}

type ListenToShowButtonProps = {
  channelName: string;
};

export function ListenToShowButton(props: ListenToShowButtonProps) {
  const [url, setUrl] = useState("");

  const play = async (channelName: string) => {
    const currentTime = Date.now().toString();
    const streamNumber = channelName === "2" ? channelName : "";
    setUrl(
      `https://stream-relay-geo.ntslive.net/stream${streamNumber}?client=NTSWebApp&device=Missing&t=${currentTime}`
    );
  };

  return (
    <div>
      <button type="button" onClick={() => play(props.channelName)}>
        Listen
      </button>
      {url && (
        <div>
          <ReactAudioPlayer src={url} autoPlay controls />
        </div>
      )}
    </div>
  );
}

type IdentifySongButtonProps = {
  channelName: string;
};

export function IdentifySongButton(props: IdentifySongButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const identify = async (channelName: string) => {
    setIsLoading(true);

    const currentTime = Date.now().toString();
    const streamNumber = channelName === "2" ? channelName : "";
    const url = encodeURIComponent(
      `https://stream-relay-geo.ntslive.net/stream${streamNumber}?client=NTSWebApp&device=Missing&t=${currentTime}`
    );

    const res = await fetch(`http://proxy.default.svc:3001/identify/${url}`);
    const data = await res.json();
    setIsLoading(false);
    console.log(data);
  };

  return (
    <div>
      <button type="button" onClick={() => identify(props.channelName)}>
        What's playing?
      </button>
      {isLoading && <p>Identifying song... this may take a moment</p>}
    </div>
  );
}
