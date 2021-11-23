// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { SignInBrowserModal }                   from './SignInBrowserModal'
import { SignOfflineModal }                     from './SignOfflineModal'
import { observer }                             from 'mobx-react';
import React                                    from 'react';

export const SIGNATURE_MODAL = {
    IN_BROWSER:     'IN_BROWSER',
    OFFLINE:        'OFFLINE',
};

//================================================================//
// SignatureModal
//================================================================//
export const SignatureModal = observer (( props ) => {

    const { type, ...rest } = props;

    return (
        <Choose>
            <When condition = { type === SIGNATURE_MODAL.IN_BROWSER }>
                <SignInBrowserModal
                    { ...rest }
                />
            </When>
            <When condition = { type === SIGNATURE_MODAL.OFFLINE }>
                <SignOfflineModal
                    { ...rest }
                />
            </When>
        </Choose>
    );
});
