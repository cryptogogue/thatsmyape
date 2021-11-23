// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ActionButtons }                        from './ActionButtons'
import { ChainOfCustodyView }                   from './ChainOfCustodyView'
import { DocumentFrame }                        from './DocumentFrame'
import { DMCAModal }                            from './DMCAModal'
import { NAV_STATE }                            from './NavController'
import { TransferTitleModal }                   from './TransferTitleModal'
import FileSaver                                from 'file-saver';
import { observer }                             from 'mobx-react';
import React, { useState }                      from 'react';
import { useDropzone }                          from 'react-dropzone';
import * as UI                                  from 'semantic-ui-react';

const MODAL = {
    TRANSER_TITLE:  'TRANSER_TITLE',
    DMCA_TAKEDOWN:  'DMCA_TAKEDOWN',
};

//================================================================//
// ManageChainForm
//================================================================//
export const ManageChainForm = observer (( props ) => {

    const { nav, chain }        = props;
    const [ modal, setModal ]   = useState ( false );

    const onClearChain = () => {
        chain.clear ();
        nav.setState ( NAV_STATE.NEW_CHAIN );
    }

    const onDismiss = () => {
        chain.clear ();
        nav.setState ( NAV_STATE.HOME );
    }

    const onDownload = () => {
        const blob = new Blob ([ JSON.stringify ( chain.entries, null, 4 )], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs ( blob, 'chain-of-custody.json' );
    }

    const onDrop = async ( acceptedFiles ) => {
        if ( acceptedFiles.length === 0 ) return;
        try {
            chain.load ( JSON.parse ( await acceptedFiles [ 0 ].text ()));
        }
        catch ( error ) {
            console.log ( error );
        }
    }

    const { getRootProps } = useDropzone ({ onDrop: onDrop, maxFiles: 1, accept: 'application/json' });

    return (
        <div { ...getRootProps ()}>

            <DocumentFrame
                title       = 'Chain of Custody'
                onDismiss   = { onDismiss }
            >                
                <UI.Segment tertiary>
                <ChainOfCustodyView chain = { chain }/>
                </UI.Segment>

                <ActionButtons>
                    <UI.Button
                        color = 'teal'
                        onClick = { onDownload }
                    >
                        Download
                    </UI.Button>
                    <UI.Button
                        color = 'teal'
                        onClick = { onClearChain }
                    >
                        New Chain
                    </UI.Button>
                    <UI.Button
                        color = 'teal'
                        onClick = {() => { setModal ( MODAL.TRANSER_TITLE ); }}
                    >
                        Transfer Title
                    </UI.Button>
                    <UI.Button
                        color = 'teal'
                        onClick = {() => { setModal ( MODAL.DMCA_TAKEDOWN ); }}
                    >
                        DMCA Takedown
                    </UI.Button>
                </ActionButtons>
            </DocumentFrame>

            <Choose>
                <When condition = { modal === MODAL.TRANSER_TITLE }>
                    <TransferTitleModal chain = { chain } onDone = {() => { setModal ( false ); }}/>
                </When>
                <When condition = { modal === MODAL.DMCA_TAKEDOWN }>
                    <DMCAModal chain = { chain } onDone = {() => { setModal ( false ); }}/>
                </When>
                <When condition = { modal === MODAL.DMCA_TAKEDOWN }>
                </When>
            </Choose>

        </div>
    );
});
