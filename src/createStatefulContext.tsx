import React from "react";

type SetFunction<KeyType> = React.Dispatch<React.SetStateAction<KeyType>>;

export function createStatefulContext<T extends {}>(defaults: T) {
  const Context = React.createContext<[T, SetFunction<T>]>([
    defaults,
    () => {},
  ]);

  const StatefulContextComponent: React.FC = ({ children }) => {
    const [state, setState] = React.useState<T>(defaults);

    return (
      <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    );
  };

  return [() => React.useContext(Context), StatefulContextComponent] as const;
}
