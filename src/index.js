// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

import pkg from '../package.json'
import 'semantic-ui-css/semantic.min.css';

import { configure } from 'mobx';
configure ({
    enforceActions:     'always',
});

import { MainScreen }                       from './MainScreen';
import registerServiceWorker                from './util/registerServiceWorker';
import { TermsOfServiceModal }              from './TermsOfServiceModal'
import * as fgc                             from 'fgc';
import React, { useState }                  from 'react';
import { useClearCache }                    from 'react-clear-cache';
import ReactDOM                             from 'react-dom';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

//----------------------------------------------------------------//
const App = () => {

    const [ showTOS, setShowTOS ]                   = useState ( false );
    const { isLatestVersion, emptyCacheStorage }    = useClearCache ();
    const location                                  = useLocation ();

    if ( !isLatestVersion ) {
        console.log ( 'NEW VERSION DETECTED; EMPTYING CACHE' );
        emptyCacheStorage ();
    }

    return (
        <div
            style = {{
                display:            'grid',
                gridTemplateRows:   'auto 32px',
                position:           'absolute',
                width:              '100%',
                height:             '100%',
            }}
        >
            <div style = {{
                gridColumn:         '1',
                gridRow:            '1',
                width:              '100%',
                height:             '100%',
            }}>
                <Switch key = { location.pathname }>

                    <Route exact path = "/debug/aes"                    component = { fgc.debug.AESScreen }/>
                    <Route exact path = "/debug/barcode/pdf417"         component = { fgc.debug.BarcodePDF417Screen }/>
                    <Route exact path = "/debug/barcode/qr"             component = { fgc.debug.BarcodeQRScreen }/>
                    <Route exact path = "/debug/cryptokey"              component = { fgc.debug.CryptoKeyScreen }/>
                    <Route exact path = "/debug/dropzone"               component = { fgc.debug.DropzoneScreen }/>
                    <Route exact path = "/debug/filepicker"             component = { fgc.debug.FilePickerScreen }/>
                    <Route exact path = "/debug/print"                  component = { fgc.debug.PrintScreen }/>

                    <Route exact path = "/"                             component = { MainScreen }/>

                </Switch>
            </div>
            <div style = {{
                gridColumn:         '1',
                gridRow:            '2',
                textAlign:          'center',
                width:              '100%',
            }}>
                <p
                    style       = {{ cursor: 'pointer' }}
                    onClick     = {() => { setShowTOS ( true )}}
                >
                    { `Copyright © 2021 by Cryptogogue, Inc. - Terms of Service - v${ pkg.version }` }
                </p>
                <If condition = { showTOS }>
                    <TermsOfServiceModal
                        onDone      = {() => { setShowTOS ( false )}}
                    />
                </If>
            </div>
        </div>
    );
}

//----------------------------------------------------------------//
ReactDOM.render (
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById ( 'root' )
);

registerServiceWorker ();
