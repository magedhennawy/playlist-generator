const durationToTime = (duration: number) => {
    let hrs = Math.floor(duration / 1000 / 60 / 60);
    let mins = Math.floor(duration / 1000 / 60) - hrs * 60;
    let secs = Math.floor(duration / 1000) - mins * 60;
    return { hrs, mins, secs };
};

export const durationToString = (duration: number) => {
    let { hrs, mins, secs } = durationToTime(duration);

    return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min ${secs} sec`;
};

export const durationToStringWithColon = (duration: number) => {
    let { hrs, mins, secs } = durationToTime(duration);
    return hrs > 0
        ? `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        : `${mins}:${secs.toString().padStart(2, "0")}`;
};
