// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

//================================================================//
// CONTENT_INTRODUCTION
//================================================================//
export const CONTENT_INTRODUCTION = (`
#### *Show those damn, dirty ape thieves that you're mad as hell and you're not going to take this any more!*

Hey, brah! Tired of trolls using right-click to steal your sweet, sweet NFTs? Well great news! Here's a way to protect your
assets. And there's **no blockchain involved** - you have everything you need right here in your browser!

## How it Works

*That's My Ape!* runs locally in your browser. You can use it to create a "chain of custody" for your copyrighted artwork.
The chain of custody tracks ownership and can be used as evidence when you send DMCA takedown notices or try to sue people. We don't
save anything on a server or blockchain, so you are solely responsible for it's storage and transfer.

## What You'll Need

To use *That's My Ape!*, you'll just need a **trusted digital identity** issued by a reputable **identity authority** with a corresponding
RSA private key. You'll also need to register the work you want to protect with a copyright office, and, if you're not the author of the
work, you'll need documentation showing that you purchased the work or specific rights to it. Don't skip this step - you'll be digitally
signing a declaration of ownership under penantly of perjury, so if you don't actually own the work in question, that could be embarassing
for you.

## Let's do it!

Just click 'New' below and fill out the form. Don't forget to download the chain of custody when it's complete and store it somewhere safe.
When you are ready to sell your artwork, reload the chain, transfer ownership to the buyer using their public key, then download the chain
again and send it to the new owner. If you already have a chain and want to verify or extend it, you can drag-and-drop it anywhere on this
page to load it.
`).trim ();

//================================================================//
// CONTENT_FAQ
//================================================================//
export const CONTENT_FAQ = (`
## FAQ

#### What even is this thing?
It's a reactive web app that runs locally in your browser and uses RSA digital signatrues to build chains of custody for licensed artwork.

#### Can I see the source code and run it locally?
Yes. The source code for *That's My Ape!* is available here and is licensed for local, personal use.

#### Can people really steal artwork by right-clicking?
No, mere possession of bytes does not prove ownership of a work, as many casual music pirates discovered during the early aughts.
The more important question is "do I even own the artwork being right-clicked to begin with?" If you just bought an NFT, you
probably don't.

#### Why should I register my art with a copyright office?
The DMCA provides legal remedies to limit the unauthorized digital distribution of your artwork, but only if that
artwork has been registered. It can take a long time to get a copyright registration number, so be sure to apply as soon as you can.

#### Why do I need to use a key associated with a trusted digital identity for signing?
Because legal complaints need plaintiffs, and to be a plaintiff you need an identity. A real one, not a made-up internet one.

#### How can I demo *That's My Ape!* if I don't yet have a trusted digital identity for some reason?
Easy. Just generate some RSA key pairs locally using OpenSSH on the command line. *That's My Ape!* can load RSA keys stored in PKCS#1
and PKCS#8 PEM format. Alternatively, see the 'test keys' provided below.

#### Will you steal my private keys if I load them into the browser?
Assume that we will and use the "sign offline" functionality instead.

#### I want to buy the rights to someone's artwork. Can I trust their chain of custody?
There is no trustless way to prove ownership. If push comes to shove, you will need to appear in a court of law and identify
each person on the chain of custory. So you can trust it as must as you trust each individual participant.

#### What happens if someone sells the same rights to multiple buyers?
To the extent that's a real problem, it's up to you to decide how to mitigate it. For starters, only buy from reputable sellers
with strong, publicly known identities. Alternatively, find some trusted third party with which to register the chain of custody.
That could be a centralized service or even a distributed legder, though we don't see the point of using trustless protocols to
transact fundamentally trustful legal instruments.

#### Is any of this for real?
No. Good lord. If you want to protect your digital rights, hire a lawyer. If wasn't immeditaly clear that this is a work of
satire, we've got some NFTs to sell you.

## Test Keys

Bob and Alice are real people. Here are their keys. Please don't pretend to be Bob or Alice. It isn't nice.

#### Bob's Private Key

**Password:** hunter2

\`\`\`
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDWAGMCbfbocXawNOncmQb389ueUEJhAgw1FmS6Xl0PnxDwe5Kc
7qQ+cj2pj8qZU8EPj7zmjjAsXZP/MZTrfczr9wRpsnKYJxp6NUOqnMpYw9q/nynS
kVXAwjEpv13StszLswvm41lCGHNrzoqrCZLC1Zcdx/99GpU+BxMlyL5H2QIDAQAB
AoGBALq5BarWBg0VC2l+EdvgTftFdIfzIagBIGOl0Wfn9C0wLpiWSfvSIc824OS1
SSJ1uMt6MGm/APuE/yA4w+aiEozsH7HEgoXj2XciQ0EHsqqsbLLWgiJ5LeMGtrdO
N6ZblzYsoP+qMfRALEkT5nrsWzHqPw98GggTaz4WHpwHYfwxAkEA9zSceq6fGEyo
hhA4QasCKsFPbsrZt+Ev1b+chUi7DW8ajXAOREmjUX9VAui4jjOWmvsTby/NW3vs
sMa1BI3z3QJBAN2dX/RthwokWQnwy0HuuPH3vodMVugg/J27jvf7WRJj9MZmEsd/
Z8GMKYaY1UaRFYHGEyb0Z6YxVpiFh1faci0CQGgfTNmPu4ssnr75Dfj64orHqYFt
B48f1lodvvuUytS5u2FflWLF8XhePZxgEXwz1neo0WK/q6ug4u0ChTRJ5jECQAVx
uku87RZYsj9GRRgHj0+ScIHOZEwrk0kktGxvJk8HWZoOI+P2w0vD77k4w/SJ1+dq
QEoysuEoUSJKFXsZCLkCQHwPFrqMkNHrF3C4RzZOe74IRXDQjNLvets+DCsMHL+P
VVNj2Di+Y6b9tgXSaVyLY4jzPMAVdRZDqzb1dtCvMjk=
-----END RSA PRIVATE KEY-----
\`\`\`

#### Bob's Public Key

#### Alice's Private Key

**Password:** password

\`\`\`
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDWAGMCbfbocXawNOncmQb389ueUEJhAgw1FmS6Xl0PnxDwe5Kc
7qQ+cj2pj8qZU8EPj7zmjjAsXZP/MZTrfczr9wRpsnKYJxp6NUOqnMpYw9q/nynS
kVXAwjEpv13StszLswvm41lCGHNrzoqrCZLC1Zcdx/99GpU+BxMlyL5H2QIDAQAB
AoGBALq5BarWBg0VC2l+EdvgTftFdIfzIagBIGOl0Wfn9C0wLpiWSfvSIc824OS1
SSJ1uMt6MGm/APuE/yA4w+aiEozsH7HEgoXj2XciQ0EHsqqsbLLWgiJ5LeMGtrdO
N6ZblzYsoP+qMfRALEkT5nrsWzHqPw98GggTaz4WHpwHYfwxAkEA9zSceq6fGEyo
hhA4QasCKsFPbsrZt+Ev1b+chUi7DW8ajXAOREmjUX9VAui4jjOWmvsTby/NW3vs
sMa1BI3z3QJBAN2dX/RthwokWQnwy0HuuPH3vodMVugg/J27jvf7WRJj9MZmEsd/
Z8GMKYaY1UaRFYHGEyb0Z6YxVpiFh1faci0CQGgfTNmPu4ssnr75Dfj64orHqYFt
B48f1lodvvuUytS5u2FflWLF8XhePZxgEXwz1neo0WK/q6ug4u0ChTRJ5jECQAVx
uku87RZYsj9GRRgHj0+ScIHOZEwrk0kktGxvJk8HWZoOI+P2w0vD77k4w/SJ1+dq
QEoysuEoUSJKFXsZCLkCQHwPFrqMkNHrF3C4RzZOe74IRXDQjNLvets+DCsMHL+P
VVNj2Di+Y6b9tgXSaVyLY4jzPMAVdRZDqzb1dtCvMjk=
-----END RSA PRIVATE KEY-----
\`\`\`

#### Alice's Public Key

## You're Welcome!

*That's My Ape!* is brought to you by:
- **Cryptogogue, Inc.**: *"Technology for a More Litigious Future."*
- **The Imp of the Perverse**: *"That sounds like a terrible idea. I'm in!"*
- **Poe's Law**: *"Can't you possibly be serious."*

`).trim ();
