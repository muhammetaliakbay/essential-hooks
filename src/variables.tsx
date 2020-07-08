import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import * as React from 'react';

export interface Variables extends Map<any, any> {
}

const VariablesContext = createContext<Variables>(undefined as any);

export function VariablesProvider(
    {
        children
    }: {
        children: ReactNode
    }
) {
    const [variables] = useState<Variables>(() => new Map());
    return <VariablesContext.Provider value={variables} children={children} />
}

export function useVariable<T>(key: any): [T, (newValue: T) => void, () => T] {
    const variables = useVariables();
    return [
        variables.get(key),
        newValue => variables.set(key, newValue),
        () => variables.get(key)
    ];
}

export function useVariables(): Variables {
    return useContext(VariablesContext);
}

export function VariableProvider<T>(
    {
        key,
        value,
        children
    }: {
        key: any,
        value: T,
        children: ReactNode
    }
) {
    const [, set] = useVariable<T>(key);
    set(value);
    return <>{children}</>;
}
