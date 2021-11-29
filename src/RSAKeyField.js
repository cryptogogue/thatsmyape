// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import { useDropzone }                          from 'react-dropzone'
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

    const [ pem, setPEM ]               = useState ( props.pem || '' );
    const [ key, setKey ]               = useState ( props.key || false );
    const [ error, setError ]           = useState ( false );

    const [ needsPassword, setNeedsPassword ]   = useState ( false );
    const [ password, setPassword ]             = useState ( '' );
    const [ passwordError, setPasswordError ]   = useState ( false );

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

    const innerLoadKeyAsync = async ( text, pw ) => {

        setError ( false );
        setPasswordError ( false );
        setKey ( false );
        onRSAKey ( false );
        props.onPEM && props.onPEM ( '' );

        try {

            let rsaKey = await fgc.crypto.loadKeyAsync ( text, pw );

            if ( rsaKey.type !== fgc.crypto.CRYPTO_KEY_TYPE.RSA ) {
                setError ( 'Not an RSA key. Did you load an EC key by mistake?' );
                return;
            }

            if ( privateKey && !rsaKey.hasPrivate ) {
                setError ( 'Missing private key.' );
                return;
            }

            if ( !privateKey ) {
                rsaKey = new fgc.crypto.RSAKey ( rsaKey.publicPEM );
                setPEM ( rsaKey.publicPEM );
            }

            const checkKeyError = checkKey ? checkKey ( rsaKey ) : false;
            if ( checkKeyError ) {
                setError ( checkKeyError );
                return;
            }

            setKey ( rsaKey );            
            onRSAKey ( rsaKey );
            props.onPEM && props.onPEM ( text );
        }
        catch ( error ) {
            if ( error instanceof fgc.pem.PEMPasswordError ) throw error;
            console.log ( error );
            setError ( 'Invalid RSA PEM.' );
        }
    }

    const loadPEM = async ( text ) => {

        setPassword ( '' );
        setNeedsPassword ( false );

        if ( text ) {
            try {
                await innerLoadKeyAsync ( text );
            }
            catch ( error ) {
                setNeedsPassword ( true );
            }
        }
    }

    const loadPEMWithPassword = async ( text, pw ) => {

        if ( text && pw ) {
            try {
                await innerLoadKeyAsync ( text, pw );
            }
            catch ( error ) {
                setPasswordError ( 'Password is incorrect.' );
            }
        }
    }

    const loadFromFile = ( text ) => {
        setError ( false );
        setPEM ( text );
        loadPEM ( text );
    }

    const onChangePEM = ( event ) => {
        setError ( false );
        setPEM ( event.target.value );
    }

    const onBlurPEM = () => {
        loadPEM ( pem );
    }

    const onChangePW = ( event ) => {
        setPasswordError ( false );
        setPassword ( event.target.value );
    }

    const onBlurPW = () => {
        loadPEMWithPassword ( pem, password );
    }

    const onKeyPress = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.target.blur ();
            event.stopPropagation ();
            event.preventDefault ();
        }
    }

    const onDrop = async ( acceptedFiles ) => {
        if ( acceptedFiles.length === 0 ) return;
        try {
            const text = await acceptedFiles [ 0 ].text ();
            if ( text ) {
                loadFromFile ( text );
            }
        }
        catch ( error ) {
            console.log ( error );
        }
    }

    const { getRootProps } = useDropzone ({ onDrop: onDrop, maxFiles: 1 });

    return (

        <React.Fragment>
            <UI.Menu attached = 'top'>
                <fgc.FilePickerMenuItem
                    loadFile    = { loadFromFile }
                    format      = 'text'
                    accept      = { '.pem' }
                />
            </UI.Menu>
            <div { ...getRootProps ()}>
                <UI.Form.TextArea
                    attached        = 'bottom'
                    style           = { CRYPTO_FIELD_STYLE }
                    rows            = { 8 }
                    placeholder     = { props.placeholder || 'RSA key in PEM format' }
                    value           = { pem }
                    onChange        = { onChangePEM }
                    onBlur          = { onBlurPEM }
                    onKeyPress      = { onKeyPress }
                    error           = { error }
                />
            </div>

            <If condition = { needsPassword }>
                <UI.Form.Input
                    fluid
                    icon            = {( !Boolean ( key )) ? 'lock' : 'unlock' }
                    iconPosition    = 'left'
                    placeholder     = 'Password'
                    type            = 'password'
                    value           = { password }
                    onChange        = { onChangePW }
                    onBlur          = { onBlurPW }
                    onKeyPress      = { onKeyPress }
                    error           = { passwordError }
                />
            </If>
        </React.Fragment>
    );
});
