// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { RSAKeyField }                          from './RSAKeyField'
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// SignInBrowserModal
//================================================================//
export const SignInBrowserModal = observer (( props ) => {

    const { text, onDone }              = props;
    const [ key, setKey ]               = useState ( false );
    const [ sigError, setSigError ]     = useState ( false );

    const onSign = () => {

        const signature = {
            hashAlgorithm:  'SHA256',
            base64:         key.sign ( text, 'base64' ),
            keyInfo:        key.getPublic ( 'json' ),
        };

        fgc.assert ( key.verify ( text, signature.base64, 'base64' ));

        const error = props.checkSignature && props.checkSignature ( signature );
        if ( error ) {
            setSigError ( error );
            return;
        }
        onDone ( signature );
    }

    const checkKey = ( key ) => {

        if ( props.checkKey ) {
            const error = props.checkKey ( key );
            if ( error ) return error;
        }

        if ( props.expectedKey && ( !props.expectedKey.publicIsMatch ( key ))) {
            return 'Loaded key did not match expected key.';
        }
    }

    return (
        <UI.Modal
            open
            closeIcon
            size        = 'small'
            onClose     = {() => { onDone ( false ); }}
        >
            <UI.Modal.Header>Sign in Browser</UI.Modal.Header>
            <UI.Modal.Content>
                <p>Paste or load your private RSA key in PEM format.</p>
                <p>We won't steal it. Probably.</p>
                <UI.Form>
                    <RSAKeyField privateKey onRSAKey = { setKey } checkKey = { checkKey }/>
                </UI.Form>
            </UI.Modal.Content>
            
            <UI.Modal.Actions>
                <UI.Button
                    positive
                    onClick     = { onSign }
                    disabled    = { key === false }
                >
                    Sign
                </UI.Button>
            </UI.Modal.Actions>
        </UI.Modal>
    );
});
