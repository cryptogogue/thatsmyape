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
    @observable publicKey       = false;
    @observable dateTime        = ( new Date ()).toLocaleString ();
    @observable governingLaw    = '';
    @observable venue           = '';

    //----------------------------------------------------------------//
    @computed get
    canSign () {
        return this.publicKey && this.governingLaw && this.venue;
    }

    //----------------------------------------------------------------//
    constructor ( chain ) {
        this.chain = chain;
        this.setDraft ( legal.TRANSFER_TITLE );
        this.setGoverningLaw ( chain.governingLaw );
        this.setVenue ( chain.venue );
    }

    //----------------------------------------------------------------//
    @computed get
    contract () {
        return handlebars.compile ( this.draft, { noEscape: true })( this.fields );
    }

    //----------------------------------------------------------------//
    @computed get
    fields () {
        const fields = {
            PUBLIC_KEY:         this.publicKey.publicPEM,
            DATE_TIME:          this.dateTime,
        };

        if (( this.governingLaw !== this.chain.governingLaw ) || ( this.venue !== this.chain.venue )) {
            fields.CHANGE_VENUE     = true;
            fields.GOVERNING_LAW    = this.governingLaw || this.chain.governingLaw;
            fields.VENUE            = this.venue || this.chain.venue;
        }

        return fields;
    }

    //----------------------------------------------------------------//
    @action
    setDraft ( draft ) {
        this.draft = draft.trim ();
    }

    //----------------------------------------------------------------//
    @action
    setGoverningLaw ( governingLaw ) {
        this.governingLaw = governingLaw;
    }

    //----------------------------------------------------------------//
    @action
    setPublicKey ( key ) {
        this.publicKey = key || false;
    }

    //----------------------------------------------------------------//
    @action
    setVenue ( venue ) {
        this.venue = venue;
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
        if ( chain.currentOwnerKey.publicIsMatch ( key )) {
            return 'Recipient public key should be different than public key of current contract owner.';
        }
    }

    const setRecipientKey = ( key ) => {
        controller.setPublicKey ( key );
    }

    const checkSigningKey = ( key ) => {
        if ( !chain.currentOwnerKey.publicIsMatch ( key )) {
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
            <UI.Modal.Header>Transfer Ownership</UI.Modal.Header>

            <UI.Modal.Content>

                <UI.Segment>
                    <UI.Header as='h3'>Recipient Identity</UI.Header>
                    <UI.Form>
                        <RSAKeyField
                            onRSAKey    = { setRecipientKey }
                            checkKey    = { checkRecipientKey }
                        />
                    </UI.Form>
                </UI.Segment>

                <UI.Segment>
                    <UI.Header as='h3'>Contract</UI.Header>
                    <UI.Form>
                        <UI.Form.Group widths = 'equal'>
                            <UI.Form.Input
                                label           = 'Governing Law'
                                placeholder     = 'State or Country'
                                value           = { controller.governingLaw }
                                onChange        = {( event ) => { controller.setGoverningLaw ( event.target.value )}} 
                            />
                            <UI.Form.Input
                                label           = 'Venue'
                                placeholder     = 'Court or County'
                                value           = { controller.venue }
                                onChange        = {( event ) => { controller.setVenue ( event.target.value )}} 
                            />
                        </UI.Form.Group>
                    </UI.Form>

                    <ContractView
                        draft           = { controller.draft }
                        setDraft        = {( draft ) => { controller.setDraft ( draft ); }}
                        contract        = { controller.contract }
                    />
                </UI.Segment>
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
