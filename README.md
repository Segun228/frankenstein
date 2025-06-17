# Frankenstein

Проект — веб-приложение с бэкендом на Flask + SQLAlchemy и фронтендом на React (Vite).

### Основные возможности

- **REST API** для управления данными (CRUD операции).
- **Инициализация базы данных** через скрипт `setup_db.py`.
- **Клиентская часть** на React с использованием Vite, axios, react-icons.
- **Поддержка CORS** для кросс-доменных запросов.
- **Асинхронное взаимодействие** клиента с сервером без перезагрузки страниц.
- **Базовый роутинг и управление состоянием** на клиенте.
---

## Структура проекта

.
├── app/
│   ├── __init__.py
│   ├── config/
│   │   └── __init__.py
│   ├── models/
│   │   └── __init__.py
│   ├── routes/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── setup/
│       └── __init__.py
├── client/
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── AnimatedContent/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── querries/
│   │   └── zero.css
│   └── vite.config.js
├── instance/
│   └── frankenstein.db
├── README.md
├── requirments.txt
├── run.py
├── setup_db.py
└── venv

## Функциональность

- Получение пользователя по ID
- Создание нового пользователя
- Редактирование данных пользователя
- Удаление пользователя
- Отображение списка всех пользователей

## Технологии


### Backend
- **Python 3.12**
- **Flask 3.1.1** — веб-фреймворк для создания REST API
- **Flask-SQLAlchemy 3.1.1** — ORM для работы с базой данных
- **SQLAlchemy 2.0.41** — библиотека ORM
- **Flask-CORS 6.0.1** — для поддержки кросс-доменных запросов
- **python-dotenv 1.1.0** — для работы с переменными окружения
- **requests 2.32.4** — HTTP-клиент для взаимодействия с внешними API

### Frontend
- **React 19.1.0** — библиотека для построения UI
- **Vite** — инструмент сборки и дев-сервер для React
- **Axios** — HTTP-клиент для запросов к серверу
- **React-bits** — набор готовых анимаций и компонентов
- **React-icons** — библиотека иконок для React
- **GSAP** — библиотека для создания анимаций

### Среда разработки и инструменты
- **ESLint** — для статического анализа кода
- **Node.js и npm** — управление пакетами и сборка frontend части
- **venv** — виртуальное окружение для Python

### База данных
- **SQLite** — встроенная база данных для разработки и тестирования

---

## Структура запросов

- `src/querries/GET/getUsers.js` — запросы на получение пользователей
- `src/querries/POST/createUser.js` — запросы на создание пользователя
- `src/querries/PUT/editUser.js` — запросы на редактирование пользователя
- `src/querries/DELETE/deleteUser.js` — запросы на удаление пользователя

## Инструкция по запуску

### 1. Клонирование репозитория

```bash
git clone https://github.com/Segun228/frankenstein.git
cd frankenstein
```

---

### 2. Настройка и запуск backend (Flask)

1. Создайте и активируйте виртуальное окружение:

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate    # Windows
```

2. Установите зависимости:

```bash
pip install -r requirments.txt
```

3. Создайте базу данных:

```bash
python setup_db.py
```

4. Запустите Flask сервер:

```bash
python run.py
```

---

### 3. Запуск frontend (React)

1. Перейдите в клиентскую папку:

```bash
cd client
```

2. Установите npm зависимости:

```bash
npm install
```

3. Запустите dev сервер:

```bash
npm run dev
```

---

### 4. Использование

- Backend доступен по адресу: `http://localhost:5000`
- Frontend доступен по адресу: `http://localhost:5173` (порт может отличаться)

---

### Примечания

- Убедитесь, что используемые порты свободны.
- Для продакшен-окружения требуется дополнительная настройка сервера.

---

## Файл конфигурации
В корневой директории необходимо создать конфигурационный файл такой структуры:

```env
DEV_PREFIX = "http://localhost:"
PROD_PREFIX = "/"
PORT = 3000
PRODUCTION = False
DEBUG = True
HOST = localhost
```