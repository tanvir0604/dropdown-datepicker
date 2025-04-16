# @dropdown-datepicker/core

The framework-agnostic core logic for building a customizable dropdown-style datepicker. This package provides utilities and types to handle date selection via **day**, **month**, and **year** dropdowns — making it easy to integrate into any UI framework (React, Vue, Svelte, etc.).

---

## ✨ Features

- 📅 Dropdown selection for day, month, and year
- 📦 Framework-agnostic, pure TypeScript logic
- 🧠 Intelligent handling of leap years and varying month lengths
- 🔧 Designed for use in component libraries or design systems
- 🪶 Lightweight dependency on `dayjs`

---

## 📦 Installation

```bash
npm install @dropdown-datepicker/core
# or
pnpm add @dropdown-datepicker/core
# or
yarn add @dropdown-datepicker/core
```

---

## 🛠️ Usage Example

```ts
import {
    generateDays,
    generateMonths,
    generateYears,
    isValidDate,
} from "@dropdown-datepicker/core";

// Generate options
const days = generateDays(2025, 4); // April 2025
const months = generateMonths(); // January to December
const years = generateYears({ from: 1900, to: 2100 });

// Validate date
const isValid = isValidDate({ day: 31, month: 4, year: 2025 }); // false (April has 30 days)
```

---

## 📚 API Reference

### `generateDays(year: number, month: number): number[]`

Returns the valid days for the given month and year.

### `generateMonths(): { label: string; value: number; }[]`

Returns all months as label/value pairs (e.g., January → 1).

### `generateYears(options: { from: number; to: number }): number[]`

Returns an array of years between the `from` and `to` values.

### `isValidDate({ day, month, year }): boolean`

Checks whether the given date is valid (e.g., 31 Feb is invalid).

---

🐛 Found a bug? [Report it here](https://github.com/tanvir0604/dropdown-datepicker/issues/new?labels=package:core&template=core-bug.yml)

## 🔗 Related

- [`@dropdown-datepicker/react`](https://www.npmjs.com/package/@dropdown-datepicker/react) – A React UI wrapper built using this core

---

## 🧑‍💻 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

MIT © 2025 [Md Shafkat Hussain Tanvir](https://github.com/tanvir0604)
