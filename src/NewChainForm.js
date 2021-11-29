// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ActionButtons }                        from './ActionButtons'
import { ContractView }                         from './ContractView'
import { DocumentFrame }                        from './DocumentFrame'
import { ImageDropzone, ImageHashField, ImageInfoController }  from './ImageHashField'
import * as legal                               from './legal'
import { NAV_STATE }                            from './NavController'
import { RSAKeyField }                          from './RSAKeyField'
import { SignatureModal, SIGNATURE_MODAL }      from './SignatureModal'
import handlebars                               from 'handlebars';
import { action, computed, observable }         from 'mobx';
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

const DEFAULT_GOVERNING_LAW         = 'State of Washington';
const DEFAULT_VENUE                 = 'Superior Court of King County, WA';

//================================================================//
// NewChainController
//================================================================//
class NewChainController {

    @observable draft               = '';
    @observable title               = '';
    @observable description         = '';
    @observable registrationNo      = '';
    @observable ownerName           = '';
    @observable ownerEmail          = '';
    @observable imageURL            = '';
    @observable imageHash           = '';
    @observable thumbnail           = '';
    @observable governingLaw        = DEFAULT_GOVERNING_LAW;
    @observable venue               = DEFAULT_VENUE;
    @observable publicKey           = false;
    @observable dateTime            = ( new Date ()).toLocaleString ();

    //----------------------------------------------------------------//
    @computed get
    canSign () {
        return this.title && this.description && this.publicKey && this.governingLaw && this.venue;
    }

    //----------------------------------------------------------------//
    constructor ( imageInfo ) {
        this.imageInfo = imageInfo;
        this.setDraft ( legal.GENERAL_TERMS );
    }

    //----------------------------------------------------------------//
    @computed get
    contract () {
        return handlebars.compile ( this.draft, { noEscape: true })( this.fields );
    }

    //----------------------------------------------------------------//
    @computed get
    fields () {

        console.log ( 'GET FIELDS:', this.imageInfo.imageHash );

        return {
            TITLE:                      this.title,
            DESCRIPTION:                this.description,
            COPYRIGHT_REGISTRATION:     this.registrationNo,
            OWNER_NAME:                 this.ownerName,
            OWNER_EMAIL:                this.ownerEmail,
            IMAGE_URL:                  this.imageInfo.imageURL,
            IMAGE_HASH:                 this.imageInfo.imageHash,
            THUMBNAIL:                  this.imageInfo.thumbnail,
            GOVERNING_LAW:              this.governingLaw,
            VENUE:                      this.venue,
            PUBLIC_KEY:                 this.publicKey.publicPEM,
            DATE_TIME:                  this.dateTime,
        };
    }

    //----------------------------------------------------------------//
    @action
    setDescription ( description ) {
        this.description = description;
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
    setOwnerName ( ownerName ) {
        this.ownerName = ownerName;
    }

    //----------------------------------------------------------------//
    @action
    setOwnerEmail ( ownerEmail ) {
        this.ownerEmail = ownerEmail;
    }

    //----------------------------------------------------------------//
    @action
    setPublicKey ( key ) {
        this.publicKey = key || false;
    }

    //----------------------------------------------------------------//
    @action
    setRegistrationNo ( registrationNo ) {
        this.registrationNo = registrationNo;
    }

    //----------------------------------------------------------------//
    @action
    setTitle ( title ) {
        this.title = title;
    }

    //----------------------------------------------------------------//
    @action
    setVenue ( venue ) {
        this.venue = venue;
    }
}

//================================================================//
// NewChainForm
//================================================================//
export const NewChainForm = observer (( props ) => {

    const { nav, chain }                            = props;
    const imageInfo                                 = fgc.hooks.useFinalizable (() => new ImageInfoController ());
    const controller                                = fgc.hooks.useFinalizable (() => new NewChainController ( imageInfo ));
    const [ signatureModal, setSignatureModal ]     = useState ( false );

    const checkSigningKey = ( key ) => {
        if ( !controller.publicKey.publicIsMatch ( key )) {
            return 'Signing public key should match the private key used for signing.';
        }
    }

    const onKeyPress = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.target.blur ();
        }
    }

    const onSignatureDone = ( signature ) => {
        
        setSignatureModal ( false );

        if ( signature ) {
            chain.begin (
                controller.draft,
                controller.fields,
                signature
            );
            nav.setState ( NAV_STATE.MANAGE_CHAIN );
        }
    }

    const onDismiss = () => {
        chain.clear ();
        nav.setState ( NAV_STATE.HOME );
    }

    return (
        <React.Fragment>
            <DocumentFrame
                title           = 'New Chain of Custody'
                onDismiss       = { onDismiss }
            >
                <UI.Segment>

                    <UI.Header as='h3'>Description of Artwork</UI.Header>

                    <UI.Form>
                        <UI.Form.Input
                            label           = 'Title'
                            placeholder     = 'Title of the artwork'
                            value           = { controller.title }
                            onChange        = {( event ) => { controller.setTitle ( event.target.value )}} 
                        />
                        <UI.Form.TextArea
                            rows            = { 4 }
                            label           = 'Description of Artwork'
                            placeholder     = 'Legal description of the Artwork, history of authorship/ownership and rights held.'
                            value           = { controller.description }
                            onChange        = {( event ) => { controller.setDescription ( event.target.value )}} 
                        />
                        <UI.Form.Group widths = 'equal'>
                            <UI.Form.Input
                                label           = 'Copright Registration Number'
                                placeholder     = 'Copyright registration number'
                                value           = { controller.registrationNo }
                                onChange        = {( event ) => { controller.setRegistrationNo ( event.target.value )}} 
                            />
                            <ImageHashField
                                label           = 'Image Reference URL'
                                placeholder     = 'Image reference URL'
                                controller      = { imageInfo }
                            />
                        </UI.Form.Group>
                        <ImageDropzone
                            controller          = { imageInfo }
                        />
                    </UI.Form>
                </UI.Segment>

                <UI.Segment>

                    <UI.Header as='h3'>Signing Identity</UI.Header>

                    <UI.Form>
                        <UI.Form.Group widths = 'equal'>
                            <UI.Form.Input
                                label           = 'Owner Name'
                                placeholder     = 'Owner name'
                                value           = { controller.ownerName }
                                onChange        = {( event ) => { controller.setOwnerName ( event.target.value )}} 
                            />
                            <fgc.EmailField
                                icon            = { false }
                                label           = 'Owner Email'
                                onEmail         = {( email ) => { controller.setOwnerEmail ( email )}} 
                            />
                        </UI.Form.Group>                    
                        <RSAKeyField
                            placeholder         = 'RSA public key to be adopted as digital identity and used for signing.'
                            onRSAKey            = {( key ) => { controller.setPublicKey ( key )}}
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
                        height          = '600px'
                    />

                    <ActionButtons>
                        <UI.Button
                            color       = 'teal'
                            onClick     = {() => { setSignatureModal ( SIGNATURE_MODAL.IN_BROWSER )}}
                            disabled    = { !controller.canSign }
                        >
                            Sign in Browser
                        </UI.Button>
                        <UI.Button
                            color       = 'teal'
                            onClick     = {() => { setSignatureModal ( SIGNATURE_MODAL.OFFLINE )}}
                            disabled    = { !controller.canSign }
                        >
                            Sign Offline
                        </UI.Button>
                    </ActionButtons>
                </UI.Segment>
            </DocumentFrame>

            <SignatureModal
                type            = { signatureModal }
                text            = { controller.contract }
                checkKey        = { checkSigningKey }
                expectedKey     = { controller.publicKey }
                onDone          = { onSignatureDone }
            />

        </React.Fragment>  
    );
});
