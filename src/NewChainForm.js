// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ActionButtons }                        from './ActionButtons'
import { ContractView }                         from './ContractView'
import { DocumentFrame }                        from './DocumentFrame'
import { ImageDropzone, ImageHashField, ImageInfoController }  from './ImageHashField'
import * as legal                               from './legal'
import { NAV_STATE }                            from './NavController'
import { SignatureModal, SIGNATURE_MODAL }      from './SignatureModal'
import handlebars                               from 'handlebars';
import { action, computed, observable }         from 'mobx';
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React, { useState }                      from 'react';
import * as UI                                  from 'semantic-ui-react';

const NA = 'None provided.';

//================================================================//
// NewChainController
//================================================================//
class NewChainController {

    @observable draft               = '';
    @observable title               = '';
    @observable description         = '';
    @observable registrationNo      = '';
    @observable imageURL            = '';
    @observable imageHash           = '';
    @observable thumbnail           = '';
    @observable dateTime            = ( new Date ()).toLocaleString ();


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
            IMAGE_URL:                  this.imageInfo.imageURL,
            IMAGE_HASH:                 this.imageInfo.imageHash,
            THUMBNAIL:                  this.imageInfo.thumbnail,
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
    setRegistrationNo ( registrationNo ) {
        this.registrationNo = registrationNo;
    }

    //----------------------------------------------------------------//
    @action
    setTitle ( title ) {
        this.title = title;
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

    const canSign = controller.title && controller.description;

    return (
        <React.Fragment>
            <DocumentFrame
                title           = 'New Chain of Custody'
                onDismiss       = { onDismiss }
            >
                <UI.Segment>
                    <UI.Form>
                        <UI.Form.Input
                            label           = 'Title'
                            placeholder     = 'Description of the artwork'
                            value           = { controller.title }
                            onChange        = {( event ) => { controller.setTitle ( event.target.value )}} 
                        />
                        <UI.Form.TextArea
                            rows            = { 4 }
                            label           = 'Description of Artwork'
                            placeholder     = 'Description of copyrighted artwork'
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
                            controller      = { imageInfo }
                        />
                    </UI.Form>
                </UI.Segment>

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
                        disabled    = { !canSign }
                    >
                        Sign in Browser
                    </UI.Button>
                    <UI.Button
                        color       = 'teal'
                        onClick     = {() => { setSignatureModal ( SIGNATURE_MODAL.OFFLINE )}}
                        disabled    = { !canSign }
                    >
                        Sign Offline
                    </UI.Button>
                </ActionButtons>
            </DocumentFrame>

            <SignatureModal
                type        = { signatureModal }
                text        = { controller.contract }
                onDone      = { onSignatureDone }
            />

        </React.Fragment>  
    );
});
