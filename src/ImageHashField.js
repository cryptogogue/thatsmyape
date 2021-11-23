// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { Dropzone }                                     from './Dropzone';
import CryptoJS                                         from 'crypto-js';
import * as fgc                                         from 'fgc';
import { action, observable, runInAction }              from 'mobx';
import { observer }                                     from 'mobx-react';
import React, { useState }                              from 'react';
import * as UI                                          from 'semantic-ui-react';
import liburl                                           from 'url';
import validator                                        from 'validator';

const MAX_THUMBNAIL_BYTES = 52 * 1024;

//----------------------------------------------------------------//
async function loadImageAsync ( imageURL ) {

    return new Promise (( resolve, reject ) => {

        const image = new Image ();

        image.onload    = () => { resolve ( image ); }
        image.onerror   = () => { reject (); }
        image.src       = imageURL;
    });
}

//================================================================//
// ImageInfoController
//================================================================//
export class ImageInfoController {

    @observable isBusy          = false;
    @observable thumbnail       = '';
    @observable imageURL        = '';
    @observable imageHash       = '';
    @observable error           = false;

    //----------------------------------------------------------------//
    @action
    async reset ( url ) {

        this.isBusy         = false;
        this.thumbnail      = '';
        this.imageURL       = '';
        this.imageHash      = '';
        this.error          = false;
    }

    //----------------------------------------------------------------//
    @action
    setBusy ( busy ) {
        this.isBusy = busy;
    }

    //----------------------------------------------------------------//
    @action
    setError ( error ) {
        this.error = error;
    }

    //----------------------------------------------------------------//
    @action
    async setImageFromBlobAsync ( blob ) {

        this.reset ();
        this.setBusy ( true );

        try {
            const arrayBuffer   = await blob.arrayBuffer ();
            const sha256        = CryptoJS.SHA256 ( CryptoJS.lib.WordArray.create ( arrayBuffer )).toString ( CryptoJS.enc.Hex );

            const objectURL     = URL.createObjectURL ( blob );
            const image         = await loadImageAsync ( objectURL );

            URL.revokeObjectURL ( objectURL );

            const aspect        = image.height / image.width;
            let dataURL         = false;
            let factor          = 0;

            do {
                factor++;

                const canvas    = document.createElement ( 'canvas' );
                const width     = image.width / factor;
                canvas.width    = width;
                canvas.height   = width * aspect;

                const ctx       = canvas.getContext ( '2d' );

                ctx.drawImage ( image, 0, 0, canvas.width, canvas.height );

                dataURL         = canvas.toDataURL ( 'image/jpeg', 0.7 );
            }
            while (( dataURL === false ) || ( dataURL.length > MAX_THUMBNAIL_BYTES ));

            runInAction (() => {
                this.imageHash  = sha256;
                this.thumbnail  = dataURL;
            });
        }
        catch ( e ) {
            console.log ( e );
            this.setError ( 'Failed to procees image.' );
        }

        this.setBusy ( false );
    }

    //----------------------------------------------------------------//
    @action
    async setImageFromURLAsync ( url ) {

        this.reset ();

        if ( !( url && validator.isURL ( url, { require_protocol: true, require_valid_protocol: true, protocols: [ 'http', 'https' ]}))) {
            this.setError ( `Please enter a valid URL (including protocol).` );
            return;
        }

        this.setBusy ( true );

        try {

            // https://i.imgur.com/TX36qKH.jpeg
            this.imageURL       = liburl.format ( liburl.parse ( url ));
            const result        = await fetch ( this.imageURL );
            const blob          = await result.blob ();

            await this.setImageFromBlobAsync ( blob );
        }
        catch ( e ) {
            console.log ( e );
            this.setError ( 'Failed to fetch image.' );
        }

        this.setBusy ( false );
    }
}

//================================================================//
// ImageHashField
//================================================================//
export const ImageHashField = observer (( props ) => {

    const controller                        = props.controller || fgc.hooks.useFinalizable (() => new ImageInfoController ());
    const [ inputString, setInputString ]   = useState ( '' );

    const onChange = ( event ) => {
        setInputString ( event.target.value );
        controller.reset ();
    };

    const onKeyPress = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.target.blur ();
        }
    }

    const onBlur = async () => {
        await controller.setImageFromURLAsync ( inputString );
        setInputString ( controller.imageURL );
    };

    return (
        <UI.Form.Input

            { ...props }

            type            = 'string'
            value           = { inputString }
            onChange        = { onChange }
            onKeyPress      = { onKeyPress }
            onBlur          = { onBlur }
            disabled        = { controller.isBusy }
            error           = { controller.error }
        />
    );
});

//================================================================//
// ImageDropzone
//================================================================//
export const ImageDropzone = observer (( props ) => {

    const controller                        = props.controller || fgc.hooks.useFinalizable (() => new ImageInfoController ());
    const [ inputString, setInputString ]   = useState ( '' );

    const onDrop = ( acceptedFiles ) => {
        console.log ( acceptedFiles );
        if ( acceptedFiles.length === 0 ) return;
        controller.setImageFromBlobAsync ( acceptedFiles [ 0 ]);
    }

    return (
        <React.Fragment>
            <Choose>
                <When condition = { controller.isBusy }>
                    <UI.Segment placeholder textAlign = 'center'>
                        <UI.Loader
                            active
                            size            = 'large'
                        >
                            <UI.Header icon>
                                Loading Image...
                            </UI.Header>
                        </UI.Loader>
                    </UI.Segment>
                </When>
                <When condition = { controller.thumbnail }>
                    <UI.Message
                        positive
                        attached            = 'top'
                        header              = 'Image Loaded'
                        content             = { controller.imageHash }
                        onDismiss           = {() => { controller.reset (); }}
                    />
                    <UI.Segment
                        attached            = 'bottom'
                    >
                        <UI.Card.Group centered>
                            <UI.Card>
                                <UI.Image
                                    src     = { controller.thumbnail }
                                />
                            </UI.Card>
                        </UI.Card.Group>
                    </UI.Segment>
                </When>
                <Otherwise>
                    <Dropzone
                        title               = 'Load'
                        preDragMessage      = "Drag 'n' drop an image file here, or click to select a file."
                        dragMessage         = 'Drop an image file...'
                        iconName            = 'file image outline'
                        accept              = 'image/jpeg, image/gif, image/png'
                        onDrop              = { onDrop }
                    />
                </Otherwise>
            </Choose>
        </React.Fragment>
    );
});
