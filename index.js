const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

// Обробка аргументів командного рядка
const argv = yargs
    .option("i", {
        alias: "input",
        description: "Шлях до файлу для читання (обов'язковий параметр)",
        type: "string",
        demandOption: true
    })
    .option("o", {
        alias: "output",
        description: "Шлях до файлу для запису результату",
        type: "string"
    })
    .option("d", {
        alias: "display",
        description: "Вивести результат у консоль",
        type: "boolean",
        default: false
    })
    .argv;

// Перевірка на обов'язковий параметр input
if (!argv.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Шлях до вхідного файлу
const inputFilePath = path.resolve(argv.input);

// Читання та обробка файлу
try {
    const data = fs.readFileSync(inputFilePath, "utf8");

    // Розбираємо JSON
    const reserves = JSON.parse(data);

    // Шукаємо об'єкт з мінімальним значенням
    const minReserve = reserves.reduce((min, item) => 
        item.value < min.value ? item : min
    );

    // Формуємо рядок для виведення
    const output = `${minReserve.txt}:${minReserve.value}`;

    // Якщо задано параметр display, виводимо у консоль
    if (argv.display) {
        console.log(output);
    }

    // Якщо задано параметр output, записуємо у файл
    if (argv.output) {
        const outputFilePath = path.resolve(argv.output);
        fs.writeFileSync(outputFilePath, output);
        console.log("Результат записано у", outputFilePath);
    }

} catch (err) {
    // Помилка при зчитуванні файлу
    if (err.code === "ENOENT") {
        console.error("Cannot find input file");
    } else {
        console.error("Помилка при обробці файлу:", err.message);
    }
    process.exit(1);
}
