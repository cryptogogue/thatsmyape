// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import { action, observable }                   from 'mobx';

export const NAV_STATE = {
    HOME:               'HOME',
    NEW_CHAIN:          'NEW_CHAIN',
    LOAD_CHAIN:         'LOAD_CHAIN',
    MANAGE_CHAIN:       'VIEW_CHAIN',
};

//================================================================//
// NavController
//================================================================//
export class NavController {

    @observable state           = '';

    //----------------------------------------------------------------//
    constructor ( chain ) {
        this.chain = chain;
        this.setState ( chain.length > 0 ? NAV_STATE.MANAGE_CHAIN : NAV_STATE.HOME );
    }

    //----------------------------------------------------------------//
    @action
    setState ( state ) {
        this.state = state;
    }
}
