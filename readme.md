# React Stateful Context
This package makes it easier to make a context hook in react, that acts like a
state hook. This can help to avoid passing state and state setters through deep
component trees.

## Usage

```ts
// useTest.ts

import React from "react";
import { createStatefulContext } from "@frasermcc/stateful-context";

const [useTest, TestContextProvider] = createStatefulContext({
  name: "",
  id: 0,
});

export { useTest, TestContextProvider };
```

```tsx
// Provider file (i.e. app.tsx)

import React from "react";
import { TestContextProvider } from "./useTest"
import { Consumer } from "./Consumer"

export const App: React.FC = () => {
  const [name, setName] = useTest.name;
  const [id, setId] = useTest.id;

  return (
    <TestContextProvider>
      <Consumer />
    </TestContextProvider>
  );
};
```

```tsx
// Some component inside the provider (i.e. Consumer.tsx)

import React from "react";
import { useTest } from "./useTest";

const Consumer: React.FC = () => {
  const [{ name, id }, setTestValues] = useTest();

  const handleClick = () =>
    setTestValues((p) => ({ ...p, id: ~~(Math.random() * 1000) }));

  return (
    <div>
      <h1>{name}</h1>
      <h1>{id}</h1>
      <button onClick={handleClick}>Change my ID</button>
    </div>
  );
};
