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
    ],
  },
]
