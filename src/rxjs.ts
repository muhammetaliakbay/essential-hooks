import {Observable} from 'rxjs';
import {useEffect, useState} from 'react';

export function useObservable<T>(observable: Observable<T>, initialValue?: T): T | typeof initialValue {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        const subscription = observable.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [observable]);
    return value;
}
