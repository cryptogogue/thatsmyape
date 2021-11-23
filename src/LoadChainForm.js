// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { DocumentFrame }                        from './DocumentFrame';
import { Dropzone }                             from './Dropzone';
import { NAV_STATE }                            from './NavController';
import { observer }                             from 'mobx-react';
import React                                    from 'react';
import { useDropzone }                          from 'react-dropzone';

//================================================================//
// LoadChainForm
//================================================================//
export const LoadChainForm = observer (( props ) => {

    const { nav, chain }                            = props;

    const onDrop = async ( acceptedFiles ) => {
        if ( acceptedFiles.length === 0 ) return;
        try {
            chain.load ( JSON.parse ( await acceptedFiles [ 0 ].text ()));
            nav.setState ( NAV_STATE.MANAGE_CHAIN );
        }
        catch ( error ) {
            console.log ( error );
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone ({ onDrop: onDrop, maxFiles: 1, accept: 'application/json' })
    const uploadMessage = isDragActive ? 'Drop a chain of custody file...' : `Drag 'n' drop a chain of custody file here, or click to select a file.`;

    const onDismiss = () => {
        chain.clear ();
        nav.setState ( NAV_STATE.HOME );
    }

    return (
        <React.Fragment>
            <DocumentFrame
                title           = 'Load Chain of Custody'
                onDismiss       = { onDismiss }
            >
                <Dropzone
                    title               = 'Load'
                    preDragMessage      = "Drag 'n' drop a chain of custody file here, or click to select a file."
                    dragMessage         = 'Drop a chain of custody file...'
                    iconName            = 'file alternate outline'
                    accept              = 'application/json'
                    onDrop              = { onDrop }
                />
            </DocumentFrame>
        </React.Fragment>
    );
});
