// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

//================================================================//
// GENERAL_TERMS
//================================================================//
export const GENERAL_TERMS = (`
# Declaration of Ownership and General Terms

1. **Declaration of Ownership.** I, the undersigned, under penalty of perjury, declare that I am the legal owner, through authorship or purchase, of the artwork described herein (the "Artwork"). As the owner, I control an exclusive, transferrable copyright to the Artwork and, for legal purposes, the Artwork is either a) a product of my own authorship, b) was purchased as a 'work made for hire, or c) subject to certain rights (such as copyright) that were sold to me by its author or previous owner, the sale and terms of which can be shown through supporting documentation.
2. **Descriptions of the Artwork.** Exhibit A sets forth one or more descriptions of the Artwork suitable for identifying the Artwork should a dispute over its ownership arise. The description shall include the title of the Artwork, a description of the terms and the rights owned and, optionally, a copyright registration number for the Artwork. In addition, the descrptions may include a "reference URL" and a SHA256 hash of a full-respolution depiction of the artwork as hosted on a third-party server. The description may also include a "thumbnail" of the artwork in the form of a "data URI" representing a downsampled reproduction of the artwork in JPEG format, suitable direct for viewing in a web broswer. At least one of these descriptions shall be included.
3. **Digital Signature.** By signing this Declaration of Ownership and General Terms with a private RSA key under my exclusive control, the corresponding public key of which is set forth under "Digital Signing Identity," I am adopting the key pair used for signing as my legally binding Digital Signature, which may be used in the future to transfer ownership of the Artwork.
4. **Technical Framework.** The text of this and future documents declaring and transferring ownership of the Artwork shall be presented in markdown format, templated using "handlebars" syntax (the "Templates"). The Templates shall be stored alongside data specific parameters that, when substituted into the Templates using the "handebars" software library (with HTML escaping disabled), will produce the final text for signing (the "Contract(s)"). Each subsequent transfer of the Artwork (or modification of the original declaration and terms) shall be appended sequentially to the text of all previously generated and signed Contracts, forming a chain of Contracts that may only be amanded by digitally signing the chain of Contracts in its entirity.
5. **Viewing the Contract(s).** As the contracts are stored in templated markdown format, they may be composed and viewed in any suitable markdown viewer. The formatting and rendering of the markdown shall have no legal meaning; only the specific text of the Contract(s) shall be used for testing validity of any digital signatures.
6. **Exclusivity of Transfer.** I agree not to sign or cause to be signed any transfer of ownership of the Artwork described herein to more than a single party.
7. **Governing Law, Jurisdiction, Venue.** The terms of this and future Contract(s) shall be governed by and construed in accordance with the laws of the **{{ GOVERNING_LAW }}** without regard to conflict of laws principles. Any dispute arising under this agreement shall be settled and decided in the **{{ VENUE }}**.
8. **Severability.** If any provision of this Declaration of Ownership and General Terms is declared to be invalid under any applicable statute or rule of law, the remaining portions will be enforced to the maximum extent allowed by law. If any provision is declared unenforceable because it is held to be unreasonable, then that provision shall be enforced to the maximum extent reasonable.

##### Digital Signing Identity

- **Owner Name**: {{ OWNER_NAME }}
- **Owner Email**: {{ OWNER_EMAIL }}

I hereby adopt the RSA key pair, the public key of which is given below, as my legally binding signing identity for the purpose of this Declaration of Ownership and General Terms and agree that any digital signatures produced by this key pair for the purposes of agreeing to this document or any subsequent transfer of rights of modification thereof shall be legally binding in any court of law.

{{#if PUBLIC_KEY}}
\`\`\`
{{ PUBLIC_KEY }}
\`\`\`
{{/if}}

##### Digitally Signed on {{ DATE_TIME }}

### Exhibit A

##### Description of the Artwork

- **Title**: {{ TITLE }}
- **Description**: {{ DESCRIPTION }}
{{#if COPYRIGHT_REGISTRATION}}
- **Registration No.**: {{ COPYRIGHT_REGISTRATION }}
{{/if}}
{{#if IMAGE_URL}}
- **Image URL**: {{ IMAGE_URL }}
{{/if}}
{{#if IMAGE_HASH}}
- **Image SHA256**: {{ IMAGE_HASH }}
{{/if}}

{{#if THUMBNAIL}}
##### Thumbnail
{{ THUMBNAIL }}
{{/if}}
`).trim ();

//================================================================//
// TRANSFER_TITLE
//================================================================//
export const TRANSFER_TITLE = (`
# Transfer of Ownership
### Signing Date: {{ DATE_TIME }}

1. **Continuation of Contract.** This transfer of ownership represents the continuiation of a chain of Contracts (the "Chain of Contracts") originating with a Declaration of Ownership and General Terms. The fully composed text of that Contract, and any subsequent modifications or transfers, shall be prepended to this Contract and incorporated therein.
2. **Transfer of Ownership.** I, the undersigned, being the most recent owner of record of an Artwork previously described in the Chain of Contracts, hereby agree to immediately transfer any rights of ownership or use I have over said Artwork to whatever person or legal entity (the "Recipient") is the holder of the RSA private key associated with the public key set forth below as the "Recipient Identity." While the specific identity of the Recipient may not be known to me at this time, I agree that the public key set forth below was delivered to me in a credible fashion and that I believe the Recipient to be in possession of the corresponding private key. Thus, no further proof of identity is required from the Recipient. Furthermore, the Recipient, at their sole discretion, may subseqeuently transfer any rights of ownership or use granted under this Contract to any third party without restriction.
3. **Surrender of Rights.** I hereby surrender any claim to the Arwork and agree to destory any copies of it in my possession and cease its use or publication for any purpose.
4. **Consideration.** I acknowledge receiving good and valuable consideration for executing this Transfer of Ownership to the benefit of Recipient for a sum or value of no less that US$1.00.
5. **Exclusivity.** Under penalty of perjury, I represent and warrant that I have made no conflicting promises, contracts or agreements of transfer for the Artwork and that Recipient shall be the sole and exclusive owner of any rights of ownership or use hereby transferred.
6. **Representations and Warranties**. I represent and warrant that I am the sole owner of the Artwork and have full legal rights to transfer its ownership. I indemnify the Recipient against any claims arising from its transfer.
{{#if CHANGE_VENUE}}
7. **Governing Law, Jurisdiction, Venue.** The terms of this and future Contract(s) shall be governed by and construed in accordance with the laws of the **{{ GOVERNING_LAW }}** without regard to conflict of laws principles. Any dispute arising under this agreement shall be settled and decided in the **{{ VENUE }}**.
{{/if}}

##### Recipient Identity

The holder of the RSA private key associated with the public key below is exclusive the Recipient of this Transfer of Ownership. The Recipient may transfer or claim the Artwork upon presentation of any digital signature generated by the corresponding private key.

{{#if PUBLIC_KEY}}
\`\`\`
{{ PUBLIC_KEY }}
\`\`\`
{{/if}}
`).trim ();

//================================================================//
// DMCA_NOTICE
//================================================================//
export const DMCA_NOTICE = (`
=======BEGIN DMCA TAKEDOWN NOTICE=======

Attn: {{ ATTENTION }}

Pursuant to 17 USC 512(c)(3)(A), this communication serves as a statement that:

I am the exclusive rights holder or the duly authorized representative of the exclusive rights holder for the artwork titled {{ TITLE }}, the rights to which are being infringed upon by material available upon your site at the following locations/URLs:

{{ INFRINGEMENT }}

I have a good faith belief that the use of this material in such a fashion is not authorized by the copyright holder, the copyright holder's agent, or the law.

Under penalty of perjury in a United States court of law, I state that the information contained in this notification is accurate, and that I am authorized to act on the behalf of the exclusive rights holder for the material in question.

This communication has been digitally signed by the RSA private key corresponding to the public key set forth below. In addition, find attached the digital chain of custody for the artwork in question. You will see that the public key below corresponds to the most recent ownership of record for the artwork.

I may be contacted by the following methods:

{{ CONTACT_EMAIL }}
{{ CONTACT_ADDRESS }}
{{ CONTACT_PHONE }}

I hereby request that you remove or disable access to this material as it appears on your service in as expedient a fashion as possible. 

Thank you,
{{ CONTACT_NAME }}

Digitally Signed on {{ DATE_TIME }}

{{ PUBLIC_KEY }}

========END DMCA TAKEDOWN NOTICE=======
`).trim ();

//================================================================//
// SIGNED_CONTRACT
//================================================================//
export const SIGNED_CONTRACT = (`
{{ CONTRACT }}

=======BEGIN RSA DIGITAL SIGNATURE=======

Hash: {{ HASH_ALGORITHM }}
Encoding: {{ ENCODING }}
Signature:

{{ SIGNATURE }}

=======END RSA DIGITAL SIGNATURE=======
`).trim ();
