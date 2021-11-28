// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { ChainOfCustody }                       from './ChainOfCustody'
import { LoadChainForm }                        from './LoadChainForm'
import { ManageChainForm }                      from './ManageChainForm'
import { NavController, NAV_STATE }             from './NavController'
import { NewChainForm }                         from './NewChainForm'
import { observer }                             from 'mobx-react';
import * as fgc                                 from 'fgc';
import React                                    from 'react';
import { useDropzone }                          from 'react-dropzone';
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// MainScreen
//================================================================//
export const MainScreen = observer (( props ) => {

    const chain     = fgc.hooks.useFinalizable (() => new ChainOfCustody ());
    const nav       = fgc.hooks.useFinalizable (() => new NavController ( chain ));

    const onNew = () => {
        nav.setState ( NAV_STATE.NEW_CHAIN );
    }

    const onLoad = () => {
        nav.setState ( NAV_STATE.LOAD_CHAIN );
    }

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

    const { getRootProps } = useDropzone ({ onDrop: onDrop, maxFiles: 1, accept: 'application/json' });

    return (
        <div style = {{ width: '100%', height: '100%' }} { ...getRootProps ()}>
        <UI.Container>
            <Choose>
                <When condition = { nav.state === NAV_STATE.NEW_CHAIN }>
                    <NewChainForm nav = { nav } chain = { chain }/>
                </When>

                <When condition = { nav.state === NAV_STATE.LOAD_CHAIN }>
                    <LoadChainForm nav = { nav } chain = { chain }/>
                </When>

                <When condition = { nav.state === NAV_STATE.MANAGE_CHAIN }>
                    <ManageChainForm nav = { nav } chain = { chain }/>
                </When>

                <Otherwise>
                    <UI.Container>
                        <UI.Segment secondary>
                            <div style = {{ textAlign: 'center' }}>
                                <div>
                                    <UI.Button.Group>
                                        <UI.Button
                                            color = 'teal'
                                            onClick = { onNew }
                                        >
                                            New
                                        </UI.Button>
                                        <UI.Button
                                            color = 'teal'
                                            onClick = { onLoad }
                                        >
                                            Load
                                        </UI.Button>
                                    </UI.Button.Group>
                                </div>
                            </div>
                        </UI.Segment>
                    </UI.Container>
                </Otherwise>
            </Choose>
        </UI.Container>
        </div>
    );
});