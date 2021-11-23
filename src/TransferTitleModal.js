// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ContractView }                         from './ContractView'
import * as legal                               from './legal'
import { RSAKeyField }                          from './RSAKeyField'
import { SignatureModal, SIGNATURE_MODAL }      from './SignatureModal'
import handlebars                               from 'handlebars';
import { action, computed, observable }         from 'mobx';
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// TransferTitleController
//================================================================//
class TransferTitleController {

    @observable draft           = '';
    @observable recipientPEM    = '';
    @observable dateTime        = ( new Date ()).toLocaleString ();

    //----------------------------------------------------------------//
    constructor ( chain ) {
        this.chain = chain;
        this.setDraft ( legal.TRANSFER_TITLE );
    }

    //----------------------------------------------------------------//
    @computed get
    canSign () {
        return Boolean ( this.recipientPEM );
    }

    //----------------------------------------------------------------//
    @computed get
    contract () {
        return handlebars.compile ( this.draft, { noEscape: true })( this.fields );
    }

    //----------------------------------------------------------------//
    @computed get
    fields () {
        return {
            RECIPIENT_PEM:      this.recipientPEM,
            DATE_TIME:          this.dateTime,
        };
    }

    //----------------------------------------------------------------//
    @action
    setDraft ( draft ) {
        this.draft = draft.trim ();
    }

    //----------------------------------------------------------------//
    @action
    setRecipientPEM ( recipientPEM ) {
        this.recipientPEM = recipientPEM;
    }

    //----------------------------------------------------------------//
    @computed get
    textForSigning () {
        const text = [];
        for ( let contract of this.chain.contracts ) {
            text.push ( contract.fullText );
        }
        text.push ( this.contract );
        return text.join ( '' );
    }
}

//================================================================//
// TransferTitleModal
//================================================================//
export const TransferTitleModal = observer (( props ) => {

    const { chain, onDone } = props;
    const controller = fgc.hooks.useFinalizable (() => new TransferTitleController ( chain ));

    const [ signatureModal, setSignatureModal ]     = useState ( false );

    const checkRecipientKey = ( key ) => {
        if ( chain.currentOwnerKey.publicPEM === key.publicPEM ) {
            return 'Recipient public key should be different than public key of current contract owner.';
        }
    }

    const setRecipientKey = ( key ) => {
        controller.setRecipientPEM ( key ? key.getPublic ( 'pem' ) : '' );
    }

    const checkSigningKey = ( key ) => {
        if ( chain.currentOwnerKey.publicPEM !== key.publicPEM ) {
            return 'Private signing key must match public key of current contract owner.';
        }
    }

    const onSignatureDone = ( signature ) => {
        setSignatureModal ( false );
        if ( signature ) {
            chain.transferTitle ( controller.draft, controller.fields, signature );
            onDone ();
        }
    }

    return (
        <UI.Modal
            open
            closeIcon
            onClose     = {() => { onDone ( false ); }}
        >
            <UI.Modal.Header>Transfer Title</UI.Modal.Header>
            <UI.Modal.Content>
                <UI.Form>
                    <RSAKeyField
                        onRSAKey    = { setRecipientKey }
                        checkKey    = { checkRecipientKey }
                    />
                </UI.Form>
                <ContractView
                    draft           = { controller.draft }
                    setDraft        = {( draft ) => { controller.setDraft ( draft ); }}
                    contract        = { controller.contract }
                />
            </UI.Modal.Content>
            <UI.Modal.Actions>
                <UI.Button
                    onClick         = {() => { setSignatureModal ( SIGNATURE_MODAL.IN_BROWSER )}}
                    disabled        = { !controller.canSign }
                >
                    Sign in Browser
                </UI.Button>
                <UI.Button
                    positive
                    onClick         = {() => { setSignatureModal ( SIGNATURE_MODAL.OFFLINE )}}
                    disabled        = { !controller.canSign }
                >
                    Sign Offline
                </UI.Button>
            </UI.Modal.Actions>

            <SignatureModal
                type                = { signatureModal }
                text                = { controller.textForSigning }
                checkKey            = { checkSigningKey }
                expectedKey         = { chain.currentOwnerKey }
                onDone              = { onSignatureDone }
            />

        </UI.Modal>
    );
});
