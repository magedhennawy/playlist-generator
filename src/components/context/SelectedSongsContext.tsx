import { createContext } from "react";
import { Song } from "../../lib/types";

export const SelectedSongsContext = createContext<[Song[], (songs: Song[]) => void]>([
    [],
    () => { },
]);
