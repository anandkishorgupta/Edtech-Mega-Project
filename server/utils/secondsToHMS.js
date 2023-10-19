export function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const time = `${hours}h ${minutes} m ${remainingSeconds} s`
    return {
        time
    };
}

