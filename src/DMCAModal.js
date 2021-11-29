// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ContractView }                         from './ContractView'
import * as legal                               from './legal'
import { SignatureModal, SIGNATURE_MODAL }      from './SignatureModal'
import handlebars                               from 'handlebars';
import { action, computed, observable }         from 'mobx';
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import FileSaver                                from 'file-saver';
import JSZip                                    from 'jszip';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

const DEFAULT_ATTENTION = 'To Whom it May Concern';

//----------------------------------------------------------------//
function wrapString ( str, width ) {

    const lines = [];

    const segments = Math.ceil ( str.length / width );
    for ( let i = 0; i < segments; ++i ) {

        const x = i * width;
        const y = x + width;

        lines.push ( str.substring ( x, y ));
    }

    return lines.join ( '\n' );
}

//================================================================//
// DMCAController
//================================================================//
class DMCAController {

    @observable draft           = '';
    @observable attention       = DEFAULT_ATTENTION;
    @observable infringement    = '';
    @observable contactName     = '';
    @observable contactEmail    = '';
    @observable contactAddress  = '';
    @observable contactPhone    = '';
    @observable when            = new Date ();

    //----------------------------------------------------------------//
    @computed get
    canSign () {
        return Boolean ( this.attention && this.infringement && this.contactName && this.contactEmail );
    }

    //----------------------------------------------------------------//
    constructor ( chain ) {
        this.chain = chain;
        this.setDraft ( legal.DMCA_NOTICE );
    }

    //----------------------------------------------------------------//
    @computed get
    contract () {
        return handlebars.compile ( this.draft, { noEscape: true })( this.fields );
    }

    //----------------------------------------------------------------//
    async downloadWithSignatureAsync ( signature ) {

        try {

            const fields = this.fields;

            const zip = new JSZip ();

            const notice = handlebars.compile ( legal.SIGNED_CONTRACT, { noEscape: true })({
                CONTRACT:           this.contract,
                HASH_ALGORITHM:     signature.hashAlgorithm,
                ENCODING:           'base64',
                SIGNATURE:          wrapString ( signature.base64, 64 ),
            });

            zip.file ( 'notice.txt', notice );
            zip.file ( 'chain-of-custody.json', JSON.stringify ( this.chain.entries, null, 4 ));

            if ( fields.THUMBNAIL ) {
                const binary = atob ( fields.THUMBNAIL.split ( ',' )[ 1 ]);
                zip.file ( 'thumbnail.jpg', binary, { binary: true });
            }

            const name = fields.TITLE.replace(/\s/g , '-' );
            const date = `${ this.when.getFullYear ()}-${ this.when.getMonth () + 1 }-${ this.when.getDate ()}`;

            const content = await zip.generateAsync ({ type: 'blob' });
            FileSaver.saveAs ( content, `DMCA-${ name }-${ date }.zip` );
        }
        catch ( error ) {
            console.log ( error );
        }
    }

    //----------------------------------------------------------------//
    @computed get
    fields () {

        const head = this.chain.entries [ 0 ].fields;

        return {
            TITLE:              head.TITLE,
            ATTENTION:          this.attention,
            INFRINGEMENT:       this.infringement,
            CONTACT_NAME:       this.contactName,
            CONTACT_EMAIL:      this.contactEmail,
            CONTACT_ADDRESS:    this.contactAddress,
            CONTACT_PHONE:      this.contactPhone,
            PUBLIC_KEY:         this.chain.currentOwnerKey.publicPEM,
            DATE_TIME:          this.when.toLocaleString (),
        };
    }

    //----------------------------------------------------------------//
    @action
    setAttention ( attention ) {
        this.attention = attention;
    }

    //----------------------------------------------------------------//
    @action
    setContactAddress ( address ) {
        this.contactAddress = address;
    }

    //----------------------------------------------------------------//
    @action
    setContactEmail ( contactEmail ) {
        this.contactEmail = contactEmail;
    }

    //----------------------------------------------------------------//
    @action
    setContactName ( contactName ) {
        this.contactName = contactName;
    }

    //----------------------------------------------------------------//
    @action
    setContactPhone ( phone ) {
        this.contactPhone = phone;
    }

    //----------------------------------------------------------------//
    @action
    setDraft ( draft ) {
        this.draft = draft.trim ();
    }

    //----------------------------------------------------------------//
    @action
    setInfingement ( infringement ) {
        this.infringement = infringement;
    }

    //----------------------------------------------------------------//
    @action
    setSaving ( saving ) {
        this.isSaving = saving;
    }
}

//================================================================//
// DMCAModal
//================================================================//
export const DMCAModal = observer (( props ) => {

    const { chain, onDone }             = props;
    const controller                    = fgc.hooks.useFinalizable (() => new DMCAController ( chain ));
    const [ isSaving, setIsSaving ]     = useState ( false );

    const [ signatureModal, setSignatureModal ]     = useState ( false );

    const checkSigningKey = ( key ) => {
        if ( !chain.currentOwnerKey.publicIsMatch ( key )) {
            return 'Private signing key must match public key of current contract owner.';
        }
    }

    const onSignatureDone = async ( signature ) => {

        setSignatureModal ( false );

        if ( signature ) {
            if ( isSaving ) return;
            setIsSaving ( true );
            await controller.downloadWithSignatureAsync ( signature );
            setIsSaving ( false );
            onDone ();
        }
    }

    return (
        <UI.Modal
            open
            closeIcon
            onClose     = {() => { onDone ( false ); }}
        >
            <UI.Modal.Header>DMCA Notice</UI.Modal.Header>
            <UI.Modal.Content>

                <UI.Segment>
                    <UI.Form>
                        <UI.Form.Input
                            label           = 'Attention'
                            placeholder     = 'To Whom it May Concern'
                            value           = { controller.attention }
                            onChange        = {( event ) => { controller.setAttention ( event.target.value )}} 
                        />
                        <UI.Form.Group widths = 'equal'>
                            <UI.Form.Input
                                label           = 'Contact Name'
                                placeholder     = 'Contact Name'
                                value           = { controller.contactName }
                                onChange        = {( event ) => { controller.setContactName ( event.target.value )}} 
                            />
                            <fgc.EmailField
                                icon            = { false }
                                label           = 'Contact Email'
                                onEmail         = {( email ) => { controller.setContactEmail ( email )}} 
                            />
                        </UI.Form.Group>
                        <UI.Form.Group widths = 'equal'>
                            <UI.Form.Input
                                label           = 'Contact Mailing Address'
                                placeholder     = 'Contact Mailing Address'
                                value           = { controller.contactAddress }
                                onChange        = {( event ) => { controller.setContactAddress ( event.target.value )}} 
                            />
                            <fgc.PhoneField
                                icon            = { false }
                                label           = 'Contact Phone'
                                onPhone         = {( phone ) => { controller.setContactPhone ( phone )}} 
                            />
                        </UI.Form.Group>
                        <UI.Form.TextArea
                            rows            = { 4 }
                            label           = 'Location(s) of Infringement'
                            placeholder     = 'List all instances of infringement, including URLs'
                            value           = { controller.infringement }
                            onChange        = {( event ) => { controller.setInfingement ( event.target.value )}} 
                        />
                    </UI.Form>
                </UI.Segment>

                <ContractView
                    plaintext
                    draft           = { controller.draft }
                    setDraft        = {( draft ) => { controller.setDraft ( draft ); }}
                    contract        = { controller.contract }
                />
            </UI.Modal.Content>
            <UI.Modal.Actions>
                <UI.Button
                    onClick         = {() => { setSignatureModal ( SIGNATURE_MODAL.IN_BROWSER )}}
                    disabled        = { isSaving || !controller.canSign }
                >
                    Sign in Browser
                </UI.Button>
                <UI.Button
                    positive
                    onClick         = {() => { setSignatureModal ( SIGNATURE_MODAL.OFFLINE )}}
                    disabled        = { isSaving || !controller.canSign }
                >
                    Sign Offline
                </UI.Button>
            </UI.Modal.Actions>

            <SignatureModal
                type                = { signatureModal }
                text                = { controller.contract }
                checkKey            = { checkSigningKey }
                expectedKey         = { chain.currentOwnerKey }
                onDone              = { onSignatureDone }
            />

        </UI.Modal>
    );
});
