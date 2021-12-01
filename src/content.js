// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

//================================================================//
// CONTENT_INTRODUCTION
//================================================================//
export const CONTENT_INTRODUCTION = (`

Does owning an NFT grant you any real ownership of the artwork it represents? Do transactions on a blockchain represent a legally actionable chain of custody? Does having a license for "personal" or even "commercial" use of an artwork associated with an NFT enable you to send DMCA takedown notices, or do those rights reside with the original author of the artwork? Are "double spends" of intellectual property licenses really a problem that needs an expensive technical solution, or is simple contract law enough? Are "smart contracts" legally robust enough to stand up in a court of law? And, since blockchains are trustless and do not inherently convey the transfer of rights in any legally meaningful way, do you need a blockchain at all?

More importantly, are you sick of jerks rick-clicking to steal your sweet, sweet NFTs?

That's why we made *That's My Ape!*, an entirely **blockchain-free** cryptographic chain of custody tool that runs locally in your browser.

## What You'll Need

To use *That's My Ape!*, you'll just need a **trusted digital identity** issued by a reputable **identity authority** with a corresponding RSA private key. You have one of those, right?

You'll also need to register the work you want to protect with a copyright office, and, if you're not the author of the work, you'll need documentation showing that you purchased the work or specific rights to it. Don't skip this step - you'll be digitally signing a declaration of ownership under penalty of perjury, so if you don't actually own the work in question, that could be embarrassing for you.

## Let's do it!

Just click 'New' below and fill out the form. Don't forget to download the chain of custody when it's complete and store it somewhere safe. When you are ready to sell your artwork, reload the chain, transfer ownership to the buyer using their public key, then download the chain again and send it to the new owner. If you already have a chain and want to verify or extend it, you can drag-and-drop it anywhere on this page to load it.
`).trim ();

//================================================================//
// CONTENT_FAQ
//================================================================//
export const CONTENT_FAQ = (`
## Test Keys

Bob and Alice are real people. Here are their keys. Please don't pretend to be Bob or Alice. It isn't nice.

#### Bob's Private Key

**Password:** hunter2

\`\`\`
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIICoTAbBgkqhkiG9w0BBQMwDgQIYkCpJ6s7ZwYCAggABIICgGTRet/B8Fqz6Y8g
sX7NY+JCIE81t2JJDOzrYJQTywLdfEfbz6kDGEEq7hO4ag5O/TOMDkYlG5rJK5dS
FBH5fke1SobmJmueT8+enGoGD1nsGZVkt5OO10loZV9AUHR2aBOb7ULW8pFM8vkb
BDM1nJ9oS7LnE+nBa+eHjxkkW13DtSe7zebqFKXRWhlTLtONBSXSclWgYJv1aICS
91waKJ8dR0fVXQJrPxn2QwhC6ILXJWkwlvpHlTAP98iC+fZUKKUdsJ/iS5/IDHqx
yiGDdxRaoE35QCu/JmHdYiP0LWL5AjujAHf9P0OlCOhAa3Upt4+c1euuaKCXPHVV
s2b2SJv1LLZxgtjVi7tXpngaeon62KGE2/mZ3WvAv7vifeE1Sdy2oeNJK7YLIaq8
uzIFFfC43K+a3j3xVDozGACGq2KQLhBTtN/UD6LNeWhOaXN1WmaojteRq9PRqxaX
c7id4SvkTfspk1VW760zq+kxLV6o+i54K8t8aqOHsRgzgLQnjDuhJHLc9Qn4Ob6k
UiRK5Mo+J/X+9mmgzDXuLemd7RAC5v6XUWG5J14ml1c8mLDnNZ21BYJLj1OF46Fj
hw976Sl16oovCLH6Rt2zzwysxdSl/GDloWqjzJslPnL/tP/4Rpgs8N+neA4hcl4j
z0uqPT+yrxChhKwU++HvA1x0kl0r9tqfWKeNa8tqL0kDA0tqwxcF2Z7lDH7/3wn8
un4M4tUuErLdXfMuU9xxh7d5wU4n9IUXzYM6KFoja9GL6/DFuIvhNvEiodQSTlcz
xIzv5Hi5lLudh6KGsfaptFbSTv4gtfHkssm22gZMgJsk12IHjXYrBLEzAM4FPMK2
Plz8dVU=
-----END ENCRYPTED PRIVATE KEY-----
\`\`\`

#### Bob's Public Key

\`\`\`
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZxVTWKPfwmWB3c1BvCzAtfRNn
RcLsKRdimgPYjkqRV6+szqoOjy5EdMjisCreM/rE3Hy9ClxZNCkR3Y2c7v/pXdgn
w9w3GIipSXyr2srq4SgYjS2+7q6ogrTSFTmjgwAr9heIKav8dqR47VfMPqf6MCG1
aOAKlerpw21BUCnxrQIDAQAB
-----END PUBLIC KEY-----
\`\`\`

#### Alice's Private Key

**Password:** password

\`\`\`
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIICoTAbBgkqhkiG9w0BBQMwDgQIdLQTkAMzeEMCAggABIICgLYawmtqGUneJDN4
buH1TORzpXYKtU4YSs3vgoF78Eym7c9jCd9YzLGIaxPjip+ujpIxKNa8XeP1iqPH
EM1+I7dlxAdbSbhb8AULp1GAXXVs72h980uhBMdpaJEpXWrYl2dKBegMdbFJzsMJ
5FHDlXMrM/XRgPeJmDBvlv4Y6gu0LnzMd7eI0LX8uHegYZTIy9QGK6CBk8q4w9Lx
ygMbLTCOYdBLV6mnfCBUPw93VUss1HNJMJgyOe2NPM2xIlBZRVXvqu8+L7cgxtk/
uaLnWq4MTeIYj3vp1izcyXD6pnuwvPr3xvo2JpDVFLYnqywHCM0fPpTxf/zIMUmX
/HQ+BCm9nsXZvliBVEgBhS6CKxE+UbmYJiLaYEWiXzzvS9LYvwLT0C26gtGSVMwg
XZVH6BgJAS+wALZ2irGI68ElHXwh0/nDhDU5CP33dPGxhodm9EfIl5wqpNYpwkb8
pqxMYRMFir00VsgCJvDhqSLHvYGge/G1+SrODA+mvBdOWOHbsf83cG9CL7QOBt40
fZapVeiG9ybqwePMA0X4wz8ZedQHwICJGF/MxZsqvOZmTR5p9Jg4hX1LfkUTCo2V
STIYQInjnBQ+bseQLOAKnRb/N6zqx0PdSJVbEVP2fQFJU/ugafxhjc/RYgaUlFKb
dD1dhfpOGO+SgCRlROECHZDrAd7xfLgQgCPfEyYBDEWgyr91IX115rmNf9m4wQf4
4gy43yCDqzE0R2G7PXTzCVsmrXoi7qbejtI0mh8bJiCHwWP4hBcFovlaTMqdy+vk
RO4iBA5hTFAxGmG+xNq2Vjgu0zbuTzPmm+Spn/DVxt0uKezNdljXELbskfvy4o46
Cn+3vgc=
-----END ENCRYPTED PRIVATE KEY-----
\`\`\`

#### Alice's Public Key

\`\`\`
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnSKiibeOQyUzSxWaFBynzKlcf
CWtjrsSC5RwbaHYBT+hptgDBFiX+Oi43FC+brJqLco3EErRYxpX1N5lCQWZ6Qesp
oVUQ8RNk96BFgEryuTh3J5iZlgBs3NTv8YotBnV3/i/TCWhXeOZAzAsvWZJAm9Mz
XcqZ92fEl80zgKTXLwIDAQAB
-----END PUBLIC KEY-----
\`\`\`

## FAQ

#### Q. What even is this thing?
It's a reactive web app that runs locally in your browser and uses RSA digital signatures to build chains of custody for licensed artwork. Oh, you meant what *even is* this thing. Yeah, it's a weekend hackathon/art project that questions assumptions about blockchains and NFTs.

#### Q. Can I see the source code and run it locally?
Yes. The source code for *That's My Ape!* is available [here](https://github.com/cryptogogue/thatsmyape) and is [licensed](https://github.com/cryptogogue/thatsmyape/blob/main/license.md) for local, personal use.

#### Q. Can people really steal artwork by right-clicking?
No. Mere possession of bytes does not prove ownership of a work, as many casual music pirates discovered during the early aughts. The more important question is "do I even own the artwork being right-clicked to begin with?" If you bought an NFT, you probably don't.

#### Q. Are *That's My Ape!* chains of custody compatible with *Bored Ape Yacht Club* style licenses?
The [BAYC license](https://boredapeyachtclub.com/#/terms) states "You Own the NFT. Each Bored Ape is an NFT ... you own the underlying Bored Ape, the Art, completely." The license then goes on to place any number of restrictions on its use, implying that you don't, in fact, "own" the "underlying Art" at all.

The BAYC license also states that "Ownership of the NFT is mediated entirely by the Smart Contract and the Ethereum Network" and "when you purchase an NFT ... you own." But it doesn't say that holding the NFT is proof of ownership. In other words, when you purchase the NFT, are you buying an *exclusive* or *non-exclusive* license? And, in either case, is that license transferable? The BAYC license defines the relationship between you (the licensee) and Yuga Labs LLC (the licensor), but doesn't explicitly state whether or not you can transfer that license to some third party. It also doesn't cover what happens when an NFT is transferred without a purchase (from which Yuga Labs LLC is presumably paid a fee), or if it can even be. Can an NFT be given as a gift? Or traded for anything other than ETH? If so, was there a "purchase" and a grant or transfer of rights? It's also not clear if the rights, if transferable at all, are limited to transfer via the Ethereum Network. The discussion of "marketplaces" suggests the license *is* transferrable, even if not exclusive.

The phrase "the actual owner" does suggest exclusivity, but, of course, "the actual owner" may simply be Yuga Labs LLC. Nor is it clear what happens if the "underlying ... Art" is changed and what happens to the NTF if it does. Indeed, no method of identifying the art in question beyond "the Smart Contract" is given. 

The other restrictions placed on your use of the artwork are broad. For example, you may not display the artwork for any purpose other than "your own personal, non-commercial use" or, commercially, "to produce and sell merchandise products." Other commercial displays of the art, such as to offer for sale in a marketplace, is prohibited unless the marketplace "cryptographically verifies each Bored Ape owner’s rights to display the Art."

The digital signatures used by *That's My Ape!* are cryptographic and thus support a means to "cryptographically (verify) each Bored Ape owner’s rights." The missing piece is whether or not the license is transferable to third parties by means other than transacting on the Ethereum Network and thus paying Yuga Labs LLC.

We suspect that the quiet part of the BAYC license is that Yuga Labs LCC expects to receive a portion of any payments made for the transaction of its licensed artwork, and that payment is, in effect, a new licensing fee paid by the buyer. So when you "sell" an NFT, *you* aren't transferring ownership at all. Yuga Labs LLC is, for a fee. Possibly, any payment you receive is consideration for you to abandon your rights to use of the artwork, but, again, the license only implies this. We might argue that the license is transferable but non-exclusive and that paying Yuga Labs LLC even once grants use of the artwork in perpetuity.

Regardless, we don't think that the BAYC license would grant you sufficient proof of ownership to issue a credible DMCA takedown notice should the "underlying Art" associated with your NFT be displayed against your wishes or if Yuga Labs LLC decides to sell it to someone else. Yes, you may have a restricted license to use the art in specific circumstances, but it doesn't seem you have a license to restrict others from using that art. The party to do so would most likely be the art's actual owner, Yuga Labs LLC. And Yuga Labs LLC certainly makes no promises to cease its own commercial use of its art, should you be successful in promoting it for them.

So no, we don't think a *That's My Ape!* chain of custody is compatible with BAYC style licenses, simply because *That's My Ape!* relies on a clear and robust initial claim of rights as an original work of authorship, a "work made for hire," or an exclusive, transferable license to use the same.

#### Q. Why should I register my art with a copyright office?
The DMCA provides legal remedies to limit the unauthorized digital distribution of your artwork, but only if that artwork has been registered. It can take a long time to get a copyright registration number, so be sure to apply as soon as you can.

#### Q. Why should I need to use a key associated with a trusted digital identity for signing?
Because legal complaints need plaintiffs, and to be a plaintiff you need an identity. A real one, not a made-up internet one.

#### Q. How can I demo *That's My Ape!* if I don't yet have a trusted digital identity for some reason?
Easy. Just generate some RSA key pairs locally using OpenSSH on the command line. *That's My Ape!* can load RSA keys stored in PKCS#1 and PKCS#8 PEM format. Alternatively, see the 'test keys' provided above.

#### Q. Will you steal my private keys if I load them into the browser?
Assume that we will and use the "sign offline" functionality instead.

#### Q. I want to buy the rights to someone's artwork. Can I trust their chain of custody?
There is no trustless way to prove ownership. If push comes to shove, you will need to appear in a court of law and identify each person on the chain of custody. So you can trust it as must as you trust each individual participant.

#### Q. What happens if someone sells the same rights to multiple buyers?
To the extent that's a real problem, it's up to you to decide how to mitigate it. For starters, only buy from reputable sellers with strong, publicly known identities. Alternatively, find some trusted third party with which to register the chain of custody. That could be a centralized service or even a distributed ledger, though we don't entirely see the point of using trustless protocols to transact fundamentally trustful legal instruments.

#### Q. But wait, don't distributed ledgers exactly solve the problem of preventing double-spends in a decentralized, tamper-resistant way?
You really ask a lot of annoying questions.

#### Q. Is any of this for real?
No. Good lord. If you want to protect your digital rights, hire a lawyer. If it wasn't immediately clear that this is a work of satire, we've got some NFTs to sell you.

## You're Welcome!

*That's My Ape!* is brought to you by:
- **Cryptogogue, Inc.**: *"Technology for a More Litigious Future."*
- **The Imp of the Perverse**: *"That sounds like a terrible idea. I'm in!"*
- **Poe's Law**: *"Can't you possibly be serious."*

`).trim ();
