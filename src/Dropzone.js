// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import React                                    from 'react';
import { useDropzone }                          from 'react-dropzone'
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// Dropzone
//================================================================//
export const Dropzone = observer (( props ) => {

    const { onDrop } = props;

    const title             = props.title || 'Upload';
    const icon              = props.icon || 'file alternate outline';
    const preDragMessage    = props.preDragMessage || `Drag 'n' drop a file here, or click to select a file.`;
    const dragMessage       = props.dragMessage || 'Drop a file...';
    const accept            = props.accept;

    const { getRootProps, getInputProps, isDragActive } = useDropzone ({ onDrop: onDrop, maxFiles: 1, accept: accept });

    const uploadMessage = isDragActive ? dragMessage : preDragMessage;

    return (
        <div { ...getRootProps ()}>
            <input { ...getInputProps ()} style = {{ display: 'none' }}/>
            <UI.Segment placeholder textAlign = 'center'>
                <UI.Header icon>
                    <UI.Icon name = { icon }/>
                    { uploadMessage }
                </UI.Header>
                <UI.Button primary>{ title }</UI.Button>
            </UI.Segment>
        </div>
    );
});
