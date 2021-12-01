// Copyright (c) 2021 Cryptogogue, Inc. All Rights Reserved.

//================================================================//
// GENERAL_TERMS
//================================================================//
export const GENERAL_TERMS = (`
# Declaration of Ownership and General Terms
##### {{ DATE_TIME }}

##### Definitions
- **“Terms”:** The initial ‘Declaration of Ownership and General Terms; i.e this document.
- **“Artwork”:** The artwork described herein.
- **“Thumbnail”:** A downsampled rendition of the Artwork in JPEG format, expressed as a data URI suitable for viewing in a web browser for the purpose of visually identifying the Artwork.
- **“Owner”:** The most recent owner or exclusive rights holder to the Artwork; the Owner of record; the current or future Owner by means of transfer of rights. Further defined below.
- **“Agent”:** An authorized Agent of the Owner. Further defined below.
- **“Template”:** A section of text prepared for the substitution/inclusion of additional information using "handlebars" syntax (with HTML escaping disabled).
- **“Template Parameters”:** A list of named data parameters designated for substitution into a Template.
- **“Contract”:** A fully composed text realized by the substitution of Template Parameters into a Template (via “handlebars”-style substitution of named parameters) to produce a document to be digitally signed.
- **“Contract Chain”:** A series of digitally signed Contracts wholly including and amending the Terms and all previous amendments in chronological order  for the purpose of selling or otherwise transferring rights.
- **“Digital Signature”:** A legally binding signature produced by an RSA private key corresponding to a public key recorded in the Contract Chain.
- **“Rights”:** Any exclusive or non-exclusive transferable rights held by the initial Owner and sold or transferred by amendments extending the Contract Chain.

##### Declaration of Ownership

I, the undersigned, under penalty of perjury, declare that I am the legal owner, through authorship or purchase, of the Artwork. As the Owner, I control an exclusive, transferrable copyright (or other rights) to the Artwork and, for legal purposes, the Artwork is either a) a product of my own authorship, b) was purchased as a 'work made for hire, or c) is subject to certain rights (such as copyright) that were sold to me by its author or previous owner, the sale and terms of which can be shown through supporting documentation.

##### General Terms

1. **Description(s) of the Artwork.** Exhibit A sets forth one or more descriptions of the Artwork suitable for identifying the Artwork should a dispute over its ownership arise. The description shall include the title of the Artwork, a description of the terms and the rights owned and, optionally, a copyright registration number for the Artwork. In addition, the description may include a "reference URL" and a SHA256 hash of a full-resolution depiction of the artwork as hosted on a third-party server. The description may also include a Thumbnail of the Artwork. At least one of these descriptions shall be included. If provided, the Thumbnail shall be considered the definitive source for visually identifying the Artwork.
2. **Technical Framework.** The text of this and future documents declaring and transferring ownership of the Artwork shall be presented as Contracts derived from Templates and Template Parameters. The Contracts denoting each subsequent transfer of the Artwork (or modification of the Terms) shall be appended sequentially to the text of all previous Contracts, forming a Contract Chain that may only be amended by digitally signing the Contract Chain in its entirety. For each Contract in the Contract Chain, An RSA digital signature shall also be provided along with the Templates and Template Parameters used to compose the Contract.
3. **Viewing the Contract Chain.** As the contracts are stored as a series of Templates and corresponding Template Parameters, they may be composed and viewed in any suitable viewer. The formatting and rendering of the Contracts shall have no legal meaning; only the specific text of the Contract Chain shall be used for testing the validity of any digital signature(s).
4. Agency: For the purpose of enforcing Rights, including the issuance and litigation of DMCA takedown notices, the Owner grants any holder of any private key associated with any valid digital signature corresponding to any public key named in the Contract Chain a specific Power of Attorney, in perpetuity, to act as the Owner’s Agent (“Agent”) for the purposes of enforcing the Rights on behalf of the Owner. The Agent shall not be obligated to specifically identify the Owner, and proof of holding a private key through the presentation of a valid digital signature associated with any public key named in the Contract Chain shall be enough to identify the private key holder as an Agent. As compensation for enforcing the Owner’s Rights through the issuance or litigation of a DMCA takedown notice, or by any other means, Owner assigns the proceeds arising from any fines, penalties, legal fees or other damages awarded through an Agent’s efforts wholly and exclusively to the Agent. In the event the Owner or a specifically named Agent of Owner appears to enforce the Owner’s rights, I will defer to that person or entity and cease enforcement actions of my own.
5. **Transfer.** Upon any agreement to transfer the Rights, the Owner agrees to provide a record of Transfer to the new Owner by amending the Contract Chain with a Transfer of Ownership contract naming the new Owner’s public key, at which time the new Owner shall become the Owner of record.
6. **Consideration for Transfer.** By signing a Contract agreeing to transfer the Rights, the Owner acknowledges the receipt of good and valuable consideration in the form of a sum or value of no less than US$1.00.
7. **Exclusivity of Transfer.** The Owner agrees to not transfer or cause to be transferred the Rights to more than one other person or legal entity and, upon transfer, for good and valuable consideration, agrees to relinquish all existing Rights and to no longer use the Artwork for any purpose other than enforcing the Rights of any future Owners as their Agent.
8. **Disputes Over Ownership.** In the event that the Contract Chain is disputed, Ownership will be considered to follow the party that can credibly show the earliest entry or entries in the Contract Chain assigning Rights along a version of the Contract Chain that eventually designates them as the current Owner. Timestamps in the Contract Chain are for informational purposes only and are not sufficient to establish Ownership. Any other indication of time (such as email correspondence, payment receipts or copies of the Chain of Contract time-stamped or witnessed by a trusted third party) shall be considered against the timestamps for in the Contract Chain.
9. **Legal Fees.** In the event any dispute over the Rights granted under the Contract Chain or in the execution of Agency for the purpose of pursuing or litigating a DMCA takedown notice, the prevailing party (or Agent, if acting as such) shall be entitled to reasonable fees, including attorney’s fees.
10. **Entire Agreement.** The Contract Chain shall be the entire agreement between all parties concerning the Rights transferred and assigned herein.
11. **Governing Law, Jurisdiction, Venue.** The terms of this and future Contract(s) shall be governed by and construed in accordance with the laws of the **{{ GOVERNING_LAW }}** without regard to conflict of laws principles. Any dispute arising under this agreement shall be settled and decided in the **{{ VENUE }}**.
12. **Changes of Governing Law, Jurisdiction, Venue.** These Terms may be amended to change the Governing Law, Jurisdiction, Venue. Such changes shall not be applied retroactively.
13. **Severability.** If any provision of this Declaration of Ownership and General Terms is declared to be invalid under any applicable statute or rule of law, the remaining portions will be enforced to the maximum extent allowed by law. If any provision is declared unenforceable because it is held to be unreasonable, then that provision shall be enforced to the maximum extent reasonable.

##### Digital Signing Identity

{{#if OWNER_NAME}}
- **Owner Name**: {{ OWNER_NAME }}
{{/if}}
{{#if OWNER_EMAIL}}
- **Owner Email**: {{ OWNER_EMAIL }}
{{/if}}

By signing this Declaration of Ownership and General Terms with a private RSA key under my control, the corresponding public key of which is set forth below, I am adopting the key pair used for signing as my legally binding Digital Signature, which may be used in the future to transfer ownership of the Artwork.

{{#if PUBLIC_KEY}}
\`\`\`
{{ PUBLIC_KEY }}
\`\`\`
{{/if}}

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
### {{ DATE_TIME }}

##### Definitions
- **“Terms”:** The initial ‘Declaration of Ownership and General Terms; i.e this document.
- **“Artwork”:** The artwork described herein.
- **“Thumbnail”:** A downsampled rendition of the Artwork in JPEG format, expressed as a data URI suitable for viewing in a web browser for the purpose of visually identifying the Artwork.
- **“Owner”:** The most recent owner or exclusive rights holder to the Artwork; the Owner of record; the current or future Owner by means of transfer of rights. Further defined below.
- **“Agent”:** An authorized Agent of the Owner. Further defined below.
- **“Template”:** A section of text prepared for the substitution/inclusion of additional information using "handlebars" syntax (with HTML escaping disabled).
- **“Template Parameters”:** A list of named data parameters designated for substitution into a Template.
- **“Contract”:** A fully composed text realized by the substitution of Template Parameters into a Template (via “handlebars”-style substitution of named parameters) to produce a document to be digitally signed.
- **“Contract Chain”:** A series of digitally signed Contracts wholly including and amending the Terms and all previous amendments in chronological order  for the purpose of selling or otherwise transferring rights.
- **“Digital Signature”:** A legally binding signature produced by an RSA private key corresponding to a public key recorded in the Contract Chain.
- **“Rights”:** Any exclusive or non-exclusive transferable rights held by the initial Owner and sold or transferred by amendments extending the Contract Chain.

##### Declaration of Ownership

I, the undersigned, under penalty of perjury, declare that I am the legal owner, through authorship or purchase, of the Artwork. As the Owner, I control an exclusive, transferrable copyright (or other rights) to the Artwork and, for legal purposes, the Artwork is either a) a product of my own authorship, b) was purchased as a 'work made for hire, or c) is subject to certain rights (such as copyright) that were sold to me by its author or previous owner, the sale and terms of which can be shown through supporting documentation.

##### Declaration of Ownership

1. **Continuation of Contract Chain.** This Transfer of Ownership represents the continuation of a Contract Chain originating with a Declaration of Ownership and General Terms. The fully composed text of that Contract Chain, and all terms and definitions thereof, shall be prepended to this Contract and fully incorporated herein.
2. **Representations and Warranties**. I represent and warrant that I am the Owner of the Artwork and have full legal rights to transfer its ownership. I hereby indemnify the Recipient against any claims arising from its transfer.
3. **Transfer of Ownership.** I, the undersigned, being the most recent Owner of record of an Artwork previously described in the Chain of Contracts, hereby agree to immediately transfer any rights of ownership or use I have over said Artwork to whatever person or legal entity (the "Recipient") is the holder of the RSA private key associated with the public key named below as the "Recipient Identity." While the specific identity of the Recipient may not be known to me at this time, I agree that the public key set forth below was delivered to me in a credible fashion and that I believe the Recipient to be in possession of the corresponding private key. Thus, no further proof of identity is required from the Recipient. Furthermore, the Recipient, at their sole discretion, may subsequently transfer any rights of ownership or use granted under this Contract Chain to any third party without restriction.
4. **Agency**. Per the Contract Chain, Recipient agrees that I shall remain Recipient's Agent (and the Agent of any future Owners) and for the purposes of enforcing the Rights on behalf of the Owner, including the issuance and litigation of DMCA takedown notices. Recipient further agrees that all previous holders of public keys named in the Contract Chain shall also remain as their Agents for the same purpose.
5. **Surrender of Rights.** By transferring ownership to Recipient, I hereby surrender any claims to Rights in the Artwork and agree to cease its use or publication for any purpose other than enforcing the Rights of any future Owners as their Agent.
6. **Exclusivity.** Under penalty of perjury, I represent and warrant that I have made no conflicting promises, contracts or agreements of transfer for the Artwork and that Recipient shall be the sole and exclusive Owner of any rights of ownership or use hereby transferred.
7. **Consideration.** I acknowledge receiving good and valuable consideration for executing this Transfer of Ownership for a sum or value of no less than US$1.00.
{{#if CHANGE_VENUE}}
8. **Governing Law, Jurisdiction, Venue.** The terms of this amendment and future amendments to the Contract Chain shall be governed by and construed in accordance with the laws of the **{{ GOVERNING_LAW }}** without regard to conflict of laws principles. Any dispute arising under this of future Contracts in the Contract Chain shall be settled and decided in the **{{ VENUE }}**.
{{/if}}

##### Recipient Identity

The holder of the RSA private key named below is the exclusive the Recipient of this Transfer of Ownership and, upon execution of this Transfer of Ownership shall become the Owner. The Recipient may transfer or claim the Artwork upon presentation of any digital signature generated by the corresponding private key.

Recipient agrees that they provided this public key and adopts the key pair including the corresponding private key used as their legally binding Digital Signature, which may be used in the future to transfer ownership of the Artwork.

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

This communication has been digitally signed by the RSA private key corresponding to the public key named below. In addition, find attached the digital chain of custody for the artwork in question. You will see that the key below corresponds to a key previously named in the attached chain of custody and that, per its terms, having provided a digital signature matching the named public key, I am the Owner or an authorized Agent of the Owner.

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
