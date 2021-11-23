// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import React                                    from 'react';
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// ActionButtons
//================================================================//
export const ActionButtons = observer (( props ) => {

    return (
        <div style = {{ textAlign: 'center' }}>
            <div>
                <UI.Button.Group>
                    { props.children }
                </UI.Button.Group>
            </div>
        </div>
    );
});
