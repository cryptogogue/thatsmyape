// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import React                                    from 'react';
import * as UI                                  from 'semantic-ui-react';

export const CRYPTO_FIELD_STYLE = {
    fontFamily:     'monospace',
    wordBreak:      'break-all',
    wordWrap:       'break-word',
    overflowWrap:   'break-word',
};

//================================================================//
// RSAKeyView
//================================================================//
export const RSAKeyView = observer (( props ) => {

    const { rsaKey } = props;

    return (
        <UI.Segment>
            <div style = {{ height: props.height || '180px' }}>
                <div style = {{
                    height:         '100%',
                    width:          '100%',
                    overflowX:      'hidden',
                    overflowY:      'auto',
                    overflowWrap:   'break-word',
                    fontFamily:     'monospace',
                    wordBreak:      'break-all',
                    wordWrap:       'break-word',
                    overflowWrap:   'break-word',
                    whiteSpace:     'pre-wrap',
                }}>
                    { rsaKey.publicPEM }
                </div>
            </div>
        </UI.Segment>
    );
});
