export type StyleProps = {
    containerClassName?: string;
    selectClassName?: string;
    optionClassName?: string;
    labelClassName?: string;
};

export type MonthFormatType =
    | "short"
    | "long"
    | "number"
    | ((month: number) => string);

export interface DropdownDate {
    day: number;
    month: number;
    year: number;
}

export type DayFormatType = "ordinal" | "number" | ((day: number) => string);

export type DateOrderType = [
    "day" | "month" | "year",
    "day" | "month" | "year",
    "day" | "month" | "year",
];

export type SortYearsType = "asc" | "desc";

export type LabelPartType = {
    type: "day" | "month" | "year";
    options: { label: string; value: number }[];
};

export interface CoreOptions {
    initialDate?: Date;
    onChange?: (date: Date) => void;
    onDayChange?: (day: number) => void;
    onMonthChange?: (monght: number) => void;
    onYearChange?: (year: number) => void;
    yearRange?: [number, number];
    dayFormat?: DayFormatType;
    monthFormat?: MonthFormatType;
    dateOrder?: DateOrderType;
    minDate?: Date;
    maxDate?: Date;
    allowFuture?: boolean;
    allowPast?: boolean;
    sortYears?: SortYearsType;
    minAge?: number;
    maxAge?: number;
    locale?: string;
}
