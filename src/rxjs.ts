import {Observable} from 'rxjs';
import {useEffect, useState} from 'react';

export function useObservable<T>(observable: Observable<T>): T | undefined;
export function useObservable<T>(observable: Observable<T>, initialValue: T): T;
export function useObservable<T>(observable: Observable<T>, initialValue: undefined): T | undefined;

export function useObservable<T>(observable: Observable<T>, initialValue?: T) {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        const subscription = observable.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [observable]);
    return value;
}
