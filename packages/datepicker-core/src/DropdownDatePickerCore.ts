import {
    CoreOptions,
    DateOrderType,
    DayFormatType,
    LabelPartType,
    MonthFormatType,
    SortYearsType,
} from "./types";
import { getOrdinalDay } from "./utils/formatDate";

export class DropdownDatePickerCore {
    private date: Date;
    private onChange?: (date: Date) => void;
    private onDayChange?: (day: number) => void;
    private onMonthChange?: (day: number) => void;
    private onYearChange?: (day: number) => void;
    private yearRange: [number, number];
    private dayFormat: DayFormatType;
    private monthFormat: MonthFormatType;
    public dateOrder: DateOrderType;
    private minDate?: Date;
    private maxDate?: Date;
    private allowFuture: boolean;
    private allowPast: boolean;
    private sortYears: SortYearsType;
    private locale: string;

    constructor(options: CoreOptions) {
        const today = new Date();

        this.date =
            options.initialDate instanceof Date &&
            !isNaN(options.initialDate.getTime())
                ? options.initialDate
                : today;
        this.onChange = options.onChange;
        this.onDayChange = options.onDayChange;
        this.onMonthChange = options.onMonthChange;
        this.onYearChange = options.onYearChange;
        const currentYear = today.getFullYear();
        this.yearRange = options.yearRange ?? [1900, currentYear];
        this.dayFormat = options.dayFormat ?? "number";
        this.monthFormat = options.monthFormat ?? "long";
        this.dateOrder = options.dateOrder ?? ["day", "month", "year"];
        this.minDate = options.minDate;
        this.maxDate = options.maxDate;
        this.allowFuture = options.allowFuture ?? true;
        this.allowPast = options.allowPast ?? true;
        this.sortYears = options.sortYears ?? "asc";
        this.locale = options.locale ?? "en";

        if (options.minAge !== undefined) {
            this.maxDate = new Date(
                today.getFullYear() - options.minAge,
                today.getMonth(),
                today.getDate()
            );
        }

        if (options.maxAge !== undefined) {
            this.minDate = new Date(
                today.getFullYear() - options.maxAge,
                today.getMonth(),
                today.getDate()
            );
        }
    }

    getDate(): Date {
        return this.date;
    }

    getDay(): number {
        return this.date.getDate();
    }

    getMonth(): number {
        return this.date.getMonth();
    }

    getYear(): number {
        return this.date.getFullYear();
    }

    getCurrentDate(): Date {
        return new Date();
    }

    getCurrentDay(): number {
        return this.getCurrentDate().getDate();
    }

    getCurrentMonth(): number {
        return this.getCurrentDate().getMonth();
    }

    getCurrentYear(): number {
        return this.getCurrentDate().getFullYear();
    }

    getDaysInMonth(month = this.getMonth(), year = this.getYear()): number {
        return new Date(year, month + 1, 0).getDate();
    }

    getAvailableDays(): number[] {
        const days = this.getDaysInMonth();
        const currentDay = this.getCurrentDay();
        const currentMonth = this.getCurrentMonth();
        const currentYear = this.getCurrentYear();

        let availableDays = Array.from({ length: days }, (_, i) => i + 1);

        // apply allowPast and allowFuture

        if (
            currentMonth === this.getMonth() &&
            currentYear === this.getYear()
        ) {
            availableDays = availableDays.filter((day) => {
                if (!this.allowPast && !this.allowFuture) {
                    return day === currentDay;
                }
                if (!this.allowPast) {
                    return day >= currentDay;
                }
                if (!this.allowFuture) {
                    return day <= currentDay;
                }
                return true;
            });
        }

        // apply minDate and maxDate

        if (
            this.minDate &&
            this.date.getFullYear() === this.minDate.getFullYear() &&
            this.date.getMonth() === this.minDate.getMonth()
        ) {
            availableDays = availableDays.filter(
                (day) => day >= this.minDate!.getDate()
            );
        }

        if (
            this.maxDate &&
            this.date.getFullYear() === this.maxDate.getFullYear() &&
            this.date.getMonth() === this.maxDate.getMonth()
        ) {
            availableDays = availableDays.filter(
                (day) => day <= this.maxDate!.getDate()
            );
        }

        return availableDays;
    }

    getAvailableMonths(): number[] {
        let months = this.getAvailableMonthsUnfiltered();
        const currentYear = this.getCurrentYear();
        const currentMonth = this.getCurrentMonth();

        // apply minDate and maxDate

        if (
            this.minDate &&
            this.date.getFullYear() === this.minDate.getFullYear()
        ) {
            months = months.filter((m) => m >= this.minDate!.getMonth());
        }

        if (
            this.maxDate &&
            this.date.getFullYear() === this.maxDate.getFullYear()
        ) {
            months = months.filter((m) => m <= this.maxDate!.getMonth());
        }

        // apply allowPast and allowFuture

        if (!this.allowPast && currentYear === this.getYear()) {
            months = months.filter((month) => month >= currentMonth);
        }

        if (!this.allowFuture && currentYear === this.getYear()) {
            months = months.filter((month) => month <= currentMonth);
        }

        return months;
    }

    private getAvailableMonthsUnfiltered(): number[] {
        return Array.from({ length: 12 }, (_, i) => i);
    }

    getAvailableYears(): number[] {
        let [start, end] = this.yearRange;

        // apply minDate and maxDate

        if (this.minDate) {
            start = Math.max(start, this.minDate.getFullYear());
        }

        if (this.maxDate) {
            end = Math.min(end, this.maxDate.getFullYear());
        }

        let years = Array.from(
            { length: end - start + 1 },
            (_, i) => start + i
        );

        // apply allowPast and allowFuture

        const currentYear = this.getCurrentYear();
        if (!this.allowPast) {
            years = years.filter((year) => year >= currentYear);
        }

        if (!this.allowFuture) {
            years = years.filter((year) => year <= currentYear);
        }

        if (this.sortYears === "desc") {
            years.reverse();
        }

        return years;
    }

    setDateFromParts(day: number, month: number, year: number): void {
        const daysInMonth = this.getDaysInMonth(month, year);
        const safeDay = Math.min(day, daysInMonth);
        this.date = new Date(year, month, safeDay);
        this.onChange?.(this.date);
    }

    setDay(day: number): void {
        this.setDateFromParts(day, this.getMonth(), this.getYear());
        this.onDayChange?.(day);
    }

    setMonth(month: number): void {
        this.setDateFromParts(this.getDay(), month, this.getYear());
        this.onMonthChange?.(month + 1);
    }

    setYear(year: number): void {
        this.setDateFromParts(this.getDay(), this.getMonth(), year);
        this.onYearChange?.(year);
    }

    getLocalizedOrdinal(day: number, locale: string): string {
        const suffixes: Record<string, (day: number) => string> = {
            en: (d) => {
                if (d > 3 && d < 21) return `${d}th`;
                switch (d % 10) {
                    case 1:
                        return `${d}st`;
                    case 2:
                        return `${d}nd`;
                    case 3:
                        return `${d}rd`;
                    default:
                        return `${d}th`;
                }
            },
            fr: (d) => (d === 1 ? `${d}er` : `${d}e`),
            es: (d) => `${d}º`,
            it: (d) => `${d}º`,
            de: (d) => `${d}.`,
            pt: (d) => `${d}.º`,
            ja: (d) => `${d}日`, // Japanese format (1日, 2日, etc.)
            zh: (d) => `第${d}日`, // Chinese ordinal
            other: (d) => this.getLocalizedNumber(d, locale),
        };

        const formatter = suffixes[locale] ?? suffixes["other"];
        if (formatter) {
            return formatter(day);
        }
        throw new Error("No formatter found for locale and fallback failed.");
    }

    getNumberingSystemForLocale(locale: string): string {
        const format = new Intl.NumberFormat(locale);
        return format.resolvedOptions().numberingSystem;
    }

    getLocalizedNumber(value: number, locale: string): string {
        return new Intl.NumberFormat(locale, {
            numberingSystem: this.getNumberingSystemForLocale(locale),
        }).format(value);
    }

    formatDay(day: number): string {
        if (typeof this.dayFormat === "function") return this.dayFormat(day);
        if (this.dayFormat === "ordinal")
            return this.getLocalizedOrdinal(day, this.locale);
        return this.getLocalizedNumber(day, this.locale)
            .toString()
            .padStart(2, "0");
    }

    formatMonth(month: number): string {
        if (typeof this.monthFormat === "function")
            return this.monthFormat(month);

        const date = new Date(0, month);

        if (this.monthFormat === "short")
            return date.toLocaleString(this.locale, { month: "short" });
        if (this.monthFormat === "long")
            return date.toLocaleString(this.locale, { month: "long" });
        return this.getLocalizedNumber(month + 1, this.locale)
            .toString()
            .padStart(2, "0");
    }

    formatYear(year: number): string {
        return this.getLocalizedNumber(year, this.locale).toString();
    }

    getFormattedDays(): { label: string; value: number }[] {
        return this.getAvailableDays().map((day) => ({
            value: day,
            label: this.formatDay(day),
        }));
    }

    getFormattedMonths(): { label: string; value: number }[] {
        return this.getAvailableMonths().map((month) => ({
            value: month,
            label: this.formatMonth(month),
        }));
    }

    getFormattedYears(): { label: string; value: number }[] {
        return this.getAvailableYears().map((year) => ({
            value: year,
            label: this.formatYear(year),
        }));
    }

    // getFormattedDateParts(): { label: string; value: number }[][] {
    //     // Based on the dateOrder configuration, return the correct order for day, month, and year
    //     return this.dateOrder.map((part) => {
    //         switch (part) {
    //             case "day":
    //                 return this.getFormattedDays();
    //             case "month":
    //                 return this.getFormattedMonths();
    //             case "year":
    //                 return this.getFormattedYears();
    //             default:
    //                 return [];
    //         }
    //     });
    // }

    getFormattedDateParts(): LabelPartType[] {
        return this.dateOrder.map((part) => ({
            type: part,
            options:
                part === "day"
                    ? this.getFormattedDays()
                    : part === "month"
                      ? this.getFormattedMonths()
                      : this.getFormattedYears(),
        }));
    }

    private isSameYearMonth(date: Date, y: number, m: number): boolean {
        return date.getFullYear() === y && date.getMonth() === m;
    }
}
