// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import React                                    from 'react';
import * as UI                                  from 'semantic-ui-react';

const MODAL = {
    TRANSER_TITLE:  'TRANSER_TITLE',
    DMCA_TAKEDOWN:  'DMCA_TAKEDOWN',
};

//================================================================//
// DocumentFrame
//================================================================//
export const DocumentFrame = observer (( props ) => {

    const { title } = props;

    const onDismiss = () => {
        props.onDismiss && props.onDismiss ();
    }

    return (
        <React.Fragment>
            <UI.Message
                attached    = 'top'
                onDismiss   = { onDismiss }
            >
                <UI.Header as = 'h1'>{ title }</UI.Header>
            </UI.Message>
            <UI.Segment secondary attached = 'bottom'>
                { props.children }
            </UI.Segment>
        </React.Fragment>
    );
});
