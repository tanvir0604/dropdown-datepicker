<template>
    <div :class="containerClassName">
        <div
            v-for="(part, index) in formattedDateParts"
            :key="index"
            class="flex flex-col"
        >
            <!-- Show label if enabled -->
            <label v-if="showLabel" :class="labelClassName">
                {{ labelMap[part.type] || part.type }}
            </label>

            <select
                :value="getValueForType(part.type)"
                @change="handleSelectChange(part.type, $event)"
                :class="selectClassName"
                :required="required"
            >
                <option disabled value="" :class="optionClassName">
                    {{ labelMap[part.type] || part.type }}
                </option>
                <option
                    v-for="option in part.options"
                    :key="option.value"
                    :value="option.value"
                    :class="optionClassName"
                >
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import { DropdownDatePickerCore } from "@dropdown-datepicker/core";
import {
    DateOrderType,
    DayFormatType,
    MonthFormatType,
    SortYearsType,
    StyleProps,
} from "@dropdown-datepicker/core";

export default defineComponent({
    name: "DropdownDatePicker",
    props: {
        initialDate: { type: Date, default: undefined },
        onChange: {
            type: Function as PropType<(date: Date) => void>,
            default: undefined,
        },
        onDayChange: {
            type: Function as PropType<(day: number) => void>,
            default: undefined,
        },
        onMonthChange: {
            type: Function as PropType<(month: number) => void>,
            default: undefined,
        },
        onYearChange: {
            type: Function as PropType<(year: number) => void>,
            default: undefined,
        },
        yearRange: {
            type: Array as PropType<[number, number]>,
            default: () => [1900, new Date().getFullYear()],
        },
        dayFormat: {
            type: String as PropType<DayFormatType>,
            default: "number",
        },
        monthFormat: {
            type: String as PropType<MonthFormatType>,
            default: "long",
        },
        dateOrder: {
            type: Array as PropType<DateOrderType>,
            default: () => ["day", "month", "year"],
        },
        minDate: { type: Date, default: undefined },
        maxDate: { type: Date, default: undefined },
        allowFuture: { type: Boolean, default: true },
        allowPast: { type: Boolean, default: true },
        sortYears: { type: String as PropType<SortYearsType>, default: "asc" },
        maxAge: { type: Number, default: undefined },
        minAge: { type: Number, default: undefined },
        showLabel: { type: Boolean, default: false },
        labelMap: {
            type: Object as PropType<
                Partial<Record<"day" | "month" | "year", string>>
            >,
            default: () => ({}),
        },
        required: { type: Boolean, default: false },
        locale: { type: String, default: undefined },
        containerClassName: { type: String, default: "" },
        selectClassName: { type: String, default: "" },
        optionClassName: { type: String, default: "" },
        labelClassName: { type: String, default: "" },
    },
    setup(props) {
        const core = ref<DropdownDatePickerCore | null>(null);
        const day = ref<number | null>(null);
        const month = ref<number | null>(null);
        const year = ref<number | null>(null);
        const formattedDateParts = ref<any[]>([]);

        onMounted(() => {
            core.value = new DropdownDatePickerCore({
                initialDate: props.initialDate,
                onChange: props.onChange,
                onDayChange: props.onDayChange,
                onMonthChange: props.onMonthChange,
                onYearChange: props.onYearChange,
                yearRange: props.yearRange,
                dayFormat: props.dayFormat,
                monthFormat: props.monthFormat,
                dateOrder: props.dateOrder,
                minDate: props.minDate,
                maxDate: props.maxDate,
                allowFuture: props.allowFuture,
                allowPast: props.allowPast,
                sortYears: props.sortYears,
                maxAge: props.maxAge,
                minAge: props.minAge,
                locale: props.locale,
            });

            if (core.value) {
                day.value = core.value.getDay();
                month.value = core.value.getMonth();
                year.value = core.value.getYear();
                formattedDateParts.value = core.value.getFormattedDateParts();
            }
        });

        const getValueForType = (type: string): number | null => {
            if (type === "day") return day.value;
            if (type === "month") return month.value;
            if (type === "year") return year.value;
            return null;
        };

        const handleSelectChange = (
            type: "day" | "month" | "year",
            event: Event
        ) => {
            const target = event.target as HTMLSelectElement | null;
            if (!target || !target.value) return;

            const numberValue = Number(target.value);
            if (type === "day") {
                day.value = numberValue;
                core.value?.setDay(numberValue);
            } else if (type === "month") {
                month.value = numberValue;
                core.value?.setMonth(numberValue);
            } else if (type === "year") {
                year.value = numberValue;
                core.value?.setYear(numberValue);
            }
        };

        return {
            formattedDateParts,
            getValueForType,
            handleSelectChange,
        };
    },
});
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
