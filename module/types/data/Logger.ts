export type progress = "DETECTED" | "UPDATED" | "DELETED" | "ERROR";

export type progressPrefix = {
  [key: number]: progress;
}