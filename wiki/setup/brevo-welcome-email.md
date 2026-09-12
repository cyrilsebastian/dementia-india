# Brevo Welcome Email Setup

## Where to create it
Brevo dashboard → Automations → Create automation
Trigger: Contact added to list [your list ID]
Action: Send email → create new email

## Email settings
From name:    Dementia India
From email:   hello@maildementia.cyrilsebastian.com
Reply-to:     dementia@cyrilsebastian.com
Subject:      You are now subscribed to Dementia India updates

## Email body (plain text version — paste into Brevo editor)

---

Thank you for subscribing.

You will hear from us once a month. Each email covers one
update that we think matters — a new data finding, a policy
change, a resource for caregivers, or a number that should
be better known.

The platform is at dementia.cyrilsebastian.com — everything
on it is free, open, and sourced from published research.

If you are a caregiver looking for immediate help, the Care
Network page lists verified clinics, ARDSI chapters, and
24x7 helplines across India:
dementia.cyrilsebastian.com/care-network

If you have a question, found an error, or want to share
something we should know about — reply to this email.
Every message is read.

To unsubscribe at any time, click the link below.

Cyril Sebastian
dementia@cyrilsebastian.com
dementia.cyrilsebastian.com

---

## Double opt-in confirmation email (separate)
Brevo dashboard → Contacts → Lists → your list →
Settings → Enable double opt-in
Subject: "Please confirm your Dementia India subscription"
Body: Keep Brevo's default template — just change the
button text from "Confirm subscription" to
"Yes, subscribe me"

## Timing
Welcome email delay: 5 minutes after confirmation
(gives time for the confirmation click to register)
