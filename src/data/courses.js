export const courses = [
  {
    id: 'python-basics',
    title: 'Python: Основы',
    emoji: '🐍',
    color: '#3B82F6',
    description: 'С нуля до первых программ',
    lessons: [
      {
        id: 'py-print',
        title: 'Вывод текста',
        xp: 10,
        theory: `**print()** — функция для вывода текста на экран.

\`\`\`python
print("Привет, мир!")
\`\`\`

Текст нужно заключать в кавычки — одинарные \`'\` или двойные \`"\`.`,
        task: 'Напиши программу, которая выводит: Hello, World!',
        expectedOutput: 'Hello, World!',
        hint: 'Используй print("Hello, World!")',
        type: 'output',
      },
      {
        id: 'py-variables',
        title: 'Переменные',
        xp: 15,
        theory: `**Переменная** — это контейнер для хранения данных.

\`\`\`python
name = "Алибек"
age = 20
print(name)  # Алибек
print(age)   # 20
\`\`\`

Имя переменной пишется слева от \`=\`, значение — справа.`,
        task: 'Создай переменную name со значением "Python" и выведи её на экран.',
        expectedOutput: 'Python',
        hint: 'name = "Python" затем print(name)',
        type: 'output',
      },
      {
        id: 'py-math',
        title: 'Математика',
        xp: 15,
        theory: `Python умеет считать как калькулятор:

\`\`\`python
print(2 + 3)   # 5
print(10 - 4)  # 6
print(3 * 4)   # 12
print(10 / 2)  # 5.0
\`\`\``,
        task: 'Выведи результат: 7 * 6',
        expectedOutput: '42',
        hint: 'print(7 * 6)',
        type: 'output',
      },
      {
        id: 'py-input',
        title: 'Ввод данных',
        xp: 20,
        theory: `**input()** считывает текст от пользователя.

\`\`\`python
name = input("Как тебя зовут? ")
print("Привет, " + name + "!")
\`\`\`

Для упрощения тестирования будем считать что имя = "Алибек".`,
        task: 'Напиши: name = "Алибек" и выведи "Привет, Алибек!"',
        expectedOutput: 'Привет, Алибек!',
        hint: 'print("Привет, " + name + "!")',
        type: 'output',
      },
      {
        id: 'py-if',
        title: 'Условия if/else',
        xp: 25,
        theory: `**if/else** позволяет выполнять код только при определённом условии:

\`\`\`python
age = 18
if age >= 18:
    print("Взрослый")
else:
    print("Ребёнок")
\`\`\`

Обрати внимание на **отступ** (4 пробела) перед print внутри if.`,
        task: 'Напиши код: если score = 90, и score >= 60 — выведи "Сдал", иначе "Не сдал"',
        expectedOutput: 'Сдал',
        hint: 'score = 90, затем if score >= 60: print("Сдал")',
        type: 'output',
      },
      {
        id: 'py-for',
        title: 'Цикл for',
        xp: 30,
        theory: `**for** повторяет код для каждого элемента последовательности.

\`\`\`python
for i in range(5):
    print(i)
# выведет: 0 1 2 3 4
\`\`\`

**range(n)** генерирует числа от 0 до n-1.
**range(1, 6)** — от 1 до 5.

\`\`\`python
for i in range(1, 4):
    print(i)
# выведет: 1 2 3
\`\`\``,
        task: 'Выведи числа от 1 до 3, каждое на новой строке.',
        expectedOutput: '1\n2\n3',
        hint: 'for i in range(1, 4): print(i)',
        type: 'output',
      },
      {
        id: 'py-while',
        title: 'Цикл while',
        xp: 30,
        theory: `**while** выполняет блок кода, пока условие истинно.

\`\`\`python
count = 0
while count < 3:
    print(count)
    count = count + 1
# выведет: 0 1 2
\`\`\`

Не забудь изменять переменную внутри цикла, иначе цикл будет бесконечным!`,
        task: 'Используй while: выведи числа 1, 2, 3 (каждое на новой строке). Начни с n = 1.',
        expectedOutput: '1\n2\n3',
        hint: 'n = 1, while n <= 3: print(n), n = n + 1',
        type: 'output',
      },
      {
        id: 'py-functions',
        title: 'Функции',
        xp: 35,
        theory: `**Функция** — блок кода, который можно вызывать многократно.

\`\`\`python
def greet(name):
    print("Привет, " + name + "!")

greet("Алибек")   # Привет, Алибек!
greet("Мадина")   # Привет, Мадина!
\`\`\`

Функция объявляется через **def**, затем её имя и параметры в скобках.
Функция может **возвращать** значение через **return**:

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 4)
print(result)  # 7
\`\`\``,
        task: 'Напиши функцию square(n), которая возвращает n * n. Вызови square(5) и выведи результат.',
        expectedOutput: '25',
        hint: 'def square(n): return n * n — затем print(square(5))',
        type: 'output',
      },
      {
        id: 'py-lists',
        title: 'Списки',
        xp: 35,
        theory: `**Список** (list) хранит несколько значений в одной переменной.

\`\`\`python
fruits = ["яблоко", "банан", "апельсин"]
print(fruits[0])   # яблоко
print(fruits[1])   # банан
print(len(fruits)) # 3
\`\`\`

Индексация начинается с **0**.
Добавить элемент: **fruits.append("манго")**
Перебрать все:

\`\`\`python
for fruit in fruits:
    print(fruit)
\`\`\``,
        task: 'Создай список numbers = [10, 20, 30]. Выведи первый элемент.',
        expectedOutput: '10',
        hint: 'numbers = [10, 20, 30], затем print(numbers[0])',
        type: 'output',
      },
      {
        id: 'py-strings',
        title: 'Строки',
        xp: 30,
        theory: `Строки в Python — это текст в кавычках. У них есть полезные методы:

\`\`\`python
s = "hello"
print(s.upper())        # HELLO
print(s.capitalize())   # Hello
print(len(s))           # 5
print(s.replace("l", "r"))  # herro
\`\`\`

**f-строки** — удобный способ вставить переменную в текст:

\`\`\`python
name = "Алибек"
age = 20
print(f"Меня зовут {name}, мне {age} лет")
\`\`\``,
        task: 'Создай переменную name = "python". Выведи её в верхнем регистре через .upper().',
        expectedOutput: 'PYTHON',
        hint: 'name = "python", затем print(name.upper())',
        type: 'output',
      },
    ],
  },
  {
    id: 'js-basics',
    title: 'JavaScript: Основы',
    emoji: '⚡',
    color: '#F59E0B',
    description: 'Язык веба с нуля',
    lessons: [
      {
        id: 'js-console',
        title: 'console.log',
        xp: 10,
        theory: `**console.log()** — вывод в консоль браузера.

\`\`\`js
console.log("Привет, мир!");
\`\`\``,
        task: 'Выведи в консоль: Hello, World!',
        expectedOutput: 'Hello, World!',
        hint: 'console.log("Hello, World!")',
        type: 'output',
      },
      {
        id: 'js-variables',
        title: 'let и const',
        xp: 15,
        theory: `В JS переменные объявляются через **let** или **const**:

\`\`\`js
let name = "Алибек";  // можно менять
const PI = 3.14;       // нельзя менять
console.log(name);
\`\`\``,
        task: 'Создай переменную name = "JavaScript" и выведи её.',
        expectedOutput: 'JavaScript',
        hint: 'let name = "JavaScript"; console.log(name);',
        type: 'output',
      },
      {
        id: 'js-math',
        title: 'Математика',
        xp: 15,
        theory: `\`\`\`js
console.log(2 + 3);   // 5
console.log(10 - 4);  // 6
console.log(3 * 4);   // 12
console.log(10 / 2);  // 5
\`\`\``,
        task: 'Выведи результат: 7 * 6',
        expectedOutput: '42',
        hint: 'console.log(7 * 6)',
        type: 'output',
      },
      {
        id: 'js-if',
        title: 'Условия if/else',
        xp: 25,
        theory: `**if/else** работает так же, как в Python, но блоки оборачиваются в **{}**:

\`\`\`js
const age = 18;
if (age >= 18) {
    console.log("Взрослый");
} else {
    console.log("Ребёнок");
}
\`\`\`

Условие всегда в **круглых скобках** \`()\`, тело — в **фигурных** \`{}\`.`,
        task: 'Напиши код: если score = 85 и score >= 60 — выведи "Сдал", иначе "Не сдал".',
        expectedOutput: 'Сдал',
        hint: 'const score = 85; if (score >= 60) { console.log("Сдал"); }',
        type: 'output',
      },
      {
        id: 'js-for',
        title: 'Цикл for',
        xp: 30,
        theory: `В JS цикл **for** имеет три части: инициализация, условие, шаг:

\`\`\`js
for (let i = 1; i <= 3; i++) {
    console.log(i);
}
// выведет: 1 2 3
\`\`\`

- \`let i = 1\` — начальное значение
- \`i <= 3\` — условие продолжения
- \`i++\` — увеличение на 1 после каждой итерации`,
        task: 'Выведи числа от 1 до 3, каждое на новой строке.',
        expectedOutput: '1\n2\n3',
        hint: 'for (let i = 1; i <= 3; i++) { console.log(i); }',
        type: 'output',
      },
      {
        id: 'js-functions',
        title: 'Функции',
        xp: 35,
        theory: `Функции объявляются через **function** или стрелочный синтаксис **=>**:

\`\`\`js
function greet(name) {
    return "Привет, " + name + "!";
}
console.log(greet("Алибек")); // Привет, Алибек!
\`\`\`

Стрелочная функция — более короткая запись:

\`\`\`js
const square = (n) => n * n;
console.log(square(4)); // 16
\`\`\``,
        task: 'Напиши функцию cube(n), которая возвращает n * n * n. Выведи cube(3).',
        expectedOutput: '27',
        hint: 'function cube(n) { return n * n * n; } console.log(cube(3));',
        type: 'output',
      },
      {
        id: 'js-arrays',
        title: 'Массивы',
        xp: 35,
        theory: `**Массив** хранит список значений:

\`\`\`js
const fruits = ["яблоко", "банан", "апельсин"];
console.log(fruits[0]);      // яблоко
console.log(fruits.length);  // 3
\`\`\`

Перебор массива:
\`\`\`js
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
\`\`\`

Или современный способ:
\`\`\`js
fruits.forEach(fruit => console.log(fruit));
\`\`\``,
        task: 'Создай массив numbers = [5, 10, 15]. Выведи второй элемент (индекс 1).',
        expectedOutput: '10',
        hint: 'const numbers = [5, 10, 15]; console.log(numbers[1]);',
        type: 'output',
      },
      {
        id: 'js-strings',
        title: 'Строки',
        xp: 30,
        theory: `Строки в JS имеют полезные методы:

\`\`\`js
const s = "hello";
console.log(s.toUpperCase());  // HELLO
console.log(s.length);         // 5
console.log(s.includes("ell")); // true
\`\`\`

**Шаблонные строки** (template literals) с обратными кавычками:

\`\`\`js
const name = "Алибек";
const age = 20;
console.log(\`Меня зовут \${name}, мне \${age} лет\`);
\`\`\``,
        task: 'Создай переменную name = "javascript". Выведи её в верхнем регистре через .toUpperCase().',
        expectedOutput: 'JAVASCRIPT',
        hint: 'const name = "javascript"; console.log(name.toUpperCase());',
        type: 'output',
      },
    ],
  },
]
