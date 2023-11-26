import { CONSULTATION_TIMEOUT_MILLISECONDS } from "../config/constants";

export const timeNowUnix = () => Date.now();

export const timeDiffUnix = (futureTimestamp) => {
  const currentTime = Date.now();
  const remainingTime = futureTimestamp - currentTime;
  return remainingTime >= 0 ? remainingTime : 0;
};

export const startCountDown = (countDown) => {
  const timeRemaining = timeDiffUnix(
    countDown + CONSULTATION_TIMEOUT_MILLISECONDS
  );

  return timeNowUnix() + timeRemaining;
};

export const dateTimeFormat = (unixTime) => {
  const date = new Date(unixTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
