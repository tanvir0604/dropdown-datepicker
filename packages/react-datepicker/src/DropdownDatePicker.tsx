"use client";

import React, { useState } from "react";
import {
    DateOrderType,
    DayFormatType,
    DropdownDatePickerCore,
    MonthFormatType,
    SortYearsType,
} from "@dropdown-datepicker/core";
import { StyleProps } from "@dropdown-datepicker/core";

export const DropdownDatePicker = ({
    initialDate,
    onChange,
    onDayChange,
    onMonthChange,
    onYearChange,
    yearRange = [1900, new Date().getFullYear()],
    dayFormat = "number",
    monthFormat = "long",
    dateOrder = ["day", "month", "year"],
    minDate,
    maxDate,
    allowFuture = true,
    allowPast = true,
    sortYears = "asc",
    maxAge,
    minAge,
    containerClassName,
    selectClassName,
    optionClassName,
    showLabel = false,
    labelClassName,
    labelMap,
    required = false,
    locale,
}: {
    initialDate?: Date;
    onChange?: (date: Date) => void;
    onDayChange?: (day: number) => void;
    onMonthChange?: (month: number) => void;
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
    maxAge?: number;
    minAge?: number;
    showLabel?: boolean;
    labelMap?: Partial<Record<"day" | "month" | "year", string>>;
    required?: boolean;
    locale?: string;
} & Partial<StyleProps>) => {
    const [core] = useState(
        () =>
            new DropdownDatePickerCore({
                initialDate,
                onChange,
                onDayChange,
                onMonthChange,
                onYearChange,
                yearRange,
                dayFormat,
                monthFormat,
                dateOrder,
                minDate,
                maxDate,
                allowFuture,
                allowPast,
                sortYears,
                maxAge,
                minAge,
                locale,
            })
    );
    const [day, setDay] = useState(core.getDay());
    const [month, setMonth] = useState(core.getMonth());
    const [year, setYear] = useState(core.getYear());
    const formattedDateParts = core.getFormattedDateParts();

    return (
        <div className={containerClassName}>
            {formattedDateParts.map(({ type, options }) => (
                <div key={type} className="flex flex-col">
                    {showLabel && (
                        <label className={labelClassName}>
                            {labelMap?.[type] ?? type}
                        </label>
                    )}

                    <select
                        value={
                            type === "day"
                                ? day
                                : type === "month"
                                  ? month
                                  : year
                        }
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (type === "day") {
                                setDay(value);
                                core.setDay(value);
                            } else if (type === "month") {
                                setMonth(value);
                                core.setMonth(value);
                            } else {
                                setYear(value);
                                core.setYear(value);
                            }
                        }}
                        className={selectClassName}
                        required={required}
                    >
                        <option disabled value="" className={optionClassName}>
                            {`${labelMap?.[type] ?? type}`}
                        </option>
                        {options.map(({ label, value }) => (
                            <option
                                key={value}
                                value={value}
                                className={optionClassName}
                            >
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};
