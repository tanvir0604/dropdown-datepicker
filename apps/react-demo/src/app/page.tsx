"use client";

import { DropdownDatePicker } from "@dropdown-datepicker/react";

export default function HomePage() {
    return (
        <form action={""} method="post">
            <DropdownDatePicker
                onChange={(date) => console.log(date.toLocaleDateString())}
                onDayChange={(day) => console.log(day)}
                onMonthChange={(month) => console.log(month)}
                onYearChange={(year) => console.log(year)}
                initialDate={new Date("2025-04-06")}
                dayFormat={"number"}
                monthFormat={"long"}
                dateOrder={["year", "month", "day"]}
                // minDate={new Date("2020-02-04")}
                // maxDate={new Date("2025-07-04")}
                // allowFuture={false}
                // allowPast={false}
                sortYears="asc"
                maxAge={10}
                minAge={5}
                containerClassName="flex w-full gap-6"
                selectClassName="bg-transparent border-2 border-gray-400"
                optionClassName="bg-black"
                showLabel={true}
                labelClassName="me-2 capitalize"
                labelMap={{ day: "日", month: "月", year: "年" }}
                locale="bn"
            />
        </form>
    );
}
