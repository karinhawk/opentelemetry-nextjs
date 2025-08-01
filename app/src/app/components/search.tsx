"use client";
import { useRouter } from "next/navigation";
import { type SetStateAction, useState } from "react";
import styles from "../page.module.css";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleInputChange = async (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const search = event.target.value;

    if (search === "" || !search || typeof search !== "string") {
      setSearchInput(search);
      return router.push("/favourites");
    }

    setSearchInput(search);
    router.push(`/favourites?search=${encodeURIComponent(search)}`);
  };

  return (
    <input
      type="text"
      id="inputId"
      placeholder="search"
      value={searchInput ?? ""}
      onChange={handleInputChange}
      className={styles.search}
    />
  );
}
