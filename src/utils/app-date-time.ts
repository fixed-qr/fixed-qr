type DateFormat = "datetime" | "date" | "time" | "iso" | "ago";

export class AppDateTime {
  private readonly date: Date;

  constructor(date?: Date | string | number) {
    this.date = new Date(date ?? Date.now());
  }

  get value(): Date {
    return this.date;
  }

  private formatDateTime(): string {
    return `${this.date.getFullYear()}-${String(
      this.date.getMonth() + 1,
    ).padStart(2, "0")}-${String(this.date.getDate()).padStart(
      2,
      "0",
    )} ${String(this.date.getHours()).padStart(2, "0")}:${String(
      this.date.getMinutes(),
    ).padStart(2, "0")}:${String(this.date.getSeconds()).padStart(2, "0")}`;
  }

  private formatAgo(): string {
    const seconds = Math.floor((Date.now() - this.date.getTime()) / 1000);

    if (seconds < 5) {
      return "now";
    }

    const intervals = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "w", seconds: 604800 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
      { label: "s", seconds: 1 },
    ];

    for (const interval of intervals) {
      const value = Math.floor(seconds / interval.seconds);

      if (value >= 1) {
        return `${value}${interval.label}`;
      }
    }

    return "now";
  }

  formatTo(format: DateFormat = "datetime"): string {
    switch (format) {
      case "date":
        return this.date.toLocaleDateString();

      case "time":
        return this.date.toLocaleTimeString();

      case "iso":
        return this.date.toISOString();

      case "ago":
        return this.formatAgo();

      case "datetime":
      default:
        return this.formatDateTime();
    }
  }
}
