# 🎓 Beginner's Guide: React State, Hooks & Routing

Welcome to the **React States & Fundamentals Tutorial Project** (GIZ Tech4Youth — Week 4)!

This project is a beginner-friendly hands-on playground designed to teach you the foundational building blocks of modern React development. By exploring this codebase, you will learn how **state** brings web applications to life, how **components** and **props** structure your user interface, and how **React Router** connects pages together into a seamless single-page application (SPA).

---

## 📑 Table of Contents

1. [🚀 Quick Start: How to Run the App](#-quick-start-how-to-run-the-app)
2. [📁 Project Architecture & File Structure](#-project-architecture--file-structure)
3. [💡 Core Concepts Explained](#-core-concepts-explained)
   - [1. Components & JSX Syntax](#1-components--jsx-syntax)
   - [2. The `useState` Hook (State Management)](#2-the-usestate-hook-state-management)
   - [3. Controlled Components & Forms](#3-controlled-components--forms)
   - [4. Derived State (Computed Values)](#4-derived-state-computed-values)
   - [5. Component Reusability & Props](#5-component-reusability--props)
   - [6. Rendering Lists with `.map()` and the `key` Prop](#6-rendering-lists-with-map-and-the-key-prop)
   - [7. Conditional Rendering](#7-conditional-rendering)
   - [8. Client-Side Routing with `react-router-dom`](#8-client-side-routing-with-react-router-dom)
   - [9. Data Fetching & Side Effects with `useEffect`](#9-data-fetching--side-effects-with-useeffect)
   - [10. Styling in React](#10-styling-in-react)
4. [🧭 Page-by-Page Code Walkthrough](#-page-by-page-code-walkthrough)
5. [⚠️ Common Beginner Pitfalls & Pro Tips](#️-common-beginner-pitfalls--pro-tips)
6. [🎯 Practice Challenges to Level Up](#-practice-challenges-to-level-up)

---

## 🚀 Quick Start: How to Run the App

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer (version 18 or newer recommended).

### Steps to Run
1. Open your terminal in the project directory:
   ```bash
   cd "usestate app"
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL displayed in your terminal (usually `http://localhost:5173`).

---

## 📁 Project Architecture & File Structure

Here is how the project is organized:

```text
usestate app/
├── index.html               # Main HTML entry point where React mounts
├── package.json             # Project dependencies and script definitions
├── vite.config.js           # Vite build configuration
└── src/
    ├── main.jsx             # React entry point: initializes React DOM and Router
    ├── App.jsx              # Root layout component containing page route definitions
    ├── App.css              # App-wide supplemental styles
    ├── index.css            # Global base CSS styles
    ├── components/          # Reusable building blocks
    │   ├── Header.jsx       # Top navigation bar with navigation links
    │   ├── ProductCard.jsx  # Reusable card component accepting props
    │   └── product.css      # Stylesheet for ProductCard component
    ├── pages/               # Page components corresponding to individual routes
    │   ├── Home.jsx         # Legal Fee Calculator (numbers, booleans, derived state)
    │   ├── Login.jsx        # Login form with programmatic navigation
    │   ├── Dashboard.jsx    # Protected landing page consuming route state
    │   ├── Products.jsx     # Dynamic search, array state mutations, and tables
    │   ├── ProductsPage.jsx # Card catalog rendering data with props
    │   └── Utilpage.jsx     # API data fetching using useEffect and async/await
    └── data/                # Mock data sources
        ├── companyData.js   # Sample object exports
        └── products.js      # Array of e-commerce product objects
```

---

## 💡 Core Concepts Explained

### 1. Components & JSX Syntax

#### What is a Component?
In React, a **component** is a self-contained, reusable JavaScript function that returns user interface elements.

#### What is JSX?
**JSX** (JavaScript XML) allows you to write HTML-like markup directly inside your JavaScript code.

```jsx
// src/components/Header.jsx
function Header() {
  return (
    <header>
      <h1>Abu Developer</h1>
    </header>
  );
}

export default Header;
```

#### Key Rules of JSX:
- **Single Root Element**: A component must return a single top-level element or a React Fragment (`<> ... </>`).
- **`className` instead of `class`**: Because `class` is a reserved keyword in JavaScript, React uses `className`.
- **Dynamic Expressions `{ }`**: Anything inside curly brackets `{}` is evaluated as JavaScript (variables, math, function calls).
- **Self-Closing Tags**: Tags without children must close themselves: `<input />` or `<img />`.

---

### 2. The `useState` Hook (State Management)

#### What is State?
In vanilla JavaScript, regular variables (`let count = 0`) hold values, but changing them **does not notify the browser to re-render**. 

In React, **State** is special memory tied to a component. When state changes, React automatically re-runs the component function and updates the screen.

#### Syntax:
```jsx
const [stateValue, setterFunction] = useState(initialValue);
```

#### Types of State in this Project:

| Type | Example from Project | Code Snippet |
| :--- | :--- | :--- |
| **Number** | Hour worked input | `const [hourWorked, setHourWorked] = useState(0);` |
| **Boolean** | Checkbox toggles | `const [isDiscount, setIsDiscount] = useState(false);` |
| **String** | Input fields | `const [enterUsername, setEnterUsername] = useState("");` |
| **Array** | List of students | `const [students, setStudents] = useState([{ name: "Obi", age: 12 }]);` |

---

### 3. Controlled Components & Forms

A **controlled component** is an input form element whose value is controlled by React state.

Whenever the user types or clicks:
1. An event listener (`onChange`) fires.
2. The event handler reads `event.target.value` (or `event.target.checked` for checkboxes).
3. The setter function updates state.
4. React re-renders the input with the new value.

#### Example: Number Input in `Home.jsx`
```jsx
const [hourWorked, setHourWorked] = useState(0);

<input
  type="number"
  value={hourWorked}
  onChange={(event) => setHourWorked(event.target.value)}
/>
```

#### Example: Checkbox Input in `Home.jsx`
```jsx
const [isDiscount, setIsDiscount] = useState(false);

<input
  type="checkbox"
  checked={isDiscount}
  onChange={(event) => setIsDiscount(event.target.checked)}
/>
```

> [!TIP]
> Notice how inputs pass values as strings! When doing calculations, convert numeric inputs using `Number(event.target.value)` or `Number(hourWorked)`.

---

### 4. Derived State (Computed Values)

Beginners often make the mistake of creating an extra state variable for values that can easily be calculated from existing state.

In [Home.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Home.jsx), look at how calculations are done without extra state:

```jsx
// State variables:
const [hourWorked, setHourWorked] = useState(0);
const [hourlyRate, setHourlyRate] = useState(0);
const [additionalExpense, setAdditionalExpense] = useState(0);
const [discountValue, setDiscountValue] = useState(0);
const [isDiscount, setIsDiscount] = useState(false);
const [isVAT, setVAT] = useState(false);

// Derived state (calculated automatically on every render):
const legalRateFee = Number(hourWorked) * Number(hourlyRate);
const subTotal = Number(legalRateFee) + Number(additionalExpense);
const legalDiscount = (discountValue / 100) * subTotal;
const mainTotal = isDiscount ? subTotal - legalDiscount : subTotal;
const legalPlusVAT = isVAT ? mainTotal * 0.75 : mainTotal;
```

> [!NOTE]
> **Why is this best practice?**
> You avoid synchronization bugs. If `hourWorked` changes, `legalRateFee` is instantly updated on the next line without waiting for an extra setter!

---

### 5. Component Reusability & Props

#### What are Props?
**Props** (short for properties) allow parent components to pass data down to child components, just like function arguments.

#### Example: `ProductCard.jsx`
The `ProductCard` component receives an object called `props`:

```jsx
// src/components/ProductCard.jsx
function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.thumbnail} alt={props.title} />
      <div className="product-info">
        <h3>{props.title}</h3>
        <p className="description">{props.description}</p>
        <p className="price">₦{props.price}</p>
        <p className="category">{props.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;
```

#### Passing Props from `ProductsPage.jsx`:
```jsx
<ProductCard
  title={p.title}
  thumbnail={p.thumbnail}
  price={p.price}
  description={p.description}
  category={p.category}
/>
```

The parent controls the data; the child controls how it looks.

---

### 6. Rendering Lists with `.map()` and the `key` Prop

To render a list of items dynamically, React developers use standard JavaScript `.map()`.

#### Example from `ProductsPage.jsx`:
```jsx
const [names, setNames] = useState(["Jack", "Peter", "Obi"]);

return (
  <div>
    {names.map((name, index) => (
      <p key={index}>{name}</p>
    ))}
  </div>
);
```

#### Updating Array State Immutably:
In [Products.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Products.jsx), adding a new student must **never** mutate the existing array directly (e.g., `students.push(...)` is bad practice):

```jsx
// CORRECT: Spread syntax creates a brand new array reference
const addNewStudent = () => {
  const newStudent = { name: studentName, age: 10 };
  setStudents([...students, newStudent]);
};
```

#### Why does React need `key`?
The `key` attribute gives each item a stable identity. When list items move, add, or get deleted, React uses `key` to only update the modified DOM node instead of re-rendering the entire list.

---

### 7. Conditional Rendering

Conditional rendering displays different UI elements depending on current state.

#### 1. Ternary Operator (`condition ? <True /> : <False />`)
Used in [Home.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Home.jsx) to show the discount input only when the discount checkbox is checked:

```jsx
{isDiscount ? (
  <div>
    <label>Discount </label>
    <input
      type="number"
      value={discountValue}
      onChange={(event) => setDiscountValue(event.target.value)}
    />
  </div>
) : (
  <></>
)}
```

#### 2. Loading State Pattern
Used in [Utilpage.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Utilpage.jsx) while waiting for network requests:

```jsx
{loading ? (
  <p>Loading users...</p>
) : (
  users.map((user) => <h3 key={user.id}>{user.quote}</h3>)
)}
```

---

### 8. Client-Side Routing with `react-router-dom`

Traditional websites reload the whole page when clicking links. React Router enables **Single Page Application (SPA)** behavior: navigation happens instantaneously in the browser without reloading the page.

#### Setup in `main.jsx`:
Wrap the entire application in `<BrowserRouter>`:
```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

#### Defining Routes in `App.jsx`:
```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products-page" element={<ProductsPage />} />
</Routes>
```

#### Navigation Links with `<Link>` in `Header.jsx`:
Use `<Link to="...">` instead of `<a href="...">` to prevent full page refreshes:
```jsx
// src/components/Header.jsx
import { Link } from 'react-router-dom';

<nav>
  <Link to="/">Calculator</Link>
  <Link to="/login">Login</Link>
  <Link to="/products">Products</Link>
</nav>
```

#### Programmatic Navigation & Route State:
In [Login.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Login.jsx), the `useNavigate` hook redirects the user after credentials pass validation:
```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function loginBtn() {
  if (enterUsername === correctUsername && enterPassword === correctPassword) {
    // Navigate and pass state to the next page:
    navigate("/dashboard", {
      state: {
        userName: "Abu Uche",
        userEmail: enterUsername
      }
    });
  } else {
    alert("Login Fail");
  }
}
```

In [Dashboard.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Dashboard.jsx), retrieve the passed data using `useLocation`:
```jsx
import { useLocation } from "react-router-dom";

export function Dashboard() {
  const location = useLocation();
  const { userName, userEmail } = location.state || {};

  return <h1>Welcome {userName} ({userEmail})</h1>;
}
```

---

### 9. Data Fetching & Side Effects with `useEffect`

#### What is `useEffect`?
The `useEffect` hook lets you perform **side effects** in functional components (such as fetching data from an API, setting timers, or subscribing to events).

#### Example from `Utilpage.jsx`:
```jsx
// src/pages/Utilpage.jsx
import { useState, useEffect } from "react";

function UtilPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Define async fetch function
    const getUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setUsers(data.quotes);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    // 2. Invoke it
    getUsers();
  }, []); // 3. Empty dependency array: runs only ONCE when component mounts!

  return (
    <div>
      {loading ? <p>Loading...</p> : users.map(u => <p key={u.id}>{u.quote}</p>)}
    </div>
  );
}
```

> [!IMPORTANT]
> The second parameter `[]` is the **dependency array**. 
> - `[]` = Run once after initial render (mount).
> - `[someState]` = Run whenever `someState` changes.
> - Omitted = Runs after **every** render (danger of infinite loops when updating state!).

---

### 10. Styling in React

This project illustrates three common styling methods in React:

1. **Global CSS**: Loaded in `main.jsx` via `import './index.css';`, applies across the entire app.
2. **Component-scoped CSS**: Loaded in specific components like `import './product.css'` in `ProductCard.jsx`.
3. **Inline Styles as JavaScript Objects**:
   ```jsx
   // Notice camelCase property names and double braces {{ }}
   <header style={{
     display: "flex",
     justifyContent: "space-between",
     backgroundColor: "aqua"
   }}>
   ```

---

## 🧭 Page-by-Page Code Walkthrough

| Page / File | Route | What you learn from it |
| :--- | :--- | :--- |
| [Home.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Home.jsx) | `/` | Number and Boolean `useState`, controlled inputs, live fee & VAT calculations, dynamic conditional fields. |
| [Login.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Login.jsx) | `/login` | String inputs, basic credential validation, `useNavigate()` programmatic route changes with payload. |
| [Dashboard.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Dashboard.jsx) | `/dashboard` | Extracting navigation state via `useLocation().state`. |
| [Products.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Products.jsx) | `/products` | Real-time array filtering (`.filter()`), adding items to array state with spread syntax (`[...students, newStudent]`), and rendering HTML tables. |
| [ProductsPage.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/ProductsPage.jsx) | `/products-page` | Importing external data files, passing props to child cards (`<ProductCard />`). |
| [Utilpage.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Utilpage.jsx) | `/util` | Fetching remote REST APIs with `fetch()` and `useEffect()`, handling loading and error states. |

---

## ⚠️ Common Beginner Pitfalls & Pro Tips

### ❌ 1. Direct State Mutation
```jsx
// ❌ WRONG: React will NOT trigger a re-render
students.push({ name: "Anna", age: 11 });

// ✅ CORRECT: Create a new array with the spread operator
setStudents([...students, { name: "Anna", age: 11 }]);
```

### ❌ 2. Treating Form Input as a Number
HTML input values are always strings by default.
```jsx
// ❌ WRONG: "10" + "20" becomes "1020"
const total = hourWorked + hourlyRate;

// ✅ CORRECT: Explicit conversion
const total = Number(hourWorked) + Number(hourlyRate);
```

### ❌ 3. Forgetting Fallbacks on Route State
When navigating directly to `/dashboard` via the URL bar, `location.state` will be `null` and cause a crash:
```jsx
// ❌ RISKY:
const { userName, userEmail } = location.state; // Error: Cannot destructure property of null

// ✅ SAFE:
const { userName = "Guest", userEmail = "" } = location.state || {};
```

### ❌ 4. Missing Dependency Array in `useEffect`
```jsx
// ❌ DANGER: Causes an infinite fetch loop!
useEffect(() => {
  fetchData().then(data => setData(data));
});

// ✅ CORRECT: Empty array runs once on mount
useEffect(() => {
  fetchData().then(data => setData(data));
}, []);
```

---

## 🎯 Practice Challenges to Level Up

Want to test what you've learned? Try building these features yourself:

1. **Delete Student**: In [Products.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Products.jsx), add a "Delete" button next to each student that removes them from the array using `.filter()`.
2. **Clear Form After Submit**: When clicking the "Add" student button, automatically clear the input box by calling `setStudentName("")`.
3. **Connect the Util Page Route**: Open [App.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/App.jsx) and add `<Route path="/util" element={<UtilPage />} />` so the header link works properly.
4. **Case-Insensitive Product Search**: In [Products.jsx](file:///c:/Users/DELL/Downloads/GIZ%20tech4youth/week4react/react-states-app/usestateapp/usestate%20app/src/pages/Products.jsx), update `.filter()` with `.toLowerCase()` so searching works regardless of uppercase or lowercase letters.

---

*Happy Coding! 🎉 Keep experimenting and building with React!*
