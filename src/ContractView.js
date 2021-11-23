// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                             from 'mobx-react';
import React, { useState }                      from 'react';
import ReactMarkdown                            from 'react-markdown'
import * as UI                                  from 'semantic-ui-react';

//================================================================//
// ContractView
//================================================================//
export const ContractView = observer (( props ) => {

    const { draft, setDraft, contract }  = props;
    const [ text, setText ]                 = useState ( false );

    const startEditing = () => {
        if ( text === false ) {
            setText ( draft );
        }
    }

    const finishEditing = () => {
        if ( text !== false ) {
            setDraft ( text );
            setText ( false );
        }
    }

    return (
        <React.Fragment>
            <UI.Menu attached = 'top' tabular>
                <UI.Menu.Item active = { text === false } onClick = { finishEditing }>Contract</UI.Menu.Item>
                <UI.Menu.Item active = { text !== false } onClick = { startEditing }>Edit</UI.Menu.Item>
            </UI.Menu>

            <UI.Segment attached = 'bottom'>
                <div style = {{ height: props.height || '400px' }}>
                    <Choose>
                        <When condition = { text !== false }>
                                <textarea
                                    style       = {{ height: '100%', width: '100%' }}
                                    value       = { text }
                                    onChange    = {( event ) => { setText ( event.target.value )}}
                                />
                        </When>
                        <Otherwise>
                            <div style = {{
                                height:         '100%',
                                width:          '100%',
                                overflowX:      'hidden',
                                overflowY:      'auto',
                                overflowWrap:   'break-word',
                            }}>
                                <Choose>
                                    <When condition = { props.plaintext }>
                                        <div style = {{ whiteSpace: 'pre-wrap' }}>
                                            { contract }
                                        </div>
                                    </When>
                                    <Otherwise>
                                        <ReactMarkdown>
                                            { contract }
                                        </ReactMarkdown>
                                    </Otherwise>
                                </Choose>
                            </div>
                        </Otherwise>
                    </Choose>
                </div>
            </UI.Segment>
        </React.Fragment>
    );
});
