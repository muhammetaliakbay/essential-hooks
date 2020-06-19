import {createContext, ReactNode, useContext, useEffect} from 'react';
import * as React from 'react';

export type Translation = string;
export interface TranslationDirectory {
    [name: string]: TranslationDirectory | Translation;
}

const TranslationContext = createContext<TranslationDirectory | undefined>(undefined);

export function TranslationProvider(
    {
        translationDirectory,
        children
    }: {
        translationDirectory?: TranslationDirectory,
        children: ReactNode
    }
) {
    return <TranslationContext.Provider value={translationDirectory} children={children} />
}

function unresolvedTranslationPath(...path: string[]): string {
    return path.join('.');
}

function parseTranslationPath(...path: string[]) {
    return path.map(part => part.split('.')).flat();
}

function walkTranslationPath(translationDirectory: TranslationDirectory, ...parsedPath: string[]) {
    let level: TranslationDirectory | Translation = translationDirectory;
    for (const part of parsedPath) {
        if (typeof level === 'string') {
            return null;
        } else {
            level = level[part];
        }
    }

    if (typeof level !== 'string') {
        return null;
    } else {
        return level;
    }
}

export function useTranslation(...path: string[]): string {
    const translationDirectory = useContext(TranslationContext);
    if (translationDirectory == null) {
        return unresolvedTranslationPath(...path);
    } else {
        const parsedPath = parseTranslationPath(...path);
        const translation = walkTranslationPath(translationDirectory, ...parsedPath);
        if (translation == null) {
            return unresolvedTranslationPath(...path);
        } else {
            return translation;
        }
    }
}
