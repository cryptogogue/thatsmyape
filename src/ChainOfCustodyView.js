// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import handlebars                               from 'handlebars';
import { observer }                             from 'mobx-react';
import React, { useState }                      from 'react';
import ReactMarkdown                            from 'react-markdown'
import * as UI                                  from 'semantic-ui-react';

const SUMMARY = handlebars.compile ((`
## {{ TITLE }}
{{ DESCRIPTION }}
- **Registration**: {{ COPYRIGHT_REGISTRATION }}
- **Reference URL**: [{{ IMAGE_URL }}]({{ IMAGE_URL }})
- **SHA256**: {{ IMAGE_HASH }}
`).trim (), { noEscape: true });

const SIGNATURE = handlebars.compile ((`
{{ BASE_64_SIG }}
\`\`\`
{{ PUBLIC_PEM }}
\`\`\`
`).trim (), { noEscape: true });

//================================================================//
// ChainOfCustodyHeaderView
//================================================================//
export const ChainOfCustodyHeaderView = observer (( props ) => {

    const { chain } = props;

    const head = chain.entries [ 0 ];
    if ( !head ) return;

    const fields = head.fields;

    const summary = SUMMARY ( fields );

    return (
        <UI.Table unstackable>
            <UI.Table.Body>
                <UI.Table.Row>
                    <UI.Table.Cell collapsing>
                        <If condition = { fields.THUMBNAIL }>
                            <UI.Image
                                style   = {{ maxWidth: '150px' }}
                                src     = { fields.THUMBNAIL }
                            />
                        </If>
                    </UI.Table.Cell>
                    <UI.Table.Cell textAlign = 'left' verticalAlign = 'top'>
                        <div style = {{ wordBreak: 'break-all', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                            <ReactMarkdown>
                                { summary }
                            </ReactMarkdown>
                        </div>
                    </UI.Table.Cell>
                </UI.Table.Row>
            </UI.Table.Body>
        </UI.Table>
    );
});

//================================================================//
// ChainOfCustodyContractView
//================================================================//
export const ChainOfCustodyContractView = observer (( props ) => {

    const { contract }                          = props;
    const [ showSigModal, setShowSigModal ]     = useState ( false );

    const summary = SIGNATURE ({
        BASE_64_SIG:    contract.base64,
        PUBLIC_PEM:     contract.keyPEM,
    });

    const hideSigModal = () => {
        setShowSigModal ( false );
    }

    return (
        <React.Fragment>
            <UI.Message
                icon
                attached        = 'top'
                style           = {{ cursor: 'pointer' }}
                positive        = { contract.isValid ? true : undefined }
                negative        = { contract.isValid ? undefined : true }
                onClick         = {() => { setShowSigModal ( true ); }}
            >
                <UI.Icon name = { contract.isValid ? 'check circle' : 'warning sign' }/>
                <UI.Message.Content>
                    <UI.Message.Header>{ contract.isValid ? 'Valid Signature' : 'Invalid Signature' }</UI.Message.Header>
                    <p>{ contract.fields.DATE_TIME }</p>
                </UI.Message.Content>
            </UI.Message>

            <UI.Segment attached = 'bottom'>
                <div style = {{ height: ( contract.position === 0 ? '400px' : '200px' )}}>
                    <div style = {{
                        height:         '100%',
                        width:          '100%',
                        overflowX:      'hidden',
                        overflowY:      'auto',
                        overflowWrap:   'break-word',
                    }}>
                        <ReactMarkdown>
                            { contract.fullText }
                        </ReactMarkdown> 
                    </div>
                </div>
            </UI.Segment>

            <UI.Modal
                closeIcon
                open        = { showSigModal }
                onClose     = { hideSigModal }
            >
                <UI.Modal.Header>Signature</UI.Modal.Header>
                <UI.Modal.Content>
                    <div style = {{
                        wordBreak: 'break-all',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                    }}>
                        <ReactMarkdown>
                            { summary }
                        </ReactMarkdown>
                    </div>
                </UI.Modal.Content>
                
                <UI.Modal.Actions>
                    <UI.Button
                        onClick     = { hideSigModal }
                    >
                        Done
                    </UI.Button>
                </UI.Modal.Actions>
            </UI.Modal>
        </React.Fragment>
    );
});

//================================================================//
// ChainOfCustodyView
//================================================================//
export const ChainOfCustodyView = observer (( props ) => {

    const { chain } = props;

    const contracts = [];
    for ( let i = 0; i < chain.contracts.length; ++i ) {

        const contract      = chain.contracts [ i ];
        const isFirst       = i === 0;
        const isLast        = i === ( chain.entries.length - 1 );

        let attached = true;
        if ( isFirst && isLast ) {
            attached = false;
        }
        else if ( isFirst ) {
            attached = 'top';
        }
        else if ( isLast ) {
            attached = 'bottom';
        }

        contracts.push (
            <div key = { i }>
                <UI.Segment attached = { attached }>
                    <ChainOfCustodyContractView contract = { contract }/>
                </UI.Segment>
            </div>
        ); 
    }

    console.log ( 'CHAIN OF CUSTODY VIEW' );

    return (
        <React.Fragment>
            <ChainOfCustodyHeaderView chain = { chain }/>
            { contracts }
        </React.Fragment>
    );
});
