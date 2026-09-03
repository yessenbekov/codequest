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
        hint: 'name = "Алибек"\nprint("Привет, " + name + "!")',
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
        title: 'Вывод текста',
        xp: 10,
        theory: `JavaScript — язык программирования, который работает в браузере и управляет веб-страницами.

Чтобы вывести что-то на экран, используют **console.log()**:

\`\`\`js
console.log("Привет, мир!");
\`\`\`

Текст всегда заключается в кавычки — одинарные \`'\` или двойные \`"\`.

\`\`\`js
console.log("Добро пожаловать!");
console.log('Это тоже работает');
\`\`\``,
        task: 'Напиши программу, которая выводит: Hello, World!',
        expectedOutput: 'Hello, World!',
        hint: 'console.log("Hello, World!")',
        type: 'output',
      },
      {
        id: 'js-variables',
        title: 'Переменные',
        xp: 15,
        theory: `**Переменная** — это контейнер, в котором хранится значение.

В JavaScript переменные создаются через **let** или **const**:

\`\`\`js
let name = "Алибек";   // let — значение можно менять потом
const age = 20;         // const — значение зафиксировано навсегда
\`\`\`

Чтобы вывести переменную — просто передай её имя в console.log:

\`\`\`js
let city = "Алматы";
console.log(city);  // Алматы
\`\`\`

Имя переменной пишется **без кавычек** — иначе выведется сам текст, а не значение.`,
        task: 'Создай переменную name со значением "JavaScript" и выведи её.',
        expectedOutput: 'JavaScript',
        hint: 'let name = "JavaScript";\nconsole.log(name);',
        type: 'output',
      },
      {
        id: 'js-math',
        title: 'Математика',
        xp: 15,
        theory: `JavaScript умеет считать как калькулятор. Математические операции:

\`\`\`js
console.log(2 + 3);    // 5   — сложение
console.log(10 - 4);   // 6   — вычитание
console.log(3 * 4);    // 12  — умножение
console.log(10 / 2);   // 5   — деление
console.log(10 % 3);   // 1   — остаток от деления
\`\`\`

Можно сохранить результат в переменную:

\`\`\`js
let result = 5 * 8;
console.log(result);  // 40
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
        theory: `**if/else** позволяет выполнять разный код в зависимости от условия.

\`\`\`js
const age = 20;

if (age >= 18) {
    console.log("Взрослый");
} else {
    console.log("Ребёнок");
}
\`\`\`

Как это работает:
- Условие пишется в **круглых скобках** \`()\`
- Код при истинном условии — в **фигурных** \`{ }\` после \`if\`
- Код при ложном — в \`{ }\` после \`else\`

Операторы сравнения: \`>\` \`<\` \`>=\` \`<=\` \`===\` (равно) \`!==\` (не равно).`,
        task: 'Создай переменную score = 85. Если score >= 60 — выведи "Сдал", иначе — "Не сдал".',
        expectedOutput: 'Сдал',
        hint: 'const score = 85;\nif (score >= 60) {\n    console.log("Сдал");\n}',
        type: 'output',
      },
      {
        id: 'js-for',
        title: 'Цикл for',
        xp: 30,
        theory: `**Цикл** — это способ повторить один и тот же код несколько раз.

Цикл \`for\` в JavaScript состоит из трёх частей:

\`\`\`js
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// выведет: 1 2 3 4 5
\`\`\`

Разберём по частям:
- \`let i = 1\` — **начало**: создаём счётчик \`i\` равный 1
- \`i <= 5\` — **условие**: продолжаем, пока i не больше 5
- \`i++\` — **шаг**: увеличиваем i на 1 после каждого повтора

Тело цикла (то что повторяется) пишется в \`{ }\`.`,
        task: 'Выведи числа от 1 до 3, каждое на новой строке.',
        expectedOutput: '1\n2\n3',
        hint: 'for (let i = 1; i <= 3; i++) {\n    console.log(i);\n}',
        type: 'output',
      },
      {
        id: 'js-functions',
        title: 'Функции',
        xp: 35,
        theory: `**Функция** — это блок кода, который можно вызывать сколько угодно раз.

\`\`\`js
function greet(name) {
    console.log("Привет, " + name + "!");
}

greet("Алибек");  // Привет, Алибек!
greet("Мадина");  // Привет, Мадина!
\`\`\`

Функция объявляется через слово **function**, затем имя и параметры в \`()\`.

Функция может **возвращать** значение через **return**:

\`\`\`js
function add(a, b) {
    return a + b;
}

let result = add(3, 4);
console.log(result);  // 7
\`\`\``,
        task: 'Напиши функцию cube(n), которая возвращает n * n * n. Вызови cube(3) и выведи результат.',
        expectedOutput: '27',
        hint: 'function cube(n) {\n    return n * n * n;\n}\nconsole.log(cube(3));',
        type: 'output',
      },
      {
        id: 'js-arrays',
        title: 'Массивы',
        xp: 35,
        theory: `**Массив** — это список нескольких значений в одной переменной.

\`\`\`js
const fruits = ["яблоко", "банан", "апельсин"];
\`\`\`

Доступ к элементам — по **индексу**, начиная с нуля:

\`\`\`js
console.log(fruits[0]);  // яблоко  (первый)
console.log(fruits[1]);  // банан   (второй)
console.log(fruits[2]);  // апельсин (третий)
\`\`\`

Количество элементов:
\`\`\`js
console.log(fruits.length);  // 3
\`\`\`

Добавить элемент в конец:
\`\`\`js
fruits.push("манго");
\`\`\``,
        task: 'Создай массив numbers = [5, 10, 15]. Выведи второй элемент (индекс 1).',
        expectedOutput: '10',
        hint: 'const numbers = [5, 10, 15];\nconsole.log(numbers[1]);',
        type: 'output',
      },
      {
        id: 'js-strings',
        title: 'Работа со строками',
        xp: 30,
        theory: `Строка — это любой текст в кавычках. У строк есть встроенные возможности:

\`\`\`js
const word = "hello";
console.log(word.length);          // 5 — длина строки
console.log(word.toUpperCase());   // HELLO — в верхний регистр
console.log(word.toLowerCase());   // hello — в нижний регистр
\`\`\`

**Шаблонные строки** позволяют вставлять переменные прямо в текст. Используй обратные кавычки \` \` и синтаксис \`\${переменная}\`:

\`\`\`js
const name = "Алибек";
const age = 20;
console.log(\`Меня зовут \${name}, мне \${age} лет\`);
// Меня зовут Алибек, мне 20 лет
\`\`\``,
        task: 'Создай переменную name = "javascript". Выведи её в верхнем регистре через .toUpperCase().',
        expectedOutput: 'JAVASCRIPT',
        hint: 'const name = "javascript";\nconsole.log(name.toUpperCase());',
        type: 'output',
      },
    ],
  },
]
