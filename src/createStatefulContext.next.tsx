import React, { useCallback } from "react";

type ChildFreeProps<T> = Omit<T, "children">;

export function createStatefulContext<T extends {}>(defaults: ChildFreeProps<T>) {
    const Context = React.createContext<
        [
            ChildFreeProps<T>,
            (updater: (old: ChildFreeProps<T>) => Partial<ChildFreeProps<T>>) => void
        ]
    >([defaults, () => ({})]);

    const StatefulContextComponent: React.FC<Partial<T>> = ({ children, ...rest }) => {
        const [state, setState] = React.useState<ChildFreeProps<T>>({
            ...defaults,
            ...rest,
        });

        const setStateWrapper = useCallback(
            (updater: (old: ChildFreeProps<T>) => Partial<ChildFreeProps<T>>) =>
                setState((old) => ({ ...old, ...updater(old) })),
            []
        );

        return <Context.Provider value={[state, setStateWrapper]}>{children}</Context.Provider>;
    };

    return [() => React.useContext(Context), StatefulContextComponent] as const;
}
