// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { observer }                 from 'mobx-react';
import React                        from 'react';
import ReactMarkdown                from 'react-markdown'
import * as UI                      from 'semantic-ui-react';

const TERMS_OF_SERVICE = (`
# *That's My Ape!* Terms of Service
### Last updated: November 28, 2021

*That's My Ape!* is a work of satire presented for entertainment purposes only. The authors of *That's My Ape!* are not lawyers and don't claim to be. The templates provided on *That's My Ape!* are not intended as legal advice and should not be used as such. No part of *That's My Ape!* is intended as legal advice. Do not use *That's My Ape!* to prepare or send legal documents.

*That's My Ape!* is provided “AS-IS” without any warranties of any kind. Cryptogogue, Inc. disclaims all warranties, whether express or implied or at equity or law or under any statute or code including warranties of merchantability or fitness for a particular purpose.

This Terms of Service is governed by and construed in accordance with the laws of the State of Washington without regard to conflict of laws principles. You consent to the jurisdiction of Washington, and any dispute arising under this agreement shall be settled and decided in King County. 

If any provision of this Terms of Service is declared to be invalid under any applicable statute or rule of law, the remaining portions will be enforced to the maximum extent allowed by law. If any provision is declared unenforceable because it is held to be unreasonable, then that provision shall be enforced to the maximum extent reasonable.
`).trim ();

//================================================================//
// TermsOfServiceModal
//================================================================//
export const TermsOfServiceModal = observer (( props ) => {

    const { onDone } = props;

    return (
        <UI.Modal
            open
            closeIcon
            onClose     = {() => { onDone ( false ); }}
        >
            <UI.Modal.Header>Terms of Service</UI.Modal.Header>
            <UI.Modal.Content>
                <ReactMarkdown>
                    { TERMS_OF_SERVICE }
                </ReactMarkdown>
            </UI.Modal.Content>
        </UI.Modal>
    );
});