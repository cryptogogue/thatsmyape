// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { RSAKeyField, CRYPTO_FIELD_STYLE }      from './RSAKeyField'
import { RSAKeyView }                           from './RSAKeyView'
import FileSaver                                from 'file-saver';
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import ReactMarkdown                            from 'react-markdown'
import * as UI                                  from 'semantic-ui-react';

const INSTRUCTIONS = (`
Click 'Download Text for Signing' to download the full contract text.
Open a command prompt and use OpenSSL to generate a base64 RSA signature.
For reference, those commands are:

- \`openssl dgst -sha256 -sign <private-key>.pem -out sig.sha256 contract.txt\`
- \`openssl base64 -in sig.sha256 -out sig.base64\`

Upload and paste your **public** RSA key in PEM format and the base64 signature.
If the signature is valid, you can create your new chain.
`).trim ();

const MENU_TABS = {
    RSA_KEY:            'RSA_KEY',
    BASE64_SIG:         'BASE64_SIG',
};

//================================================================//
// SignOfflineModal
//================================================================//
export const SignOfflineModal = observer (( props ) => {

    const { text, onDone }              = props;
    const [ key, setKey ]               = useState ( props.expectedKey || false );
    const [ base64Sig, setBase64Sig ]   = useState ( '' );
    const [ sigError, setSigError ]     = useState ( false );
    const [ verified, setVerified ]     = useState ( false );
    const [ activeTab, setActiveTab ]   = useState ( MENU_TABS.RSA_KEY );
    const expectedKey                   = props.expectedKey || false;

    const onDownload = () => {
        var blob = new Blob ([ text ], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs ( blob, 'contract.txt' );
    }

    const checkSig = ( base64Sig, key ) => {

        setSigError ( false );
        setVerified ( false );

        if ( !( base64Sig && key )) return;

        const error = props.checkSignature && props.checkSignature ( signature );
        if ( error ) {
            setSigError ( error );
            return;
        }
        setVerified ( key.verify ( text, base64Sig, 'base64' ));
    }

    const loadFromFile = ( text ) => {
        setBase64Sig ( text );
        checkSig ( text, key );
    }

    const onChange = ( event ) => {
        setBase64Sig ( event.target.value );
    }

    const onBlur = () => {
        checkSig ( base64Sig, key );
    }

    const onKeyPress = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.target.blur ();
        }
    }

    const onSetKey = ( newKey ) => {
        setKey ( newKey );
        checkSig ( base64Sig, newKey );
    }

    const onApply = () => {

        const signature = {
            hashAlgorithm:  'SHA256',
            base64:         base64Sig,
            keyInfo:        key.getPublic ( 'json' ),
        };
        onDone ( signature );
    }

    return (
        <UI.Modal
            open
            closeIcon
            size        = 'small'
            onClose     = {() => { onDone ( false ); }}
        >
            <UI.Modal.Header>Sign Offline</UI.Modal.Header>
            <UI.Modal.Content>
                <ReactMarkdown>
                    { INSTRUCTIONS }
                </ReactMarkdown>

                <UI.Form>

                    <UI.Button
                        fluid
                        positive
                        onClick = { onDownload }
                    >
                        <UI.Icon name = 'download'/>
                        Download Text for Signing
                    </UI.Button>

                    <UI.Menu tabular attached = 'top'>
                        <UI.Menu.Item
                            active = { activeTab === MENU_TABS.RSA_KEY }
                            onClick = {() => { setActiveTab ( MENU_TABS.RSA_KEY ); }}
                        >
                            Public RSA Key
                        </UI.Menu.Item>
                        <UI.Menu.Item
                            active = { activeTab === MENU_TABS.BASE64_SIG }
                            onClick = {() => { setActiveTab ( MENU_TABS.BASE64_SIG ); }}
                        >
                            Base64 Signature
                        </UI.Menu.Item>
                    </UI.Menu>

                    <UI.Segment attached = 'bottom'>
                        <Choose>
                            <When condition = { activeTab === MENU_TABS.RSA_KEY }>
                                <Choose>
                                    <When condition = { expectedKey }>
                                        <RSAKeyView rsaKey = { expectedKey }/>
                                    </When>
                                    <Otherwise>
                                        <RSAKeyField onRSAKey = { onSetKey }/>
                                    </Otherwise>
                                </Choose>
                            </When>
                            <When condition = { activeTab === MENU_TABS.BASE64_SIG }>
                                <UI.Menu attached = 'top'>
                                    <fgc.FilePickerMenuItem
                                        loadFile    = { loadFromFile }
                                        format      = 'text'
                                        accept      = { '.base64' }
                                    />
                                </UI.Menu>
                                <UI.Form.TextArea
                                    attached        = 'bottom'
                                    style           = { CRYPTO_FIELD_STYLE }
                                    rows            = { 8 }
                                    placeholder     = 'RSA signature in base64 format'
                                    value           = { base64Sig }
                                    onChange        = { onChange }
                                    onBlur          = { onBlur }
                                    onKeyPress      = { onKeyPress }
                                    error           = { sigError }
                                />
                            </When>
                        </Choose>
                    </UI.Segment>

                    <If condition = { verified }>
                        <UI.Message
                            positive
                            icon            = 'check circle'
                            header          = 'Valid Signature'
                        />
                    </If>
                </UI.Form>

            </UI.Modal.Content>
            
            <UI.Modal.Actions>
                <UI.Button
                    positive
                    onClick     = { onApply }
                    disabled    = { !verified }
                >
                    Apply
                </UI.Button>
            </UI.Modal.Actions>
        </UI.Modal>
    );
});
