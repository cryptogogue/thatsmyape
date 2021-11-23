// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

export const CRYPTO_FIELD_STYLE = {
    fontFamily:     'monospace',
    wordBreak:      'break-all',
    wordWrap:       'break-word',
    overflowWrap:   'break-word',
};

//================================================================//
// RSAKeyField
//================================================================//
export const RSAKeyField = observer (( props ) => {

    const { onRSAKey, privateKey, checkKey } = props;

    const [ pem, setPEM ]           = useState ( props.pem || '' );
    const [ key, setKey ]           = useState ( props.key || false );
    const [ error, setError ]       = useState ( false );

    if ( props.key ) {
        return (
            <div style = {{
                height:         '100%',
                width:          '100%',
                overflowX:      'hidden',
                overflowY:      'auto',
                overflowWrap:   'break-word',
                whiteSpace:     'pre-wrap',
            }}>
                { props.key.publicPEM }
            </div>
        );
    }

    const loadPEM = ( text ) => {

        setKey ( false );
        onRSAKey ( false );
        props.onPEM && props.onPEM ( '' );

        if ( text ) {
            try {
                const rsaKey = new fgc.crypto.RSAKey ( text );

                if ( privateKey && !rsaKey.hasPrivate ) {
                    setError ( 'RSA PEM missing private key.' );
                    return;
                }

                const checkKeyError = checkKey ? checkKey ( rsaKey ) : false;
                if ( checkKeyError ) {
                    setError ( checkKeyError );
                    return;
                }

                const newKey = new fgc.crypto.RSAKey ( text );
                setKey ( newKey );
                onRSAKey ( newKey );
                props.onPEM && props.onPEM ( text );
            }
            catch ( error ) {
                console.log ( error );
                setError ( 'Invalid RSA PEM.' );
            }
        }
    }

    const loadFromFile = ( text ) => {
        setError ( false );
        setPEM ( text );
        loadPEM ( text );
    }

    const onChange = ( event ) => {
        setError ( false );
        setPEM ( event.target.value );
    }

    const onBlur = () => {
        loadPEM ( pem );
    }

    const onKeyPress = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.target.blur ();
        }
    }

    return (

        <React.Fragment>
            <UI.Menu attached = 'top'>
                <fgc.FilePickerMenuItem
                    loadFile    = { loadFromFile }
                    format      = 'text'
                    accept      = { '.pem' }
                />
            </UI.Menu>
            <UI.Form.TextArea
                attached        = 'bottom'
                style           = { CRYPTO_FIELD_STYLE }
                rows            = { 8 }
                placeholder     = 'RSA key in PEM format'
                value           = { pem }
                onChange        = { onChange }
                onBlur          = { onBlur }
                onKeyPress      = { onKeyPress }
                error           = { error }
            />
        </React.Fragment>
    );
});
