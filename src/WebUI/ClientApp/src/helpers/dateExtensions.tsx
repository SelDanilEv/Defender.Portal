declare global {
  interface Date {
    toDateOnlyString(): string;
  }
}

Date.prototype.toDateOnlyString = function (): string {
  return this.toISOString().split("T")[0];
};

export {};
