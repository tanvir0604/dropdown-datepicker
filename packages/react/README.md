# @dropdown-datepicker/react

A fully customizable dropdown-based date picker component for **React**, built on top of [`@dropdown-datepicker/core`](https://www.npmjs.com/package/@dropdown-datepicker/core).

This component provides a highly flexible way to select dates using **separate dropdowns** for day, month, and year. Perfect for forms, age input, or anywhere a full calendar is overkill.

---

## ✨ Features

- Separate dropdowns for day, month, and year
- Customizable formats, labels, order, and styling
- Age-based limits (`minAge`, `maxAge`)
- Locale support and label customization
- Min/max date constraints
- Purely functional and easy to style

---

## 📦 Installation

```bash
npm install @dropdown-datepicker/react
# or
pnpm add @dropdown-datepicker/react
```

---

## 🧠 Usage

```tsx
import React from "react";
import { DropdownDatepicker } from "@dropdown-datepicker/react";

function Example() {
    return (
        <DropdownDatepicker
            initialDate={new Date("2000-01-01")}
            onChange={(date) => console.log("Selected date:", date)}
            yearRange={[1950, 2025]}
            dateOrder={["day", "month", "year"]}
            monthFormat="short"
            allowPast={true}
            allowFuture={false}
            minAge={18}
            containerClassName="flex gap-2"
            selectClassName="border px-2 py-1 rounded"
            labelMap={{ day: "Day", month: "Month", year: "Year" }}
            showLabel={true}
        />
    );
}
```

---

## 🧩 Props

| Prop                 | Type                                              | Description                                                                   |
| -------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `initialDate`        | `Date`                                            | The starting selected date.                                                   |
| `onChange`           | `(date: Date) => void`                            | Callback when full date is selected.                                          |
| `onDayChange`        | `(day: number) => void`                           | Callback for day dropdown change.                                             |
| `onMonthChange`      | `(month: number) => void`                         | Callback for month dropdown change.                                           |
| `onYearChange`       | `(year: number) => void`                          | Callback for year dropdown change.                                            |
| `yearRange`          | `[number, number]`                                | Min and max year range for the year dropdown. Default: `[1900, currentYear]`. |
| `dayFormat`          | `"number" \| "ordinal"`                           | Format for day values. `"ordinal"` = "1st", "2nd", etc.                       |
| `monthFormat`        | `"long" \| "short" \| "number"`                   | Format for month values.                                                      |
| `dateOrder`          | `["day", "month", "year"]`                        | The order of the dropdowns. You can rearrange to any combination.             |
| `minDate`            | `Date`                                            | Minimum date allowed.                                                         |
| `maxDate`            | `Date`                                            | Maximum date allowed.                                                         |
| `allowFuture`        | `boolean`                                         | Allow selecting future dates. Default: `true`.                                |
| `allowPast`          | `boolean`                                         | Allow selecting past dates. Default: `true`.                                  |
| `sortYears`          | `"asc" \| "desc"`                                 | Whether to sort year dropdown ascending or descending.                        |
| `minAge`             | `number`                                          | Minimum age required (calculated from today).                                 |
| `maxAge`             | `number`                                          | Maximum age allowed (calculated from today).                                  |
| `containerClassName` | `string`                                          | Class name for the container wrapping all dropdowns.                          |
| `selectClassName`    | `string`                                          | Class name for each `<select>` element.                                       |
| `optionClassName`    | `string`                                          | Class name for each `<option>`.                                               |
| `showLabel`          | `boolean`                                         | Whether to show a label before each dropdown.                                 |
| `labelClassName`     | `string`                                          | Class name for each label element.                                            |
| `labelMap`           | `{ day?: string, month?: string, year?: string }` | Custom labels for each dropdown.                                              |
| `required`           | `boolean`                                         | Add `required` attribute to selects.                                          |
| `locale`             | `string`                                          | Locale used for month names and formatting. (e.g. `"en"`, `"fr"`, `"bn"`)     |

---

## 🌍 Locale Support

Pass the locale:

```tsx
<DropdownDatepicker locale="fr" />
```

---

## 📸 Screenshot / Demo

> Coming soon! You can build a quick demo in Storybook or CodeSandbox using the example above.

---

## 🐛 Issues

Report bugs or suggest features here:  
[👉 Open React Issues](https://github.com/tanvir0604/dropdown-datepicker/issues/new?template=react-bug.yaml)

---

## 📄 License

MIT – © [Md Shafkat Hussain Tanvir](https://github.com/tanvir0604)
