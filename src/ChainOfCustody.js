// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import handlebars                               from 'handlebars';
import { action, computed, observable }         from 'mobx';
import * as fgc                                 from 'fgc';

const STORAGE_KEY = 'thatsmyape.coc';

//================================================================//
// ChainOfCustody
//================================================================//
export class ChainOfCustody {

    @observable entries             = [];

    //----------------------------------------------------------------//
    @computed get currentOwnerKey   () { return new fgc.crypto.RSAKey ( this.getMostRecentContractFieldValue ( 'PUBLIC_KEY' )); }
    @computed get governingLaw      () { return this.getMostRecentContractFieldValue ( 'GOVERNING_LAW' ); }
    @computed get length            () { return this.entries.length; }
    @computed get venue             () { return this.getMostRecentContractFieldValue ( 'VENUE' ); }

    //----------------------------------------------------------------//
    @action
    begin ( draft, fields, signature ) {

        this.entries = [{
            draft:          draft,
            fields:         fields,
            signature:      signature,
        }];
        this.store ();
    }

    //----------------------------------------------------------------//
    @action
    clear () {
        this.entries = [];
        this.store ();
    }

    //----------------------------------------------------------------//
    constructor () {
        this.restore ();
    }

    //----------------------------------------------------------------//
    @computed get
    contracts () {

        const contracts     = [];
        let allText         = '';

        for ( let i = 0; i < this.entries.length; ++i ) {

            const entry             = this.entries [ i ];
            const signingEntry      = this.entries [ i - ( i > 0 ? 1 : 0 )];
            const signingPEM        = signingEntry.fields.PUBLIC_KEY;
            const signingKey        = new fgc.crypto.RSAKey ( signingPEM );
            const fullText          = handlebars.compile ( entry.draft, { noEscape: true })( entry.fields );

            allText = `${ allText }${ fullText }`;

            const contract = {
                position:           i,
                fields:             entry.fields,
                base64:             entry.signature.base64,
                keyPEM:             signingPEM,
                fullText:           fullText,
                isValid:            signingKey.verify ( allText, entry.signature.base64, 'base64' )                       
            };

            contracts.push ( contract );
        }
        return contracts;
    }

    //----------------------------------------------------------------//
    getMostRecentContractFieldValue ( fieldName, fallback ) {
        let value = fallback !== undefined ? fallback : '';
        for ( let contract of this.contracts ) {
            value = contract.fields [ fieldName ] || value;
        }
        return value;
    }

    //----------------------------------------------------------------//
    @action
    load ( entries ) {
        this.entries = entries;
        this.store ();
    }

    //----------------------------------------------------------------//
    @action
    restore () {
        this.entries = fgc.storage.getItem ( STORAGE_KEY, []);
    }

    //----------------------------------------------------------------//
    store () {
        fgc.storage.setItem ( STORAGE_KEY, this.entries );
    }

    //----------------------------------------------------------------//
    @action
    transferTitle ( draft, fields, signature ) {

        this.entries.push ({
            draft:          draft,
            fields:         fields,
            signature: {
                base64:     signature.base64,
            }
        });
        this.store ();
    }
}
