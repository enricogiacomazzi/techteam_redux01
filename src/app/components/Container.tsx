import React, { PropsWithChildren, useState } from 'react';
import { Counter } from '../../features/counter/Counter';

export const Container: React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [val, setVal] = useState<boolean>(false);

    return (
        <div style={{backgroundColor: val ? 'red' : 'green'}}>
            <button onClick={() => setVal(!val)}>toggle</button>
            {children}
        </div>
    )
}

