import React from "react";

type SetFunction<KeyType> = React.Dispatch<React.SetStateAction<KeyType>>;

export function createStatefulContext<T extends {}>(defaults: Omit<T, "children">) {
  const Context = React.createContext<[Omit<T, "children">, SetFunction<Omit<T, "children">>]>([defaults, () => {}]);

  const StatefulContextComponent: React.FC<Partial<T>> = ({ children, ...rest }) => {
    const [state, setState] = React.useState<Omit<T, "children">>({ ...defaults, ...rest });

    return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
  };

  return [() => React.useContext(Context), StatefulContextComponent] as const;
}
